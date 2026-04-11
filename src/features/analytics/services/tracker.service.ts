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
  return {
    totalVisits: 0,
    uniqueVisitors: 0,
    pageViews: 0,
    avgDuration: 0,
    topPages: [],
    topReferrers: [],
    dailyVisits: [],
  }
}

export function getArticleViews(): { id: string; views: number; title: string }[] {
  return []
}

export function clearAllData(): void {
  localStorage.removeItem(STORAGE_KEYS.CONSENT)
}
