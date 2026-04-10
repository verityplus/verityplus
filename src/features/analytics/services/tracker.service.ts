import type { AnalyticsSummary } from '../types'

const STORAGE_KEYS = {
  CONSENT: 'analytics_consent',
} as const

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: [string, ...unknown[]]) => void
  }
}

export function getConsentStatus(): 'accepted' | 'declined' | 'pending' {
  const stored = localStorage.getItem(STORAGE_KEYS.CONSENT)
  if (stored === 'accepted' || stored === 'declined') return stored
  return 'pending'
}

export function setConsentStatus(status: 'accepted' | 'declined'): void {
  localStorage.setItem(STORAGE_KEYS.CONSENT, status)
  if (status === 'accepted') {
    loadGoogleAnalytics()
  }
}

export function loadGoogleAnalytics() {
  if (getConsentStatus() !== 'accepted') return

  const id = import.meta.env.VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID
  if (!id || window.dataLayer) return

  const scriptTag = document.createElement('script')
  scriptTag.async = true
  scriptTag.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  document.head.appendChild(scriptTag)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: [string, ...unknown[]]) {
    window.dataLayer.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', id)
}

export function getSessionId(): string {
  return 'ga-session'
}

export function trackPageView(path: string, title: string): void {
  if (getConsentStatus() !== 'accepted' || !window.gtag) return
  const id = import.meta.env.VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID
  if (id) {
    window.gtag('config', id, { page_path: path, page_title: title })
  }
}

export function updateLastPageViewDuration(_duration: number): void {

}

export function getAnalyticsSummary(): AnalyticsSummary {

  const dailyVisits = Array.from({ length: 30 }).map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (29 - i))
    return {
      date: d.toISOString().split('T')[0] as string,
      visits: Math.floor(Math.random() * 200) + 150,
    }
  })


  return {
    totalVisits: 8432,
    uniqueVisitors: 6150,
    pageViews: 12543,
    avgDuration: 142,
    topPages: [
      { path: '/en', views: 3450 },
      { path: '/id', views: 2890 },
      { path: '/en/articles', views: 1845 },
      { path: '/en/read/startup-growth', views: 980 },
      { path: '/id/about-us', views: 654 },
    ],
    topReferrers: [
      { referrer: 'google.com', count: 4890 },
      { referrer: 'direct', count: 1840 },
      { referrer: 'linkedin.com', count: 960 },
      { referrer: 'bing.com', count: 420 },
      { referrer: 'ycombinator.com', count: 322 },
    ],
    dailyVisits,
  }
}

export function getArticleViews(): { id: string; views: number; title: string }[] {

  return [
    { id: 'startup-growth', views: 980, title: 'The Ultimate Guide to Startup Growth in 2024' },
    {
      id: 'future-of-ai',
      views: 745,
      title: 'How Artificial Intelligence is Reshaping Industries',
    },
    { id: 'remote-work-tips', views: 560, title: '10 Essential Tips for Mastering Remote Work' },
    { id: 'sustainable-tech', views: 420, title: 'Exploring Sustainable Technology Innovations' },
    {
      id: 'cryptocurrency-101',
      views: 245,
      title: 'Cryptocurrency 101: Understanding the Basics',
    },
  ]
}

export function clearAllData(): void {
  localStorage.removeItem(STORAGE_KEYS.CONSENT)
}
