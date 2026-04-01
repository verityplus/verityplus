import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import { AppLogo } from '../ui/Logo'
import { SearchInput } from '@/features/search/components/SearchInput'

/**
 * Layout Component: Header
 * Global navigation header with logo and search.
 */
export const AppHeader = defineComponent({
  name: 'AppHeader',
  setup() {
    return () => (
      <header class="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border">
        <div class="container-page">
          <div class="flex justify-between items-center h-16">
            <RouterLink to={{ name: 'home' }} class="flex items-center" aria-label="Ke beranda">
              <AppLogo />
            </RouterLink>
            <div class="flex gap-4 items-center">
              <SearchInput />
            </div>
          </div>
        </div>
      </header>
    )
  },
})
