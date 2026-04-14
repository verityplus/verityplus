import { defineComponent, type PropType } from 'vue'
import { useHead } from '@/composables/useHead'

/**
 * Component: StructuredData
 * Injects JSON-LD structured data into the <head> for SEO.
 */
export const StructuredData = defineComponent({
  name: 'StructuredData',
  props: {
    data: {
      type: Object as PropType<Record<string, unknown>>,
      required: true,
    },
  },
  setup(props) {
    useHead({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(props.data),
        },
      ],
    })

    return () => null
  },
})
