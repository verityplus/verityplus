import { defineComponent, ref, watch } from 'vue'
import { resolveAssetUrl } from '@/shared/utils/assets'

/**
 * UI Component: BaseImage
 * A robust image component that handles loading states and fallbacks.
 */
export const BaseImage = defineComponent({
  name: 'BaseImage',
  props: {
    src: { type: String, default: '' },
    alt: { type: String, default: '' },
    class: { type: [String, Object, Array], default: '' },
    placeholder: { type: String, default: '/universal-placeholder.png' },
    isProfile: { type: Boolean, default: false },
  },
  setup(props) {
    const error = ref(false)
    const actualPlaceholder = props.isProfile ? '/profile-placeholder.png' : props.placeholder


    watch(() => props.src, () => {
      error.value = false
    })

    const handleError = () => {
      error.value = true
    }

    return () => (
      <img
        src={error.value || !props.src ? actualPlaceholder : resolveAssetUrl(props.src)}
        alt={props.alt}
        class={props.class}
        onError={handleError}
      />
    )
  },
})
