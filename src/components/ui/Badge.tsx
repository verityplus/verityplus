import { defineComponent } from 'vue'

/**
 * UI Component: Badge
 * Displays consistent styled status tags or categories.
 */
export const BaseBadge = defineComponent({
  name: 'BaseBadge',
  props: {
    /**
     * Tailwind background color class.
     */
    bgColor: {
      type: String,
      default: 'bg-primary-100',
    },
    /**
     * Tailwind text color class.
     */
    textColor: {
      type: String,
      default: 'text-primary-700',
    },
    /**
     * Allows additional custom classes.
     */
    class: {
      type: String,
      default: '',
    },
  },
  setup(props, { slots }) {
    return () => (
      <span
        class={['badge backdrop-blur-sm shadow-sm', props.bgColor, props.textColor, props.class]}
      >
        {slots.default?.()}
      </span>
    )
  },
})
