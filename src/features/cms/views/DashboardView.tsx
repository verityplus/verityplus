import { defineComponent, computed, onMounted } from 'vue'
import { useHead } from '@/composables/useHead'
import { useArticleStore } from '@/features/article/store/article.store'
import { useCMSStore } from '../store/cms.store'
import { useAnalyticsStore } from '@/features/analytics/store/analytics.store'
import { useLocalizedField } from '@/composables/useLocalizedField'
import { BaseImage } from '@/components/ui/Image'


/**
 * CMS View: DashboardView
 * Statistical overview and snapshot of current state.
 */
export default defineComponent({
  name: 'DashboardView',
  setup() {
    const articleStore = useArticleStore()
    const cmsStore = useCMSStore()
    const analyticsStore = useAnalyticsStore()
    const { getLocalizedField } = useLocalizedField()

    useHead({
      title: 'Dashboard — CMS VERITY+',
    })

    onMounted(() => {
      analyticsStore.refreshSummary()
    })

    const analyticsCards = computed(() => {
      const s = analyticsStore.summary
      if (!s) return []
      return [
        {
          name: 'Total Visits',
          value: s.totalVisits,
          icon: 'bi bi-eye-fill',
          color: 'bg-violet-500',
        },
        {
          name: 'Unique Visitors',
          value: s.uniqueVisitors,
          icon: 'bi bi-people-fill',
          color: 'bg-cyan-500',
        },
        {
          name: 'Page Views',
          value: s.pageViews,
          icon: 'bi bi-file-earmark-bar-graph-fill',
          color: 'bg-rose-500',
        },
        {
          name: 'Avg. Duration',
          value: `${s.avgDuration}s`,
          icon: 'bi bi-clock-fill',
          color: 'bg-amber-500',
        },
      ]
    })

    const topPages = computed(() => analyticsStore.summary?.topPages.slice(0, 5) || [])
    const maxPageViews = computed(() => Math.max(...topPages.value.map((p) => p.views), 1))

    const stats = computed(() => [
      {
        name: 'Total Articles',
        value: articleStore.articles.length,
        icon: 'bi bi-journal-check',
        color: 'bg-primary',
      },
      {
        name: 'Active Characters',
        value: articleStore.authors.length,
        icon: 'bi bi-person-badge',
        color: 'bg-emerald-500',
      },
      {
        name: 'Categories',
        value: articleStore.categories.length,
        icon: 'bi bi-tag-fill',
        color: 'bg-amber-500',
      },
      {
        name: 'Admin Users',
        value: cmsStore.users.length,
        icon: 'bi bi-shield-lock-fill',
        color: 'bg-indigo-500',
      },
    ])

    const recentArticles = computed(() => articleStore.articles.slice(0, 5))

    return () => (
      <div class="space-y-8 animate-in fade-in duration-700">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.value.map((stat) => (
            <div
              key={stat.name}
              class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:shadow-lg transition duration-300"
            >
              <div class="flex flex-col">
                <span class="text-sm font-bold text-slate-400 uppercase tracking-widest">
                  {stat.name}
                </span>
                <span class="text-3xl font-black text-slate-900 mt-1 tabular-nums">
                  {stat.value}
                </span>
              </div>
              <div
                class={[
                  stat.color,
                  'w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg ring-4 ring-white transition group-hover:scale-110',
                ]}
              >
                <i class={stat.icon} />
              </div>
            </div>
          ))}
        </div>

        {analyticsCards.value.length > 0 && (
          <div>
            <h2 class="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
              <i class="bi bi-graph-up-arrow text-primary"></i>
              Visitor Analytics
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {analyticsCards.value.map((card) => (
                <div
                  key={card.name}
                  class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:shadow-lg transition duration-300"
                >
                  <div class="flex flex-col">
                    <span class="text-sm font-bold text-slate-400 uppercase tracking-widest">
                      {card.name}
                    </span>
                    <span class="text-3xl font-black text-slate-900 mt-1 tabular-nums">
                      {card.value}
                    </span>
                  </div>
                  <div
                    class={[
                      card.color,
                      'w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg ring-4 ring-white transition group-hover:scale-110',
                    ]}
                  >
                    <i class={card.icon} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Recent Articles Snapshot */}
          <div class="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
            <header class="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 class="font-black text-slate-900 flex items-center gap-2">
                <i class="bi bi-clock-history text-primary"></i>
                Recently Published
              </h3>
              <router-link
                to="/cms/articles"
                class="text-xs font-black text-primary uppercase tracking-widest hover:underline"
              >
                View All Articles
              </router-link>
            </header>

            <div class="divide-y divide-slate-50 flex-grow">
              {recentArticles.value.map((article) => (
                <div
                  key={article.id}
                  class="p-6 flex items-center justify-between group hover:bg-slate-50 transition duration-300"
                >
                  <div class="flex items-center gap-4">
                    <BaseImage
                      src={article.coverImage}
                      class="w-12 h-12 rounded-lg object-cover shadow-sm bg-slate-100"
                    />

                    <div class="flex flex-col">
                      <h4 class="font-bold text-slate-900 leading-tight group-hover:text-primary transition">
                        {getLocalizedField(article, 'title')}
                      </h4>
                      <p class="text-xs text-slate-400 font-medium">
                        By {article.author.name} • {article.publishedAt}
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <span
                      class={[
                        article.status === 'featured'
                          ? 'bg-violet-100 text-violet-700'
                          : article.status === 'draft'
                            ? 'bg-slate-100 text-slate-600'
                            : article.status === 'archived'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-emerald-100 text-emerald-700',
                        'text-[10px] font-black uppercase px-2 py-0.5 rounded-full',
                      ]}
                    >
                      {article.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analytics Snapshot */}
          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
            <header class="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 class="font-black text-slate-900 flex items-center gap-2">
                <i class="bi bi-bar-chart-fill text-primary"></i>
                Analytics
              </h3>
              <router-link
                to="/cms/analytics"
                class="text-xs font-black text-primary uppercase tracking-widest hover:underline"
              >
                View Details
              </router-link>
            </header>

            {analyticsStore.summary ? (
              <div class="p-6 space-y-4 flex-grow">
                {topPages.value.length > 0 ? (
                  topPages.value.map((page) => (
                    <div class="space-y-1">
                      <div class="flex items-center justify-between text-sm">
                        <span class="font-bold text-slate-700 truncate max-w-[200px]">
                          {page.path}
                        </span>
                        <span class="text-slate-400 font-medium tabular-nums">{page.views}</span>
                      </div>
                      <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          class="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${(page.views / maxPageViews.value) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div class="py-8 text-center text-slate-400">
                    <i class="bi bi-graph-up text-3xl mb-2 block"></i>
                    <p class="text-sm font-medium">No analytics data yet</p>
                    <p class="text-xs mt-1">Visitor data will appear here once tracking begins.</p>
                  </div>
                )}
              </div>
            ) : (
              <div class="py-8 text-center text-slate-400">
                <i class="bi bi-graph-up text-3xl mb-2 block"></i>
                <p class="text-sm font-medium">No analytics data yet</p>
                <p class="text-xs mt-1">Visitor data will appear here once tracking begins.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  },
})
