import { defineComponent } from 'vue'

/**
 * UI Component: Logo
 * Centralized branding/logo presentation.
 */
export const AppLogo = defineComponent({
  name: 'AppLogo',
  props: {
    /**
     * Inverts the logo colors for dark backgrounds.
     */
    inverted: {
      type: Boolean,
      default: false,
    },
    /**
     * Styles the logo size.
     */
    class: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return () => (
      <div
        class={[
          'bg-black rounded-md p-2 inline-flex items-center',
          props.inverted ? 'bg-transparent shadow-none border-none' : '',
          props.class,
        ]}
      >
        <img
          class={['h-6 hidden sm:block', props.inverted ? '' : 'invert']}
          src="/verityplus-noborder.png"
          alt="VERITY+ Logo"
        />
        <img
          class={[
            'h-6 aspect-square object-contain block sm:hidden',
            props.inverted ? '' : 'invert',
          ]}
          src="/verityplus-small-noborder.png"
          alt="VERITY+"
        />
      </div>
    )
  },
})
