import { useHead } from '@unhead/vue'
import { computed, type ComputedRef } from 'vue'

/**
 * Composable to manage AdSense script injection.
 */
export function useAdSenseHead(
  pubId: ComputedRef<string | undefined>,
  autoAdsEnabled: ComputedRef<boolean> = computed(() => false)
) {
  useHead({
    script: computed(() => {
      if (!pubId.value || pubId.value === 'ca-pub-XXXXXXXXXXXXXXXX') return []

      const src = autoAdsEnabled.value 
        ? `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pubId.value}`
        : 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'

      return [
        {
          id: 'adsense-script',
          async: true,
          src,
          crossorigin: 'anonymous',
        }
      ]
    }),
  })
}
