import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAnalyticsStore } from '../store/analytics.store'

export default defineComponent({
  name: 'CookieConsentBanner',
  setup() {
    const { t } = useI18n()
    const analyticsStore = useAnalyticsStore()

    const handleAccept = () => {
      analyticsStore.acceptConsent()
    }

    const handleDecline = () => {
      analyticsStore.declineConsent()
    }

    return () => {
      if (!analyticsStore.isPending) return null

      return (
        <div class="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up">
          <div class="max-w-4xl mx-auto bg-slate-900 text-white rounded-2xl shadow-2xl p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 border border-slate-700">
            <div class="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <i class="bi bi-shield-check text-primary text-xl" />
            </div>

            <p class="flex-1 text-sm text-slate-300 leading-relaxed">
              {t('cookieConsent.message')}{' '}
              <router-link
                to="/privacy-policy"
                class="text-primary underline hover:text-primary/80 font-medium"
              >
                {t('cookieConsent.learnMore')}
              </router-link>
            </p>

            <div class="flex items-center gap-3 shrink-0">
              <button
                onClick={handleDecline}
                class="px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-slate-400 border border-slate-600 rounded-xl hover:bg-slate-800 hover:text-slate-200 transition cursor-pointer"
              >
                {t('cookieConsent.decline')}
              </button>
              <button
                onClick={handleAccept}
                class="px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white bg-primary rounded-xl hover:bg-primary/90 transition shadow-lg cursor-pointer"
              >
                {t('cookieConsent.accept')}
              </button>
            </div>
          </div>
        </div>
      )
    }
  },
})
