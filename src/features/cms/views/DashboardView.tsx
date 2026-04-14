import { defineComponent, computed } from 'vue'
import { useHead } from '@/composables/useHead'
import { useArticleStore } from '@/features/article/store/article.store'
import { useCMSStore } from '../store/cms.store'
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
    const { getLocalizedField } = useLocalizedField()

    useHead({
      title: 'Dashboard — CMS VERITY+',
    })

// Analytics components removed

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

        <div class="grid gap-8">

          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
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
                      src={article.coverImage ?? undefined}
                      class="w-12 h-12 rounded-lg object-cover shadow-sm bg-slate-100"
                    />

                    <div class="flex flex-col">
                      <h4 class="font-bold text-slate-900 leading-tight group-hover:text-primary transition">
                        {getLocalizedField(article, 'title')}
                      </h4>
                      <p class="text-xs text-slate-400 font-medium">
                        By {article.author?.name || 'Unknown'} • {article.publishedAt}
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


          {/* Sidebar Analytics removed */}
        </div>
      </div>
    )
  },
})
