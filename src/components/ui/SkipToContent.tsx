import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

/**
 * Component: SkipToContent
 * Accessibility feature to skip navigation and jump to main content.
 */
export const SkipToContent = defineComponent({
  name: 'SkipToContent',
  setup() {
    const { t } = useI18n()
    return () => (
      <a
        href="#main-content"
        class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-primary focus:text-white focus:rounded-xl focus:shadow-2xl focus:font-bold focus:no-underline transition-all"
      >
        {t('common.skipToContent')}
      </a>
    )
  },
})
