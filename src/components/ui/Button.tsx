import { defineComponent, type PropType } from 'vue'

/**
 * UI Component: Button
 * Unified button styles across the application.
 */
export const BaseButton = defineComponent({
  name: 'BaseButton',
  props: {
    /**
     * Styles the button according to defined variants.
     */
    variant: {
      type: String as PropType<'primary' | 'outline' | 'ghost'>,
      default: 'primary',
    },
    /**
     * Sets the width to match the parent container.
     */
    fullWidth: {
      type: Boolean,
      default: false,
    },
    /**
     * Shows a loading state as a spinner.
     */
    loading: {
      type: Boolean,
      default: false,
    },
    /**
     * Provides a target for routing links.
     */
    to: {
      type: [String, Object] as PropType<string | object>,
      default: undefined,
    },
    /**
     * Standard button type attribute.
     */
    type: {
      type: String as PropType<'button' | 'submit' | 'reset'>,
      default: 'button',
    },
    /**
     * Standard button click event.
     */
    onClick: {
      type: Function as PropType<(payload: MouseEvent) => void>,
      default: undefined,
    },
    /**
     * Allows custom tailwind classes.
     */
    class: {
      type: String,
      default: '',
    },
  },
  setup(props, { slots, attrs }) {
    const baseClass =
      'inline-flex items-center justify-center font-bold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm'

    const variantClasses = {
      primary: 'bg-primary text-text-inverse hover:bg-primary-600 rounded-lg px-6 py-2.5',
      outline:
        'bg-transparent text-primary border-2 border-primary hover:bg-primary-50 rounded-lg px-6 py-2.5',
      ghost: 'bg-transparent text-text-secondary hover:bg-surface-muted rounded-md px-4 py-2',
    }

    const classes = [
      baseClass,
      variantClasses[props.variant],
      props.fullWidth ? 'w-full' : 'w-fit',
      props.class,
    ]

    return () => {
      if (props.to) {
        return (
          <router-link to={props.to} class={classes}>
            {props.loading ? <i class="bi bi-arrow-repeat animate-spin mr-2"></i> : null}
            {slots.default?.()}
          </router-link>
        )
      }

      return (
        <button class={classes} type={props.type} disabled={props.loading} {...attrs}>
          {props.loading ? <i class="bi bi-arrow-repeat animate-spin mr-3"></i> : null}
          {slots.default?.()}
        </button>
      )
    }
  },
})
