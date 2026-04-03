import { defineComponent, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from '@/i18n'
import type { Locale } from '@/i18n/types'

const LOCALE_LABELS: Record<Locale, string> = {
  id: 'ID',
  en: 'EN',
  zh: '中文',
}

/**
 * Language Switcher Component
 * Allows users to switch between supported locales while preserving the current route path.
 */
export const LanguageSwitcher = defineComponent({
  name: 'LanguageSwitcher',
  setup() {
    const route = useRoute()
    const router = useRouter()

    const currentLocale = computed(() => {
      const locale = route.params.locale as string | undefined
      return locale && SUPPORTED_LOCALES.includes(locale as Locale) ? locale : DEFAULT_LOCALE
    })

    function switchLocale(newLocale: Locale) {
      if (newLocale === currentLocale.value) return
      const currentPath = route.path
      const pathWithoutLocale = currentPath.replace(/^\/(id|en|zh)/, '')
      router.push(`/${newLocale}${pathWithoutLocale}`)
    }

    return () => (
      <div class="flex items-center gap-1">
        {SUPPORTED_LOCALES.map((locale) => (
          <button
            key={locale}
            onClick={() => switchLocale(locale)}
            class={[
              'px-2 py-1 text-xs font-semibold rounded transition-colors',
              locale === currentLocale.value
                ? 'bg-primary text-white'
                : 'text-text-muted hover:text-text-primary hover:bg-surface',
            ]}
            aria-label={`Switch to ${LOCALE_LABELS[locale]}`}
          >
            {LOCALE_LABELS[locale]}
          </button>
        ))}
      </div>
    )
  },
})
