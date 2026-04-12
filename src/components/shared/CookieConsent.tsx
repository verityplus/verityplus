import { defineComponent, ref, onMounted, Transition } from 'vue'
import { useI18n } from 'vue-i18n'

const COOKIE_CONSENT_KEY = 'verityplus_cookie_consent'

export const CookieConsent = defineComponent({
  name: 'CookieConsent',
  emits: ['accept', 'decline'],
  setup(_, { emit }) {
    const { t } = useI18n()
    const isVisible = ref(false)

    onMounted(() => {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
      if (consent === null) {
        // Show after a short delay for better UX
        setTimeout(() => {
          isVisible.value = true
        }, 1500)
      }
    })

    const handleAccept = () => {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted')
      isVisible.value = false
      emit('accept')
    }

    const handleDecline = () => {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'declined')
      isVisible.value = false
      emit('decline')
    }

    return () => (
      <Transition
        enter-active-class="transition duration-500 ease-out"
        enter-from-class="translate-y-full opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-300 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-full opacity-0"
      >
        {isVisible.value && (
          <div class="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 pointer-events-none">
            <div class="max-w-7xl mx-auto flex justify-center md:justify-end">
              <div class="w-full md:max-w-xl bg-white/80 backdrop-blur-2xl border border-slate-200/50 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-3xl p-6 md:p-8 pointer-events-auto flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div class="space-y-3">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-xl">
                      <i class="bi bi-shield-check"></i>
                    </div>
                    <h5 class="font-black text-slate-900 text-lg uppercase tracking-tight">
                      Cookie Insights
                    </h5>
                  </div>
                  <p class="text-slate-600 text-sm leading-relaxed font-medium">
                    {t('cookieConsent.message')}
                  </p>
                </div>

                <div class="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAccept}
                    class="flex-1 px-6 py-4 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                  >
                    {t('cookieConsent.accept')}
                  </button>
                  <button
                    onClick={handleDecline}
                    class="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-widest rounded-2xl transition-all duration-300"
                  >
                    {t('cookieConsent.decline')}
                  </button>
                </div>
                
                <a 
                  href="/privacy-policy" 
                  class="text-[10px] text-slate-400 hover:text-primary transition-colors uppercase font-black tracking-widest text-center md:text-left"
                >
                  {t('cookieConsent.learnMore')} — Updated April 2026
                </a>
              </div>
            </div>
          </div>
        )}
      </Transition>
    )
  },
})
