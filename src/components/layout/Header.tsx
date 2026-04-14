import { defineComponent, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { AppLogo } from '../ui/Logo'
import { LanguageSwitcher } from '../ui/LanguageSwitcher'
import { BrowseTopBar } from '../ui/BrowseTopBar'
import router from '@/router'
import { DEFAULT_LOCALE } from '@/i18n'

/**
 * Layout Component: Header
 * Global navigation header with logo and search.
 */
export const AppHeader = defineComponent({
  name: 'AppHeader',
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const locale = computed(() => route.params.locale || DEFAULT_LOCALE)
    const shouldShowTopBar = computed(() => {
      return route.name !== 'home'
    })

    return () => (
      <header class="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border">
        <div class="container-page">
          <div class="flex justify-between items-center h-16">
            <RouterLink to={{ name: 'home' }} class="flex items-center" aria-label={t('nav.home')}>
              <AppLogo />
            </RouterLink>
            <div class="flex gap-4 items-center">
              <div class="relative inline-block">
                <button
                  onClick={() => {
                    router.push(`/${locale.value}/search`)
                  }}
                  class="flex items-center gap-2 bg-surface border border-border rounded-full hover:border-border-hover focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
                  aria-label={t('common.search')}
                >
                  <i class="bi bi-search flex items-center justify-center w-10 aspect-square text-text-muted"></i>
                </button>
              </div>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
        {shouldShowTopBar.value && <BrowseTopBar />}
      </header>
    )
  },
})
