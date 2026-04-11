import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  getConsentStatus,
  setConsentStatus,
  getSessionId,
  trackPageView,
  getAnalyticsSummary,
  getArticleViews,
  clearAllData,
  loadGoogleAnalytics,
} from '../services/tracker.service'
import { AnalyticsService } from '../services/analytics.service'
import type { AnalyticsSummary, ConsentStatus } from '../types'

export const useAnalyticsStore = defineStore('analytics', () => {
  const consent = ref<ConsentStatus>(getConsentStatus())
  const sessionId = ref<string>('')
  const summary = ref<AnalyticsSummary | null>(null)

  const isTracking = computed(() => consent.value === 'accepted')
  const isPending = computed(() => consent.value === 'pending')

  function init() {
    consent.value = getConsentStatus()
    if (consent.value === 'accepted') {
      sessionId.value = getSessionId()
      loadGoogleAnalytics()
    }
  }

  function acceptConsent() {
    setConsentStatus('accepted')
    consent.value = 'accepted'
    sessionId.value = getSessionId()
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
    trackPageView(path, title)
  }

  async function refreshSummary() {
    const data = await AnalyticsService.getSummary()
    if (data) summary.value = data
  }

  function fetchArticleViews() {
    return getArticleViews()
  }

  function resetData() {
    clearAllData()
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
    refreshSummary,
    fetchArticleViews,
    resetData,
  }
})
