import { defineComponent, computed } from 'vue'
import { useArticleStore } from '@/features/article/store/article.store'
import { useCMSStore } from '../store/cms.store'

/**
 * CMS View: DashboardView
 * Statistical overview and snapshot of current state.
 */
export default defineComponent({
  name: 'DashboardView',
  setup() {
    const articleStore = useArticleStore()
    const cmsStore = useCMSStore()

    const stats = computed(() => [
      { name: 'Total Articles', value: articleStore.articles.length, icon: 'bi bi-journal-check', color: 'bg-primary' },
      { name: 'Active Characters', value: articleStore.authors.length, icon: 'bi bi-person-badge', color: 'bg-emerald-500' },
      { name: 'Categories', value: articleStore.categories.length, icon: 'bi bi-tag-fill', color: 'bg-amber-500' },
      { name: 'Admin Users', value: cmsStore.users.length, icon: 'bi bi-shield-lock-fill', color: 'bg-indigo-500' },
    ])

    const recentArticles = computed(() => articleStore.articles.slice(0, 5))

    return () => (
      <div class="space-y-8 animate-in fade-in duration-700">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.value.map(stat => (
            <div key={stat.name} class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:shadow-lg transition duration-300">
              <div class="flex flex-col">
                <span class="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.name}</span>
                <span class="text-3xl font-black text-slate-900 mt-1 tabular-nums">{stat.value}</span>
              </div>
              <div class={[stat.color, 'w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg ring-4 ring-white transition group-hover:scale-110']}>
                <i class={stat.icon} />
              </div>
            </div>
          ))}
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Recent Articles Snapshot */}
          <div class="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
            <header class="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 class="font-black text-slate-900 flex items-center gap-2">
                <i class="bi bi-clock-history text-primary"></i>
                Recently Published
              </h3>
              <router-link to="/cms/articles" class="text-xs font-black text-primary uppercase tracking-widest hover:underline">View All Articles</router-link>
            </header>
            
            <div class="divide-y divide-slate-50 flex-grow">
               {recentArticles.value.map(article => (
                 <div key={article.id} class="p-6 flex items-center justify-between group hover:bg-slate-50 transition duration-300">
                   <div class="flex items-center gap-4">
                     <img src={article.coverImage} class="w-12 h-12 rounded-lg object-cover shadow-sm bg-slate-100" />
                     <div class="flex flex-col">
                       <h4 class="font-bold text-slate-900 leading-tight group-hover:text-primary transition">{article.title}</h4>
                       <p class="text-xs text-slate-400 font-medium">By {article.author.name} • {article.publishedAt}</p>
                     </div>
                   </div>
                   <div class="flex items-center gap-2">
                      <span class={[article.isFeatured ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600', 'text-[10px] font-black uppercase px-2 py-0.5 rounded-full']}>
                        {article.isFeatured ? 'Featured' : 'Standard'}
                      </span>
                   </div>
                 </div>
               ))}
            </div>
          </div>

          {/* Activity Placeholder */}
          <div class="bg-indigo-600 rounded-2xl p-8 text-white relative overflow-hidden flex flex-col justify-center shadow-xl shadow-indigo-100">
             <div class="relative z-10 space-y-6">
                <h3 class="text-2xl font-black leading-tight border-b border-white/20 pb-4">Verity+ Insight</h3>
                <div class="space-y-4">
                   <div class="flex items-start gap-4">
                      <div class="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                         <i class="bi bi-graph-up-arrow"></i>
                      </div>
                      <div>
                         <p class="font-bold text-lg">Growth: +12%</p>
                         <p class="text-sm text-white/70">Traffic has increased significantly this week. Keep up the momentum!</p>
                      </div>
                   </div>
                   <div class="flex items-start gap-4">
                      <div class="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                         <i class="bi bi-chat-heart"></i>
                      </div>
                      <div>
                         <p class="font-bold text-lg">New Feedback</p>
                         <p class="text-sm text-white/70">Visitors are loving the new Character profiles. 5 new user ratings today.</p>
                      </div>
                   </div>
                </div>
                <button class="w-full py-4 bg-white text-indigo-600 rounded-xl font-black uppercase tracking-widest hover:bg-slate-100 transition shadow-lg mt-4 cursor-pointer">
                   Download Report
                </button>
             </div>
             <i class="bi bi-shield-check absolute -bottom-10 -right-10 text-[200px] opacity-10 rotate-12" />
          </div>
        </div>
      </div>
    )
  }
})
