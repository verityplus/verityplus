import { watch, ref, computed } from 'vue'
import { useHead } from '@unhead/vue'
import { useSettingsStore } from '@/features/cms/store/settings.store'

export type ConsentStatus = 'undecided' | 'accepted' | 'declined'

/**
 * Global Analytics Composable with Consent Mode v2 Support
 * Uses useHead for idiomatic Vue script management.
 */
export function useAnalytics(consentStatus: { value: ConsentStatus }) {
  const settingsStore = useSettingsStore()
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
            gtag('config', '${measurementId.value}', { 'anonymize_ip': true });
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
}
