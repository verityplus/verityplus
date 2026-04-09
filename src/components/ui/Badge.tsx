import { defineComponent } from 'vue'

/**
 * UI Component: Badge
 * Displays consistent styled status tags or categories.
 */
export const BaseBadge = defineComponent({
  name: 'BaseBadge',
  props: {
    bgColor: {
      type: String,
      default: 'bg-primary-100',
    },
    textColor: {
      type: String,
      default: 'text-primary-700',
    },
    borderColor: {
      type: String,
      default: 'border-transparent',
    },
    class: {
      type: String,
      default: '',
    },
  },
  setup(props, { slots }) {
    return () => (
      <span
        class={[
          'badge border shadow-sm font-bold',
          props.bgColor,
          props.textColor,
          props.borderColor,
          props.class,
        ]}
      >
        {slots.default?.()}
      </span>
    )
  },
})
