export interface PageView {
  id: string
  path: string
  title: string
  timestamp: number
  duration: number
  referrer: string
  sessionId: string
}

export interface AnalyticsSession {
  sessionId: string
  startedAt: number
  lastActive: number
  pageViews: number
}

export interface AnalyticsSummary {
  totalVisits: number
  uniqueVisitors: number
  pageViews: number
  avgDuration: number
  topPages: { path: string; views: number }[]
  topReferrers: { referrer: string; count: number }[]
  dailyVisits: { date: string; visits: number }[]
}

export type ConsentStatus = 'accepted' | 'declined' | 'pending'
