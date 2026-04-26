import { watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import { useSettingsStore } from '@/features/cms/store/settings.store'

export type ConsentStatus = 'undecided' | 'accepted' | 'declined'

/**
 * Global Analytics Composable with Consent Mode v2 Support
 * Uses useHead for idiomatic Vue script management.
 */
export function useAnalytics(consentStatus: { value: ConsentStatus }) {
  const settingsStore = useSettingsStore()
  const router = useRouter()
  const measurementId = computed(() => settingsStore.settings.ga_measurement_id)

  useHead({
    script: computed(() => {
      if (!measurementId.value) return []

      return [
        {
          id: 'ga-consent-v2',
          innerHTML: `
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
            gtag('config', '${measurementId.value}', { 
              'anonymize_ip': true,
              'send_page_view': false 
            });
          `,
        },
        {
          async: true,
          src: `https://www.googletagmanager.com/gtag/js?id=${measurementId.value}`,
        },
      ]
    }),
  })

  // Watch for consent updates
  watch(
    () => consentStatus.value,
    (newStatus) => {
      if (newStatus === 'undecided' || !measurementId.value) return

      const isGranted = newStatus === 'accepted'
      
      const win = window as unknown as { gtag?: (...args: unknown[]) => void }
      
      if (typeof window !== 'undefined' && win.gtag) {
        win.gtag('consent', 'update', {
          'ad_storage': isGranted ? 'granted' : 'denied',
          'analytics_storage': isGranted ? 'granted' : 'denied',
          'ad_user_data': isGranted ? 'granted' : 'denied',
          'ad_personalization': isGranted ? 'granted' : 'denied'
        })
      }
    }
  )

  // Watch for route changes to trigger page_view
  watch(
    () => router.currentRoute.value.fullPath,
    (path) => {
      if (!measurementId.value) return
      
      const win = window as unknown as { gtag?: (...args: unknown[]) => void }
      if (typeof window !== 'undefined' && win.gtag) {
        win.gtag('event', 'page_view', {
          page_path: path,
          page_location: window.location.href,
          page_title: document.title,
          send_to: measurementId.value
        })
      }
    },
    { immediate: true }
  )
}

/**
 * Global Event Tracker Utility
 */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  const win = window as unknown as { gtag?: (...args: unknown[]) => void }
  if (typeof window !== 'undefined' && win.gtag) {
    win.gtag('event', name, params)
  } else {
    // Fallback to console in development if gtag is missing
    if (import.meta.env.DEV) {
      console.log(`[Analytics] Track Event: ${name}`, params)
    }
  }
}
