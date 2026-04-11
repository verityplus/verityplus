import { apolloClient } from '@/shared/services/apollo'
import { gql } from '@apollo/client/core'
import type { AnalyticsSummary } from '../types'

const GET_ANALYTICS_SUMMARY = gql`
  query GetAnalyticsSummary {
    analyticsSummary {
      totalVisits
      uniqueVisitors
      pageViews
      avgDuration
      topPages {
        path
        views
      }
      topReferrers {
        referrer
        count
      }
      dailyVisits {
        date
        visits
      }
    }
  }
`

export const AnalyticsService = {
  async getSummary(): Promise<AnalyticsSummary | null> {
    try {
      const result = await apolloClient.query<{ analyticsSummary: AnalyticsSummary }>({
        query: GET_ANALYTICS_SUMMARY,
        fetchPolicy: 'network-only',
      })
      return result.data?.analyticsSummary || null
    } catch (error) {
      console.error('Failed to fetch analytics summary:', error)
      return null
    }
  },
}
