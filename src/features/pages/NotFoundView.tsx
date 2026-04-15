import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@/composables/useHead'
import { useLocaleRoute } from '@/composables/useLocaleRoute'

/**
 * Page View: NotFoundView
 * Shown when a route is not found.
 * Premium design with vibrant aesthetics and clear call to action.
 */
export default defineComponent({
  name: 'NotFoundView',
  setup() {
    const { t } = useI18n()
    const { push } = useLocaleRoute()

    useHead({
      title: t('notFound.title') + ' — VERITY+',
      meta: [
        {
          name: 'description',
          content: t('notFound.message'),
        },
        {
          name: 'robots',
          content: 'noindex, follow',
        },
      ],
    })

    return () => (
      <main class="min-h-[60vh] flex items-center justify-center p-6 relative overflow-hidden bg-background">
        {/* Modern Background Elements */}
        <div class="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div class="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div class="max-w-xl w-full text-center relative z-10">
          {/* Main 404 Header */}
          <div class="relative inline-block mb-8">
            <h1 class="text-[12rem] md:text-[15rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-linear-to-br from-primary via-accent to-primary animate-gradient select-none opacity-20">
              404
            </h1>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-4xl md:text-5xl font-bold text-text-primary drop-shadow-sm">
                {t('notFound.title')}
              </span>
            </div>
          </div>

          <p class="text-lg md:text-xl text-text-muted mb-10 max-w-md mx-auto leading-relaxed">
            {t('notFound.message')}
          </p>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => push('/')}
              class="group relative px-8 py-4 bg-primary text-text-inverse rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden text-nowrap"
            >
              <div class="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-shimmer"></div>
              <span class="relative flex items-center gap-2">
                <i class="bi bi-house-door-fill"></i>
                {t('notFound.backHome')}
              </span>
            </button>

            <button
              onClick={() => window.history.back()}
              class="px-8 py-4 bg-surface border border-border text-text-primary rounded-2xl font-bold text-lg hover:bg-surface-hover hover:border-primary/30 transition-all duration-300 cursor-pointer flex items-center gap-2"
            >
              <i class="bi bi-arrow-left"></i>
              {t('common.previous')}
            </button>
          </div>

          {/* Decorative icons */}
          <div class="mt-16 flex justify-center gap-8 text-text-muted/30">
            <i class="bi bi-search text-2xl animate-bounce" style="animation-delay: 0.1s"></i>
            <i class="bi bi-question-circle text-2xl animate-bounce" style="animation-delay: 0.2s"></i>
            <i class="bi bi-exclamation-triangle text-2xl animate-bounce" style="animation-delay: 0.3s"></i>
          </div>
        </div>
      </main>
    )
  },
})
