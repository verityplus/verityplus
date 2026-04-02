import { defineComponent, ref, computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { marked } from 'marked'
import { useArticleStore } from '@/features/article/store/article.store'
import { useCMSContentStore } from '@/features/cms/store/cms-content.store'
import type { Article, Category, Author } from '@/shared/types'
import { BaseButton } from '@/components/ui/Button'

/**
 * CMS View: ArticleEditorView
 * Full-screen editor with side-by-side Markdown preview.
 */
export default defineComponent({
  name: 'ArticleEditorView',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const articleStore = useArticleStore()
    const cmsContentStore = useCMSContentStore()

    const isEdit = computed(() => route.params.slug !== undefined)
    const isPreview = ref(false)

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
      isFeatured: false,
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

    const previewHtml = computed(() => {
      return marked.parse(form.value.content || '*No content provided yet.*')
    })

    const textareaRef = ref<HTMLTextAreaElement | null>(null)

    // --- Markdown Toolbar Helpers ---
    const insertMarkdown = (before: string, after: string = '') => {
      const el = textareaRef.value
      if (!el) return

      const start = el.selectionStart
      const end = el.selectionEnd
      const text = form.value.content || ''
      const selectedText = text.substring(start, end)

      const newText = text.substring(0, start) + before + selectedText + after + text.substring(end)
      form.value.content = newText

      // Reset focus and selection
      setTimeout(() => {
        el.focus()
        const newPos = start + before.length + selectedText.length + after.length
        el.setSelectionRange(newPos, newPos)
      }, 0)
    }

    const onToolbarImageUpload = () => {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0]
        if (file) {
          const url = URL.createObjectURL(file)
          insertMarkdown(`![Image](${url})`)
        }
      }
      input.click()
    }

    const toolbar = [
      { name: 'H2', icon: 'bi-type-h2', action: () => insertMarkdown('## ') },
      { name: 'H3', icon: 'bi-type-h3', action: () => insertMarkdown('### ') },
      { name: 'H4', icon: 'bi-type-h4', action: () => insertMarkdown('#### ') },
      { name: 'H5', icon: 'bi-type-h5', action: () => insertMarkdown('##### ') },
      { name: 'H6', icon: 'bi-type-h6', action: () => insertMarkdown('###### ') },
      { name: 'Bold', icon: 'bi-type-bold', action: () => insertMarkdown('**', '**') },
      { name: 'Italic', icon: 'bi-type-italic', action: () => insertMarkdown('*', '*') },
      { name: 'Underline', icon: 'bi-type-underline', action: () => insertMarkdown('<u>', '</u>') },
      {
        name: 'Strikethrough',
        icon: 'bi-type-strikethrough',
        action: () => insertMarkdown('~~', '~~'),
      },
      { name: 'Code', icon: 'bi-code-slash', action: () => insertMarkdown('```\n', '\n```') },
      { name: 'Image', icon: 'bi-image', action: onToolbarImageUpload },
      { name: 'YouTube', icon: 'bi-youtube', action: () => insertMarkdown('@[youtube](', ')') },
    ]

    const save = () => {
      if (!form.value.title || !form.value.slug) {
        alert('Title and slug are required.')
        return
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
          <div class="flex items-center gap-3">
            <button
              onClick={() => {
                isPreview.value = !isPreview.value
              }}
              class={[
                'px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest border border-slate-200 hover:bg-slate-50 transition cursor-pointer',
                isPreview.value
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-600 ring-2 ring-indigo-100'
                  : 'bg-white text-slate-500',
              ]}
            >
              <i class={['bi mr-2', isPreview.value ? 'bi-eye-slash' : 'bi-eye']}></i>
              {isPreview.value ? 'Editing Mode' : 'Live Preview'}
            </button>
            <BaseButton
              onClick={save}
              variant="primary"
              class="shadow-lg shadow-primary/20 px-8 py-3.5 uppercase font-black tracking-widest text-xs"
            >
              {isEdit.value ? 'Update Article' : 'Publish Article'}
            </BaseButton>
          </div>
        </header>

        <div class="flex-grow flex flex-col lg:flex-row gap-8 min-h-[600px]">
          {/* Main Editor Column */}
          <div
            class={[
              'flex-grow space-y-6 transition-all duration-500',
              isPreview.value ? 'lg:w-[45%]' : 'lg:w-full',
            ]}
          >
            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-8">
              {/* Title Section */}
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Article Title
                </label>
                <input
                  disabled={isPreview.value}
                  value={form.value.title}
                  onInput={(e) => {
                    form.value.title = (e.target as HTMLInputElement).value
                  }}
                  type="text"
                  placeholder="Enter a compelling headline..."
                  class="w-full text-3xl sm:text-4xl rounded-xl border border-transparent focus:border-slate-100 focus:bg-slate-50/20 p-2 outline-none font-black text-slate-900 placeholder-slate-200 transition"
                />
              </div>

              {/* URL Slug & Category */}
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-100">
                <div class="space-y-2">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    URL Slug
                  </label>
                  <div class="relative">
                    <input
                      disabled={isPreview.value}
                      value={form.value.slug}
                      onInput={(e) => {
                        form.value.slug = (e.target as HTMLInputElement).value
                      }}
                      type="text"
                      class="w-full pl-3 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/30 focus:bg-white text-sm font-bold text-slate-700 transition"
                    />
                  </div>
                </div>
                <div class="space-y-2">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Internal Category
                  </label>
                  <select
                    disabled={isPreview.value}
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

              {/* Content Editor */}
              <div class="pt-4 border-t border-slate-100 min-h-[500px] flex flex-col">
                <header class="flex items-center justify-between mb-4">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Long-form Content (Markdown)
                  </label>

                  {/* Markdown Toolbar */}
                  <div class="flex items-center gap-1 bg-slate-50 p-1 rounded-lg border border-slate-100 overflow-x-auto custom-scrollbar">
                    {toolbar.map((tool) => (
                      <button
                        key={tool.name}
                        onClick={tool.action}
                        title={tool.name}
                        class="h-8 min-w-[32px] px-2 rounded flex items-center justify-center text-slate-500 hover:bg-white hover:text-primary hover:shadow-sm transition cursor-pointer font-black text-[10px]"
                      >
                        {tool.name.startsWith('H') ? (
                          <span class="leading-none uppercase">{tool.name}</span>
                        ) : (
                          <i class={['bi', tool.icon]} />
                        )}
                      </button>
                    ))}
                  </div>
                </header>

                <textarea
                  ref={textareaRef}
                  disabled={isPreview.value}
                  value={form.value.content || ''}
                  onInput={(e) => {
                    form.value.content = (e.target as HTMLTextAreaElement).value
                  }}
                  placeholder="Tell your story. Support Markdown (H2, H3, Lists, Links, Bold, Italic)..."
                  class="w-full flex-grow p-4 bg-slate-50/30 rounded-xl font-mono text-sm leading-relaxed border border-transparent focus:border-slate-100 focus:bg-white focus:ring-0 outline-none resize-none min-h-[400px]"
                />
              </div>
            </div>
          </div>

          {/* Persistent Sidebar/Preview Column */}
          {isPreview.value && (
            <div
              class={[
                'flex flex-col space-y-6 transition-all duration-500 w-full lg:w-[55%] animate-in fade-in slide-in-from-right-10',
              ]}
            >
              <div class="bg-white rounded-2xl border border-slate-200 shadow-xl p-8 sticky top-24 max-h-[80vh] overflow-y-auto custom-scrollbar">
                <div class="section-header mb-6">
                  <span class="section-header-title">Live Preview Rendering</span>
                </div>
                <div class="prose prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed">
                  <h1 class="text-4xl font-black text-slate-900 mb-6">
                    {form.value.title || 'Untitled Article'}
                  </h1>
                  <div v-html={previewHtml.value} class="markdown-preview" />
                </div>
              </div>
            </div>
          )}

          {!isPreview.value && (
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
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-bold text-slate-500 uppercase tracking-tighter">
                      Featured Post
                    </span>
                    <input
                      type="checkbox"
                      checked={form.value.isFeatured}
                      onChange={() => {
                        form.value.isFeatured = !form.value.isFeatured
                      }}
                      class="w-5 h-5 rounded-md border-slate-300 text-primary focus:ring-primary/20 accent-primary"
                    />
                  </div>
                  <p class="text-[10px] text-slate-400 leading-tight">
                    Displayed in the primary homepage carousel.
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
          )}
        </div>
      </div>
    )
  },
})
