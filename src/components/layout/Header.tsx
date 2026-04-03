import { defineComponent, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { AppLogo } from '../ui/Logo'
import { SearchInput } from '@/features/search/components/SearchInput'
import { LanguageSwitcher } from '../ui/LanguageSwitcher'
import { BrowseTopBar } from '../ui/BrowseTopBar'

/**
 * Layout Component: Header
 * Global navigation header with logo and search.
 */
export const AppHeader = defineComponent({
  name: 'AppHeader',
  setup() {
    const { t } = useI18n()
    const route = useRoute()
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
              <SearchInput />
              <LanguageSwitcher />
            </div>
          </div>
        </div>
        {shouldShowTopBar.value && <BrowseTopBar />}
      </header>
    )
  },
})
