import { defineComponent, ref, onMounted } from 'vue'
import { useHead } from '@/composables/useHead'
import { useAnalyticsStore } from '@/features/analytics/store/analytics.store'

export default defineComponent({
  name: 'AnalyticsView',
  setup() {
    const analyticsStore = useAnalyticsStore()
    const showClearConfirm = ref(false)

    useHead({
      title: 'Analytics — CMS Verity+',
    })

    onMounted(() => {
      analyticsStore.refreshSummary()
    })

    const handleClearData = () => {
      if (showClearConfirm.value) {
        analyticsStore.resetData()
        showClearConfirm.value = false
      } else {
        showClearConfirm.value = true
        setTimeout(() => {
          showClearConfirm.value = false
        }, 3000)
      }
    }

    const handleExportData = () => {
      const summary = analyticsStore.summary
      if (!summary) return

      const data = {
        exportedAt: new Date().toISOString(),
        summary,
        articleViews: analyticsStore.fetchArticleViews(),
      }

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `analytics-export-${new Date().toISOString().split('T')[0]}.json`
      a.click()
      URL.revokeObjectURL(url)
    }

    const maxDailyVisits = Math.max(
      ...(analyticsStore.summary?.dailyVisits.map((d) => d.visits) || [1]),
    )

    return () => {
      const s = analyticsStore.summary

      return (
        <div class="space-y-8 animate-in fade-in duration-700">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-black text-slate-900">Analytics Dashboard</h1>
              <p class="text-slate-500 mt-1">Visitor insights and page performance</p>
            </div>
            <div class="flex items-center gap-3">
              <button
                onClick={handleExportData}
                class="px-4 py-2 text-sm font-bold uppercase tracking-wider text-primary border border-primary rounded-xl hover:bg-primary/5 transition cursor-pointer"
              >
                <i class="bi bi-download mr-2"></i>Export
              </button>
              <button
                onClick={handleClearData}
                class={[
                  'px-4 py-2 text-sm font-bold uppercase tracking-wider rounded-xl transition cursor-pointer',
                  showClearConfirm.value
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'text-slate-400 border border-slate-200 hover:bg-slate-50 hover:text-red-500',
                ]}
              >
                {showClearConfirm.value ? 'Confirm Clear?' : 'Clear Data'}
              </button>
            </div>
          </div>

          {!s ? (
            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-16 text-center">
              <i class="bi bi-bar-chart-line text-6xl text-slate-200 mb-4 block"></i>
              <h3 class="text-xl font-black text-slate-700">No Analytics Data</h3>
              <p class="text-slate-400 mt-2">
                Visitor data will appear here once users accept cookies and browse the site.
              </p>
            </div>
          ) : (
            <>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
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
                ].map((card) => (
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

              <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <header class="p-6 border-b border-slate-100">
                    <h3 class="font-black text-slate-900 flex items-center gap-2">
                      <i class="bi bi-file-earmark-bar-graph text-primary"></i>
                      Top Pages
                    </h3>
                  </header>
                  <div class="p-6 space-y-4">
                    {s.topPages.length > 0 ? (
                      s.topPages.map((page) => (
                        <div class="space-y-1">
                          <div class="flex items-center justify-between text-sm">
                            <span class="font-bold text-slate-700 truncate max-w-[250px]">
                              {page.path}
                            </span>
                            <span class="text-slate-400 font-medium tabular-nums">
                              {page.views}
                            </span>
                          </div>
                          <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                            <div
                              class="h-full bg-primary rounded-full transition-all duration-500"
                              style={{
                                width: `${(page.views / Math.max(...s.topPages.map((p) => p.views))) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <p class="text-center text-slate-400 py-8 text-sm">No page view data yet</p>
                    )}
                  </div>
                </div>

                <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <header class="p-6 border-b border-slate-100">
                    <h3 class="font-black text-slate-900 flex items-center gap-2">
                      <i class="bi bi-link-45deg text-primary"></i>
                      Top Referrers
                    </h3>
                  </header>
                  <div class="divide-y divide-slate-50">
                    {s.topReferrers.length > 0 ? (
                      s.topReferrers.map((ref) => (
                        <div class="p-4 flex items-center justify-between">
                          <span class="font-medium text-slate-700 truncate max-w-[250px] text-sm">
                            {ref.referrer === 'direct' ? 'Direct Traffic' : ref.referrer}
                          </span>
                          <span class="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full tabular-nums">
                            {ref.count}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p class="text-center text-slate-400 py-8 text-sm">No referrer data yet</p>
                    )}
                  </div>
                </div>
              </div>

              {s.dailyVisits.length > 0 && (
                <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <header class="p-6 border-b border-slate-100">
                    <h3 class="font-black text-slate-900 flex items-center gap-2">
                      <i class="bi bi-calendar3 text-primary"></i>
                      Daily Visits (Last 30 Days)
                    </h3>
                  </header>
                  <div class="p-6">
                    <div class="flex items-end gap-1 h-32">
                      {s.dailyVisits.map((day) => (
                        <div
                          class="flex-1 bg-primary/20 hover:bg-primary/40 transition rounded-t-sm relative group"
                          style={{ height: `${(day.visits / maxDailyVisits) * 100}%` }}
                        >
                          <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none z-10">
                            {day.date}: {day.visits} visits
                          </div>
                        </div>
                      ))}
                    </div>
                    <div class="flex justify-between mt-2 text-xs text-slate-400">
                      <span>{s.dailyVisits[0]?.date}</span>
                      <span>{s.dailyVisits[s.dailyVisits.length - 1]?.date}</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )
    }
  },
})
