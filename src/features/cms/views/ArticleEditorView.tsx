import { defineComponent, ref, computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '@/composables/useHead'
import { useArticleStore } from '@/features/article/store/article.store'
import { useCMSContentStore } from '@/features/cms/store/cms-content.store'
import { MarkdownEditor } from '@/features/cms/components/MarkdownEditor'
import type { Article, Category, Author, ArticleStatus } from '@/shared/types'
import { ARTICLE_STATUS_LABELS } from '@/shared/types'
import { BaseButton } from '@/components/ui/Button'

/**
 * CMS View: ArticleEditorView
 * Full-screen editor with Markdown toolbar.
 */
export default defineComponent({
  name: 'ArticleEditorView',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const articleStore = useArticleStore()
    const cmsContentStore = useCMSContentStore()

    const isEdit = computed(() => route.params.slug !== undefined)
    const tagInput = ref('')

    useHead({
      title: computed(() =>
        isEdit.value ? `Edit Article — CMS Verity+` : `New Article — CMS Verity+`,
      ),
    })

    // Form State
    const form = ref<Article>({
      id: Date.now(),
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      coverImage:
        'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
      category: articleStore.categories[0] as Category,
      author: articleStore.authors[0] as Author,
      tags: [],
      publishedAt: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      readTimeMinutes: 5,
      status: 'draft' as ArticleStatus,
    })

    const loadData = async () => {
      if (isEdit.value) {
        const found = await articleStore.findBySlug(route.params.slug as string)
        if (found) {
          form.value = JSON.parse(JSON.stringify(found))
        }
      }
    }

    watchEffect(() => {
      loadData()
    })

    // Auto-generate slug from title
    const generateSlug = (title: string) => {
      return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
    }

    const addTag = () => {
      const tag = tagInput.value.trim()
      if (tag && !form.value.tags.includes(tag)) {
        form.value.tags.push(tag)
        tagInput.value = ''
      }
    }

    const removeTag = (index: number) => {
      form.value.tags.splice(index, 1)
    }

    const save = () => {
      if (!form.value.title) {
        alert('Title is required.')
        return
      }

      // Auto-generate slug if empty
      if (!form.value.slug) {
        form.value.slug = generateSlug(form.value.title)
      }

      if (isEdit.value) {
        cmsContentStore.updateArticle(form.value)
      } else {
        cmsContentStore.addArticle(form.value)
      }

      router.push('/cms/articles')
    }

    return () => (
      <div class="cms-editor h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-500">
        <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="flex flex-col">
            <h1 class="text-2xl font-black text-slate-900 tracking-tight">
              {isEdit.value ? 'Edit Article' : 'New Article'}
            </h1>
            <p class="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1 italic">
              Verity+ Unified Content Studio
            </p>
          </div>
          <BaseButton
            onClick={save}
            variant="primary"
            class="shadow-lg shadow-primary/20 px-8 py-3.5 uppercase font-black tracking-widest text-xs"
          >
            {isEdit.value ? 'Save Changes' : 'Save Article'}
          </BaseButton>
        </header>

        <div class="flex-grow flex flex-col lg:flex-row gap-8 min-h-[600px]">
          {/* Main Editor Column */}
          <div class="flex-grow space-y-6">
            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-8">
              {/* Title Section */}
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Article Title
                </label>
                <input
                  value={form.value.title}
                  onInput={(e) => {
                    form.value.title = (e.target as HTMLInputElement).value
                    if (!isEdit.value) {
                      form.value.slug = generateSlug(form.value.title)
                    }
                  }}
                  type="text"
                  placeholder="Enter a compelling headline..."
                  class="w-full text-3xl sm:text-4xl rounded-xl border border-transparent focus:border-slate-100 focus:bg-slate-50/20 p-2 outline-none font-black text-slate-900 placeholder-slate-200 transition"
                />
              </div>

              {/* Category */}
              <div class="pt-4 border-t border-slate-100">
                <div class="space-y-2">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Internal Category
                  </label>
                  <select
                    value={form.value.category.id}
                    onChange={(e) => {
                      const cat = articleStore.categories.find(
                        (c) => c.id === (e.target as HTMLSelectElement).value,
                      )
                      if (cat) form.value.category = cat
                    }}
                    class="w-full px-3 py-3 rounded-xl border border-slate-200 bg-slate-50/30 focus:bg-white text-sm font-bold text-slate-700 transition cursor-pointer outline-none"
                  >
                    {articleStore.categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Markdown Editor */}
              <MarkdownEditor v-model={form.value.content} />
            </div>
          </div>

          <aside class="w-full lg:w-80 shrink-0 space-y-6 animate-in fade-in slide-in-from-right-10">
            {/* Cover Image Uploader */}
            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div class="section-header mb-4 border-b border-slate-50 pb-2">
                <span class="section-header-title">Cover Asset</span>
              </div>

              <div class="space-y-4">
                <div class="aspect-video w-full rounded-xl overflow-hidden bg-slate-100 relative group">
                  <input
                    type="file"
                    class="absolute inset-0 opacity-0 cursor-pointer z-10"
                    accept="image/*"
                    onChange={(e) => {
                      const file = (e.target as HTMLInputElement).files?.[0]
                      if (file) form.value.coverImage = URL.createObjectURL(file)
                    }}
                  />
                  <img
                    src={form.value.coverImage}
                    class="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <span class="px-4 py-2 bg-white text-slate-900 rounded-lg text-xs font-black uppercase tracking-widest shadow-xl pointer-events-none">
                      Change Asset
                    </span>
                  </div>
                </div>
                <p class="text-[10px] text-slate-400 leading-tight italic uppercase font-bold tracking-widest text-center">
                  Click Image to Upload
                </p>
              </div>
            </div>

            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div class="section-header mb-4 border-b border-slate-50 pb-2">
                <span class="section-header-title">Article Settings</span>
              </div>

              <div class="space-y-4">
                <div class="space-y-2">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Publication Status
                  </label>
                  <select
                    value={form.value.status}
                    onChange={(e) => {
                      form.value.status = (e.target as HTMLSelectElement).value as ArticleStatus
                    }}
                    class="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-black text-slate-700 outline-none"
                  >
                    {(Object.keys(ARTICLE_STATUS_LABELS) as ArticleStatus[]).map((status) => (
                      <option key={status} value={status}>
                        {ARTICLE_STATUS_LABELS[status]}
                      </option>
                    ))}
                  </select>
                </div>
                <p class="text-[10px] text-slate-400 leading-tight">
                  {form.value.status === 'draft' &&
                    'Article is saved as draft and not visible to public.'}
                  {form.value.status === 'published' && 'Article is publicly visible.'}
                  {form.value.status === 'archived' && 'Article is hidden from public view.'}
                  {form.value.status === 'featured' &&
                    'Article appears in the primary homepage carousel.'}
                </p>
              </div>

              <div class="pt-6 border-t border-slate-50 space-y-3">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Author / Character
                </label>
                <select
                  value={form.value.author.id}
                  onChange={(e) => {
                    const auth = articleStore.authors.find(
                      (a) => a.id === (e.target as HTMLSelectElement).value,
                    )
                    if (auth) form.value.author = auth
                  }}
                  class="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-black text-slate-700 outline-none"
                >
                  {articleStore.authors.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags Input */}
              <div class="pt-6 border-t border-slate-50 space-y-3">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Tags
                </label>
                <div class="flex gap-2">
                  <input
                    value={tagInput.value}
                    onInput={(e) => {
                      tagInput.value = (e.target as HTMLInputElement).value
                    }}
                    onKeydown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addTag()
                      }
                    }}
                    type="text"
                    placeholder="Add tag..."
                    class="flex-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-bold text-slate-700 outline-none"
                  />
                  <button
                    onClick={addTag}
                    type="button"
                    class="px-3 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 transition cursor-pointer border-none"
                  >
                    <i class="bi bi-plus"></i>
                  </button>
                </div>
                {form.value.tags.length > 0 && (
                  <div class="flex flex-wrap gap-2 mt-2">
                    {form.value.tags.map((tag, index) => (
                      <span
                        key={tag}
                        class="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-primary/10 text-primary text-xs font-bold"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(index)}
                          type="button"
                          class="hover:text-primary/70 transition cursor-pointer border-none bg-transparent p-0"
                        >
                          <i class="bi bi-x text-[10px]"></i>
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div class="bg-indigo-600 rounded-2xl p-6 text-white text-center shadow-lg shadow-indigo-100">
              <i class="bi bi-shield-lock-fill text-3xl mb-3 block text-white/40" />
              <h4 class="font-black text-lg mb-1 leading-none uppercase tracking-tight">
                Security Note
              </h4>
              <p class="text-[10px] text-white/60 mb-0 leading-relaxed uppercase font-bold tracking-widest">
                Admin Authorization Required for Publishing
              </p>
            </div>
          </aside>
        </div>
      </div>
    )
  },
})
