import { defineComponent, ref, computed } from 'vue'
import { useArticleStore } from '@/features/article/store/article.store'
import { useCMSContentStore } from '@/features/cms/store/cms-content.store'
import { BaseBadge } from '@/components/ui/Badge'
import { BaseButton } from '@/components/ui/Button'

/**
 * CMS View: CategoryListView
 * Management table for article categories.
 */
export default defineComponent({
  name: 'CategoryListView',
  setup() {
    const articleStore = useArticleStore()
    const cmsContentStore = useCMSContentStore()
    const searchQuery = ref('')

    const filteredCategories = computed(() => {
      const q = searchQuery.value.toLowerCase().trim()
      if (!q) return articleStore.categories
      return articleStore.categories.filter(
        (c) => c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q),
      )
    })

    const deleteCategory = (id: string) => {
      if (
        confirm(
          'Are you sure you want to delete this category? Articles under this category may still persist but references will be broken.',
        )
      ) {
        cmsContentStore.deleteCategory(id)
      }
    }

    return () => (
      <div class="space-y-6">
        <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div class="flex flex-col">
            <h1 class="text-3xl font-black text-slate-900 tracking-tight">Category Architecture</h1>
            <p class="text-slate-400 font-medium">
              Define the core taxonomy and dynamic themes for Verity+ content.
            </p>
          </div>
          <router-link to="/cms/categories/new">
            <BaseButton
              variant="primary"
              class="shadow-lg shadow-primary/20 px-8 py-4 uppercase font-black tracking-widest text-xs"
            >
              <i class="bi bi-tag mr-2"></i> Define Category
            </BaseButton>
          </router-link>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.value.map((cat) => (
            <div
              key={cat.id}
              class="bg-white p-8 rounded-2xl border-l-8 border-y border-r border-slate-200 shadow-sm flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              style={{ borderLeftColor: `var(--${cat.bgColor.replace('bg-', '')})` }}
            >
              <div class="flex items-center justify-between mb-4">
                <BaseBadge
                  bgColor={cat.bgColor}
                  textColor={cat.color}
                  class="text-xs uppercase font-black tracking-widest px-4 py-1"
                >
                  {cat.name}
                </BaseBadge>
                <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  <router-link
                    to={`/cms/categories/${cat.id}/edit`}
                    class="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-slate-900 hover:text-white transition cursor-pointer no-underline"
                  >
                    <i class="bi bi-pencil-fill text-xs" />
                  </router-link>
                  <button
                    onClick={() => deleteCategory(cat.id)}
                    class="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition cursor-pointer border-none"
                  >
                    <i class="bi bi-trash text-xs" />
                  </button>
                </div>
              </div>

              <h3 class="text-xl font-black text-slate-900 mb-2">{cat.name}</h3>
              <code class="text-xs font-black text-slate-400 uppercase tracking-tighter block mb-6">
                slug: {cat.slug}
              </code>

              <div class="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                <div class="flex items-center gap-1">
                  <div class={['w-4 h-4 rounded-full', cat.bgColor]}></div>
                  <span class="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                    Theme Colors Applied
                  </span>
                </div>
                <span class="text-[10px] font-black text-slate-500 uppercase">Verity Core</span>
              </div>
            </div>
          ))}

          {filteredCategories.value.length === 0 && (
            <div class="col-span-full py-24 text-center">
              <i class="bi bi-tags text-5xl text-slate-200 mb-4 block" />
              <p class="text-slate-400 font-bold italic uppercase tracking-widest">
                No taxonomies found.
              </p>
            </div>
          )}
        </div>
      </div>
    )
  },
})
