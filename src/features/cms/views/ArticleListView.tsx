import { defineComponent, ref, computed } from 'vue'
import { useHead } from '@/composables/useHead'
import { useArticleStore } from '@/features/article/store/article.store'
import { useCMSContentStore } from '@/features/cms/store/cms-content.store'
import { useAnalyticsStore } from '@/features/analytics/store/analytics.store'
import { onMounted } from 'vue'
import { BaseBadge } from '@/components/ui/Badge'
import { BaseButton } from '@/components/ui/Button'
import { useLocalizedField } from '@/composables/useLocalizedField'
import type { ArticleStatus } from '@/shared/types'
import { ARTICLE_STATUS_LABELS } from '@/shared/types'
import { appConfirm } from '@/utils/dialog'
import { BaseImage } from '@/components/ui/Image'


/**
 * CMS View: ArticleListView
 * Management table for all blog posts.
 */
export default defineComponent({
  name: 'ArticleListView',
  setup() {
    const articleStore = useArticleStore()
    const cmsContentStore = useCMSContentStore()
    const { getLocalizedField } = useLocalizedField()
    const searchQuery = ref('')
    const analyticsStore = useAnalyticsStore()

    onMounted(async () => {
      await analyticsStore.refreshSummary()
    })

    const getViewsForArticle = (id: string | number) => {
      if (!analyticsStore.summary?.topPages) return 0
      const pattern = new RegExp(`^(\\/[a-z]{2})?\\/read\\/${id}$`)
      return analyticsStore.summary.topPages
        .filter((p) => pattern.test(p.path))
        .reduce((sum, p) => sum + p.views, 0)
    }

    useHead({
      title: 'Manage Articles — CMS VERITY+',
    })

    const filteredArticles = computed(() => {
      const q = searchQuery.value.toLowerCase().trim()
      if (!q) return articleStore.articles
      return articleStore.articles.filter(
        (a) =>
          getLocalizedField(a, 'title').toLowerCase().includes(q) ||
          a.author.name.toLowerCase().includes(q),
      )
    })

    const deleteArticle = async (id: number) => {
      if (await appConfirm('Are you sure you want to delete this article? This action cannot be undone.', 'Confirm Deletion')) {
        await cmsContentStore.deleteArticle(id)
      }
    }

    const statusColors: Record<ArticleStatus, { bg: string; text: string; icon: string }> = {
      draft: { bg: 'bg-slate-100', text: 'text-slate-600', icon: 'bi-file-earmark' },
      published: { bg: 'bg-emerald-100', text: 'text-emerald-600', icon: 'bi-broadcast' },
      archived: { bg: 'bg-amber-100', text: 'text-amber-600', icon: 'bi-archive' },
      featured: { bg: 'bg-violet-100', text: 'text-violet-600', icon: 'bi-star-fill' },
    }

    return () => (
      <div class="space-y-6">
        <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div class="flex flex-col">
            <h1 class="text-3xl font-black text-slate-900 tracking-tight">Article Management</h1>
            <p class="text-slate-400 font-medium">
              Create, update, or remove articles across the VERITY+ network.
            </p>
          </div>
          <router-link to="/cms/articles/new">
            <BaseButton
              variant="primary"
              class="shadow-lg shadow-primary/20 px-8 py-4 uppercase font-black tracking-widest text-xs"
            >
              <i class="bi bi-plus-lg mr-2"></i> Create Article
            </BaseButton>
          </router-link>
        </header>

        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div class="p-4 border-b border-slate-100 bg-slate-50/50">
            <div class="relative max-w-md w-full">
              <input
                value={searchQuery.value}
                onInput={(e) => (searchQuery.value = (e.target as HTMLInputElement).value)}
                type="text"
                placeholder="Search articles by title or author..."
                class="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition text-sm font-medium"
              />
              <i class="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            </div>
          </div>

          <div class="overflow-x-auto min-h-[400px]">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <th class="px-6 py-4">Article Details</th>
                  <th class="px-6 py-4">Category</th>
                  <th class="px-6 py-4">Status</th>
                  <th class="px-6 py-4">Views</th>
                  <th class="px-6 py-4">Published Date</th>
                  <th class="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 font-medium text-sm">
                {filteredArticles.value.map((article) => {
                  const statusConfig = statusColors[article.status] || statusColors.draft
                  return (
                    <tr key={article.id} class="hover:bg-slate-50/50 transition group">
                      <td class="px-6 py-5">
                        <div class="flex items-center gap-3">
                          <BaseImage
                            src={article.coverImage}
                            class="w-10 h-10 rounded-lg object-cover shadow-sm bg-slate-100"
                          />

                          <div class="flex flex-col">
                            <span class="text-slate-900 font-bold leading-tight group-hover:text-primary transition">
                              {getLocalizedField(article, 'title')}
                            </span>
                            <span class="text-[10px] text-slate-400 mt-0.5">
                              By {article.author.name}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-5">
                        <BaseBadge
                          class="text-[10px]"
                        >
                          {getLocalizedField(article.category, 'name')}
                        </BaseBadge>
                      </td>
                      <td class="px-6 py-5">
                        <span
                          class={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full ${statusConfig.bg} ${statusConfig.text}`}
                        >
                          <i class={`bi ${statusConfig.icon} text-[10px]`} />
                          <span class="text-[10px] font-black uppercase tracking-wider">
                            {ARTICLE_STATUS_LABELS[article.status]}
                          </span>
                        </span>
                      </td>
                      <td class="px-6 py-5 text-slate-400 text-xs uppercase tracking-tighter">
                        <div class="flex items-center gap-1 text-slate-500 font-mono text-xs">
                          <i class="bi bi-eye text-[10px]"></i>
                          {getViewsForArticle(article.id).toLocaleString()}
                        </div>
                      </td>
                      <td class="px-6 py-5 text-slate-400 text-xs uppercase tracking-tighter">
                        {article.publishedAt}
                      </td>
                      <td class="px-6 py-5 text-right">
                        <div class="flex items-center justify-end gap-2 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition duration-300">
                          <router-link
                            to={`/cms/articles/${article.id}/edit`}
                            class="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition cursor-pointer"
                          >
                            <i class="bi bi-pencil-square" title="Edit Article" />
                          </router-link>
                          <button
                            onClick={() => deleteArticle(article.id)}
                            class="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition cursor-pointer border-none"
                          >
                            <i class="bi bi-trash" title="Delete Article" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            {filteredArticles.value.length === 0 && (
              <div class="py-24 flex flex-col items-center justify-center text-center">
                <i class="bi bi-journal-x text-5xl text-slate-200 mb-4" />
                <p class="text-slate-400 font-bold italic">
                  No articles found matching your criteria.
                </p>
              </div>
            )}
          </div>

          <footer class="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[10px] font-black text-slate-400 px-6">
            <p>
              Showing {filteredArticles.value.length} of {articleStore.articles.length} articles
            </p>
            <p>VERITY+ Cloud Database System</p>
          </footer>
        </div>
      </div>
    )
  },
})
