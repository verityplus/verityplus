import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  getConsentStatus,
  setConsentStatus,
  getSessionId,
  trackPageView,
  loadGoogleAnalytics,
  loadGoogleAdSense,
  updateEngagementTime
} from '../services/tracker.service'
import { AnalyticsService } from '../services/analytics.service'
import { useSettingsStore } from '@/features/cms/store/settings.store'
import type { AnalyticsSummary, ConsentStatus } from '../types'

export const useAnalyticsStore = defineStore('analytics', () => {
  const consent = ref<ConsentStatus>(getConsentStatus())
  const sessionId = ref<string>('')
  const summary = ref<AnalyticsSummary | null>(null)
  const settingsStore = useSettingsStore()

  const isTracking = computed(() => consent.value === 'accepted')
  const isPending = computed(() => consent.value === 'pending')

  function init() {
    consent.value = getConsentStatus()
    if (consent.value === 'accepted') {
      sessionId.value = getSessionId()
      const gaId = settingsStore.settings.google_analytics_id
      const adsenseId = settingsStore.settings.adsense_pub_id
      if (gaId) {
        loadGoogleAnalytics(gaId)
      }
      if (adsenseId) {
        loadGoogleAdSense(adsenseId)
      }
    }
  }

  function acceptConsent() {
    setConsentStatus('accepted')
    consent.value = 'accepted'
    sessionId.value = getSessionId()
    const gaId = settingsStore.settings.google_analytics_id
    const adsenseId = settingsStore.settings.adsense_pub_id
    if (gaId) {
      loadGoogleAnalytics(gaId)
    }
    if (adsenseId) {
      loadGoogleAdSense(adsenseId)
    }
  }

  function declineConsent() {
    setConsentStatus('declined')
    consent.value = 'declined'
  }

  function resetConsent() {
    consent.value = 'pending'
  }

  function track(path: string, title: string) {
    if (consent.value !== 'accepted') return
    const gaId = settingsStore.settings.google_analytics_id
    if (gaId) {
      trackPageView(gaId, path, title)
    }
  }

  function trackEngagement(durationMs: number) {
    if (consent.value !== 'accepted') return
    updateEngagementTime(durationMs)
  }


  async function refreshSummary(pagePath?: string) {
    // AnalyticsService.getSummary should be updated to accept pagePath
    const result = await AnalyticsService.getSummary(pagePath)
    if (result) summary.value = result
  }

  function resetData() {
    summary.value = null
  }

  return {
    consent,
    sessionId,
    summary,
    isTracking,
    isPending,
    init,
    acceptConsent,
    declineConsent,
    resetConsent,
    track,
    trackEngagement,
    refreshSummary,
    resetData,
  }
})
