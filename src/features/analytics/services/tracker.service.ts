import type { PageView, AnalyticsSession, AnalyticsSummary } from '../types'

const STORAGE_KEYS = {
  PAGE_VIEWS: 'analytics_page_views',
  SESSION: 'analytics_session',
  CONSENT: 'analytics_consent',
} as const

const MAX_PAGE_VIEWS = 10000

function generateId(): string {
  return crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function getStoredPageViews(): PageView[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PAGE_VIEWS)
    return raw ? (JSON.parse(raw) as PageView[]) : []
  } catch {
    return []
  }
}

function storePageViews(views: PageView[]): void {
  const trimmed = views.length > MAX_PAGE_VIEWS ? views.slice(-MAX_PAGE_VIEWS) : views
  localStorage.setItem(STORAGE_KEYS.PAGE_VIEWS, JSON.stringify(trimmed))
}

function getStoredSession(): AnalyticsSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSION)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function storeSession(session: AnalyticsSession): void {
  localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session))
}

export function getConsentStatus(): 'accepted' | 'declined' | 'pending' {
  const stored = localStorage.getItem(STORAGE_KEYS.CONSENT)
  if (stored === 'accepted' || stored === 'declined') return stored
  return 'pending'
}

export function setConsentStatus(status: 'accepted' | 'declined'): void {
  localStorage.setItem(STORAGE_KEYS.CONSENT, status)
}

export function getSessionId(): string {
  const session = getStoredSession()
  if (session) {
    session.lastActive = Date.now()
    session.pageViews++
    storeSession(session)
    return session.sessionId
  }
  const newSession: AnalyticsSession = {
    sessionId: generateId(),
    startedAt: Date.now(),
    lastActive: Date.now(),
    pageViews: 1,
  }
  storeSession(newSession)
  return newSession.sessionId
}

export function trackPageView(path: string, title: string): void {
  if (getConsentStatus() !== 'accepted') return

  const sessionId = getSessionId()
  const pageViews = getStoredPageViews()

  const existingIndex = pageViews.findIndex(
    (pv) => pv.sessionId === sessionId && pv.path === path && pv.duration === 0,
  )

  if (existingIndex !== -1) {
    const existing = pageViews[existingIndex]
    if (existing) {
      existing.timestamp = Date.now()
      storePageViews(pageViews)
    }
    return
  }

  const newView: PageView = {
    id: generateId(),
    path,
    title,
    timestamp: Date.now(),
    duration: 0,
    referrer: document.referrer || 'direct',
    sessionId,
  }

  pageViews.push(newView)
  storePageViews(pageViews)
}

export function updateLastPageViewDuration(duration: number): void {
  if (getConsentStatus() !== 'accepted') return

  const pageViews = getStoredPageViews()
  if (pageViews.length === 0) return

  const lastView = pageViews[pageViews.length - 1]
  if (lastView && lastView.duration === 0) {
    lastView.duration = duration
    storePageViews(pageViews)
  }
}

export function getAnalyticsSummary(): AnalyticsSummary {
  const pageViews = getStoredPageViews()
  const sessions = new Set(pageViews.map((pv) => pv.sessionId))

  const pageCounts: Record<string, number> = {}
  const referrerCounts: Record<string, number> = {}
  const dailyCounts: Record<string, number> = {}

  for (const pv of pageViews) {
    const p = pv.path
    const r = pv.referrer
    pageCounts[p] = (pageCounts[p] || 0) + 1
    referrerCounts[r] = (referrerCounts[r] || 0) + 1

    const date = new Date(pv.timestamp).toISOString().split('T')[0]
    if (date) {
      const existingDaily = dailyCounts[date]
      dailyCounts[date] = (existingDaily || 0) + 1
    }
  }

  const totalDuration = pageViews.reduce((sum, pv) => sum + pv.duration, 0)

  return {
    totalVisits: pageViews.length,
    uniqueVisitors: sessions.size,
    pageViews: pageViews.length,
    avgDuration: pageViews.length > 0 ? Math.round(totalDuration / pageViews.length / 1000) : 0,
    topPages: Object.entries(pageCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([path, views]) => ({ path, views })),
    topReferrers: Object.entries(referrerCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([referrer, count]) => ({ referrer, count })),
    dailyVisits: Object.entries(dailyCounts)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-30)
      .map(([date, visits]) => ({ date, visits })),
  }
}

export function getArticleViews(): { slug: string; views: number; title: string }[] {
  const pageViews = getStoredPageViews()
  const articleViews: Record<string, { count: number; title: string }> = {}

  for (const pv of pageViews) {
    const match = pv.path.match(/\/read\/(.+)/)
    if (match && match[1]) {
      const slug = match[1]
      if (!articleViews[slug]) {
        articleViews[slug] = { count: 0, title: pv.title }
      }
      articleViews[slug].count++
    }
  }

  return Object.entries(articleViews)
    .sort(([, a], [, b]) => b.count - a.count)
    .map(([slug, data]) => ({ slug, views: data.count, title: data.title }))
}

export function clearAllData(): void {
  localStorage.removeItem(STORAGE_KEYS.PAGE_VIEWS)
  localStorage.removeItem(STORAGE_KEYS.SESSION)
}
