import { useHead } from '@unhead/vue'
import { computed, type ComputedRef } from 'vue'

/**
 * Composable to manage AdSense script injection.
 */
export function useAdSenseHead(pubId: ComputedRef<string | undefined>) {
  useHead({
    script: computed(() => {
      if (!pubId.value || pubId.value === 'ca-pub-XXXXXXXXXXXXXXXX') return []

      return [
        {
          id: 'adsense-script',
          async: true,
          src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
          crossorigin: 'anonymous',
          // Note: Adding the pubId to the src is often recommended for early initialization:
          // src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pubId.value}`
          // But the current implementation prefers manual <ins> slots.
        },
      ]
    }),
  })
}
