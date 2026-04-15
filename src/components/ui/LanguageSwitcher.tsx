import { defineComponent, computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useClickOutside } from '@/composables/useClickOutside'
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from '@/i18n'
import type { Locale } from '@/i18n/types'

const LOCALE_FLAGS: Record<Locale, string> = {
  id: '/bahasa-indonesia.png',
  en: '/english.png',
  zh: '/chinese.png',
}

const LOCALE_LABELS: Record<Locale, string> = {
  id: 'Bahasa Indonesia',
  en: 'English',
  zh: '中文',
}

/**
 * Language Switcher Component
 * Custom dropdown with flag icons, chevron rotation, and hidden label when closed.
 */
export const LanguageSwitcher = defineComponent({
  name: 'LanguageSwitcher',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const isOpen = ref(false)
    const dropdownRef = ref<HTMLElement | null>(null)

    const currentLocale = computed<Locale>(() => {
      const locale = route.params.locale as string | undefined
      return locale && SUPPORTED_LOCALES.includes(locale as Locale)
        ? (locale as Locale)
        : DEFAULT_LOCALE
    })

    function toggleDropdown() {
      isOpen.value = !isOpen.value
    }

    function selectLocale(locale: Locale) {
      if (locale === currentLocale.value) {
        isOpen.value = false
        return
      }
      const currentPath = route.path
      const pathWithoutLocale = currentPath.replace(/^\/(id|en|zh)/, '')
      router.push(`/${locale}${pathWithoutLocale}`)
      isOpen.value = false
    }

    useClickOutside(dropdownRef, () => {
      isOpen.value = false
    })

    return () => (
      <div ref={dropdownRef} class="relative inline-block">
        <button
          onClick={toggleDropdown}
          class="flex items-center gap-2 bg-surface border border-border rounded-lg px-2.5 py-2 pr-4 hover:border-border-hover focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
          aria-label="Select language"
          aria-expanded={isOpen.value}
        >
          <img
            src={LOCALE_FLAGS[currentLocale.value]}
            alt={LOCALE_LABELS[currentLocale.value]}
            class="w-5 h-4 object-cover rounded-sm shadow-sm"
          />
          <i
            class={[
              'bi bi-chevron-down text-xs text-text-muted transition-transform duration-200',
              isOpen.value ? 'rotate-180' : '',
            ].join(' ')}
          ></i>
        </button>

        {isOpen.value && (
          <div class="absolute right-0 mt-1 w-52 bg-surface border border-border rounded-lg shadow-lg z-1000 overflow-hidden">
            {SUPPORTED_LOCALES.map((locale) => (
              <button
                key={locale}
                onClick={() => selectLocale(locale)}
                class={[
                  'flex items-center gap-3 w-full px-3 py-2.5 text-sm hover:bg-surface-hover transition-colors',
                  locale === currentLocale.value
                    ? 'bg-primary-50 text-primary'
                    : 'text-text-primary',
                ].join(' ')}
              >
                <img
                  src={LOCALE_FLAGS[locale]}
                  alt={LOCALE_LABELS[locale]}
                  class="w-5 h-4 object-cover rounded-sm shadow-sm"
                />
                <span class="font-medium">{LOCALE_LABELS[locale]}</span>
                {locale === currentLocale.value && (
                  <i class="bi bi-check2 ml-auto text-primary"></i>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  },
})
