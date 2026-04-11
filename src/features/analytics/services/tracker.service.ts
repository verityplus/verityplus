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

export function loadGoogleAnalytics(id: string) {
  if (getConsentStatus() !== 'accepted') return
  if (!id || window.dataLayer) return

  const scriptTag = document.createElement('script')
  scriptTag.id = 'ga-script'
  scriptTag.async = true
  scriptTag.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  document.head.appendChild(scriptTag)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: [string, ...unknown[]]) {
    window.dataLayer.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', id, {
    send_page_view: false // We handle page views manually
  })
}

export function trackPageView(id: string, path: string, title: string): void {
  if (getConsentStatus() !== 'accepted' || !window.gtag) return
  window.gtag('config', id, { 
    page_path: path, 
    page_title: title,
    engagement_time_msec: 0 // Reset engagement time on new page
  })
}

export function trackEvent(name: string, params: Record<string, any> = {}): void {
  if (getConsentStatus() !== 'accepted' || !window.gtag) return
  window.gtag('event', name, params)
}

export function updateEngagementTime(durationMs: number): void {
  if (getConsentStatus() !== 'accepted' || !window.gtag) return
  window.gtag('event', 'user_engagement', {
    engagement_time_msec: durationMs
  })
}

export function getSessionId(): string {
  // Simple session ID for internal tracking if needed
  let sessionId = sessionStorage.getItem('v_session_id')
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2, 11)
    sessionStorage.setItem('v_session_id', sessionId)
  }
  return sessionId
}
