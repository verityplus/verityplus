import { defineComponent, type VNode, ref, onMounted, Transition } from 'vue'
import { RouterView } from 'vue-router'
import { AppHeader } from '@/components/layout/Header'
import { AppFooter } from '@/components/layout/Footer'
import { CookieConsent } from '@/components/shared/CookieConsent'
import { useAnalytics, type ConsentStatus } from '@/composables/useAnalytics'
import { useAdSenseHead } from '@/features/ads/composables/useAdSenseHead'
import { useSettingsStore } from '@/features/cms/store/settings.store'
import { computed } from 'vue'

/**
 * Locale Layout Component
 * Wraps all public-facing locale-prefixed routes with Header and Footer.
 * Also handles Global Analytics and Cookie Consent.
 */
export default defineComponent({
  name: 'LocaleLayout',
  setup() {
    const settingsStore = useSettingsStore()
    const consentStatus = ref<ConsentStatus>('undecided')

    onMounted(async () => {
      // Load settings for analytics
      if (Object.keys(settingsStore.settings).length === 0) {
        await settingsStore.fetchPublicSettings()
      }

      // Check existing consent
      const consent = localStorage.getItem('verityplus_cookie_consent') as ConsentStatus | null
      if (consent) {
        consentStatus.value = consent
      }
    })

    // Initialize Analytics (Consent Mode v2)
    useAnalytics(consentStatus)

    // Initialize AdSense
    const pubId = computed(() => settingsStore.settings.adsense_pub_id)
    const autoAdsEnabled = computed(() => settingsStore.settings.adsense_auto_ads_enabled === 'true')
    useAdSenseHead(pubId, autoAdsEnabled)

    return () => (
      <div
        id="app-portal"
        class="min-h-screen flex flex-col font-sans text-text-primary selection:bg-primary/20 bg-background antialiased"
      >
        <AppHeader />

        <div class="grow">
          <RouterView
            v-slots={{
              default: ({ Component }: { Component: VNode }) => (
                <Transition name="fade" mode="out-in">
                  {Component ? Component : null}
                </Transition>
              ),
            }}
          />
        </div>

        <AppFooter />
        <CookieConsent
          onAccept={() => (consentStatus.value = 'accepted')}
          onDecline={() => (consentStatus.value = 'declined')}
        />
      </div>
    )
  },
})
