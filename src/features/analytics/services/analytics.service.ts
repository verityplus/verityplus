import { apiClient } from '@/shared/services/apiClient'
import type { AnalyticsSummary } from '../types'

export const AnalyticsService = {
  async getSummary(pagePath?: string): Promise<AnalyticsSummary | null> {
    try {
      const result = await apiClient.get<AnalyticsSummary>('/analytics/summary', {
        params: { pagePath }
      })
      return result || null
    } catch (error) {
      console.error('Failed to fetch analytics summary:', error)
      return null
    }
  },
}
