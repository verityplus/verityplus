import { watch, ref } from 'vue'
import { useSettingsStore } from '@/features/cms/store/settings.store'

export type ConsentStatus = 'undecided' | 'accepted' | 'declined'

/**
 * Global Analytics Composable with Consent Mode v2 Support
 * Manually injects scripts to avoid dependency on head management library.
 */
export function useAnalytics(consentStatus: { value: ConsentStatus }) {
  const settingsStore = useSettingsStore()
  const scriptInjected = ref(false)

  const injectGtag = (measurementId: string) => {
    if (scriptInjected.value || typeof document === 'undefined') return

    // 1. Consent Default
    const consentScript = document.createElement('script')
    consentScript.id = 'ga-consent-v2'
    consentScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('consent', 'default', {
        'ad_storage': 'denied',
        'analytics_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'wait_for_update': 500
      });
      gtag('js', new Date());
      gtag('config', '${measurementId}', { 'anonymize_ip': true });
    `
    document.head.appendChild(consentScript)

    // 2. Main Tracking Script
    const mainScript = document.createElement('script')
    mainScript.async = true
    mainScript.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    document.head.appendChild(mainScript)

    scriptInjected.value = true
  }

  // Watch for ID availability
  watch(
    () => settingsStore.settings.ga_measurement_id,
    (id) => {
      if (id) injectGtag(id)
    },
    { immediate: true }
  )

  // Watch for consent updates
  watch(
    () => consentStatus.value,
    (newStatus) => {
      if (newStatus === 'undecided' || !scriptInjected.value) return

      const isGranted = newStatus === 'accepted'
      
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('consent', 'update', {
          'ad_storage': isGranted ? 'granted' : 'denied',
          'analytics_storage': isGranted ? 'granted' : 'denied',
          'ad_user_data': isGranted ? 'granted' : 'denied',
          'ad_personalization': isGranted ? 'granted' : 'denied'
        })
      }
    }
  )
}
