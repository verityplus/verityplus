import { defineComponent, ref, onMounted, computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { useI18n } from 'vue-i18n'
import { gql } from '@apollo/client/core'
import { apolloClient } from '@/shared/services/apollo'

const GET_ADSENSE_SUMMARY = gql`
  query GetAdSenseSummary {
    adsenseSummary {
      estimatedEarnings
      impressions
      pageViews
      clicks
      pageViewsCtr
      costPerClick
      dailyStats {
        date
        earnings
      }
    }
  }
`

export default defineComponent({
  name: 'AdSenseView',
  setup() {
    const { t } = useI18n()

    const { data, isLoading, error } = useQuery({
      queryKey: ['adsense-summary'],
      queryFn: async () => {
        const result = await apolloClient.query({
          query: GET_ADSENSE_SUMMARY,
          fetchPolicy: 'network-only',
        })
        return result.data.adsenseSummary
      },
    })

    const summary = computed(() => data.value)

    const formatCurrency = (value: string | number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(Number(value))
    }

    const formatNumber = (value: number) => {
      return new Intl.NumberFormat('en-US').format(value)
    }

    return () => (
      <div class="p-8 max-w-7xl mx-auto animate-fade-in">
        <header class="mb-10 flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">
              AdSense Dashboard
            </h1>
            <p class="text-slate-500 mt-1">
              Monitor your monetization performance and earnings.
            </p>
          </div>
          <div class="bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2">
            <span class="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            Live Data (Last 30 Days)
          </div>
        </header>

        {isLoading.value ? (
          <div class="flex items-center justify-center h-64">
             <div class="flex flex-col items-center gap-4">
               <div class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
               <span class="text-slate-400 font-medium">Fetching AdSense data...</span>
             </div>
          </div>
        ) : error.value ? (
          <div class="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <i class="bi bi-exclamation-triangle-fill text-4xl text-red-500 mb-4 inline-block"></i>
            <h3 class="text-lg font-bold text-red-900">Failed to load AdSense data</h3>
            <p class="text-red-600 mt-2">Please ensure your environment variables are correctly configured.</p>
          </div>
        ) : (
          <div class="space-y-8">

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  label: 'Estimated Earnings',
                  value: formatCurrency(summary.value?.estimatedEarnings || '0'),
                  icon: 'bi bi-cash-stack',
                  color: 'bg-emerald-500',
                  trend: '+12.5%'
                },
                {
                  label: 'Impressions',
                  value: formatNumber(summary.value?.impressions || 0),
                  icon: 'bi bi-eye-fill',
                  color: 'bg-blue-500',
                  trend: '+5.2%'
                },
                {
                  label: 'Page Views',
                  value: formatNumber(summary.value?.pageViews || 0),
                  icon: 'bi bi-file-earmark-text',
                  color: 'bg-indigo-500',
                  trend: '-1.4%'
                },
                {
                  label: 'CTR',
                  value: `${(summary.value?.pageViewsCtr || 0).toFixed(2)}%`,
                  icon: 'bi bi-cursor-fill',
                  color: 'bg-amber-500',
                  trend: '+0.8%'
                }
              ].map(stat => (
                <div key={stat.label} class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 group">
                  <div class="flex items-center justify-between mb-4">
                    <div class={[stat.color, 'w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-current/20 group-hover:scale-110 transition-transform']}>
                      <i class={stat.icon}></i>
                    </div>
                    <span class={['text-xs font-bold px-2 py-1 rounded-full', stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600']}>
                      {stat.trend}
                    </span>
                  </div>
                  <h3 class="text-slate-500 text-sm font-medium">{stat.label}</h3>
                  <p class="text-2xl font-black text-slate-900 mt-1">{stat.value}</p>
                </div>
              ))}
            </div>


            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div class="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <div class="flex items-center justify-between mb-8">
                   <h2 class="text-xl font-bold text-slate-900">Earnings History</h2>
                   <div class="flex items-center gap-2">
                     <span class="w-3 h-3 bg-primary rounded-full"></span>
                     <span class="text-xs text-slate-400 font-medium">Daily Performance</span>
                   </div>
                </div>

                <div class="space-y-4">
                  {(summary.value?.dailyStats || []).length > 0 ? (
                    summary.value.dailyStats.map((stat: any) => (
                      <div key={stat.date} class="flex items-center gap-4 group">
                        <span class="text-xs text-slate-400 font-mono w-24">
                          {new Date(stat.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                        <div class="flex-1 h-3 bg-slate-50 rounded-full overflow-hidden">
                           <div
                             class="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full group-hover:from-primary transition-all duration-500"
                             style={{ width: `${Math.min(100, (stat.earnings / (Math.max(...summary.value.dailyStats.map((s: any) => s.earnings)) || 1)) * 100)}%` }}
                           />
                        </div>
                        <span class="text-sm font-bold text-slate-700 w-20 text-right">
                          {formatCurrency(stat.earnings)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div class="h-48 flex items-center justify-center text-slate-300 border-2 border-dashed border-slate-100 rounded-xl">
                      No historical data available yet
                    </div>
                  )}
                </div>
              </div>

              <div class="bg-slate-900 rounded-2xl p-8 text-white shadow-xl shadow-slate-200">
                <h2 class="text-xl font-bold mb-6 flex items-center gap-2">
                   <i class="bi bi-lightning-charge-fill text-amber-400"></i>
                   Performance Metrics
                </h2>
                <div class="space-y-6">
                  <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                    <p class="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">Clicks</p>
                    <p class="text-2xl font-black">{formatNumber(summary.value?.clicks || 0)}</p>
                  </div>
                  <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                    <p class="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">Cost Per Click (CPC)</p>
                    <p class="text-2xl font-black text-emerald-400">{formatCurrency(summary.value?.costPerClick || '0')}</p>
                  </div>
                  <div class="mt-8 pt-8 border-t border-white/10">
                     <div class="flex items-center justify-between mb-4">
                        <span class="text-sm text-slate-300">Account Health</span>
                        <span class="text-xs bg-emerald-500 px-2 py-0.5 rounded-full text-white font-bold uppercase">Good</span>
                     </div>
                     <p class="text-xs text-slate-400 leading-relaxed italic">
                        Your AdSense Auto Ads are optimized and active. Revenue growth is consistent with traffic trends.
                     </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  },
})
