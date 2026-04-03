import { defineComponent, type PropType } from 'vue'
import type { AdSize } from '@/shared/types'

/**
 * Feature Component: AdDisplay
 * Mock advertisement placement component.
 */
export const AdDisplay = defineComponent({
  name: 'AdDisplay',
  props: {
    /**
     * Preset ad display dimension.
     */
    size: {
      type: String as PropType<AdSize>,
      default: 'banner',
    },
    /**
     * Label for the mock ad placement.
     */
    label: {
      type: String,
      default: 'Ruang Iklan',
    },
    /**
     * Optional custom classes.
     */
    class: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const sizeClasses: Record<AdSize, string> = {
      leaderboard: 'h-24',
      banner: 'h-32',
      sidebar: 'h-64',
      inline: 'h-40',
    }

    return () => (
      <div
        class={[
          'w-full flex items-center justify-center text-text-muted font-bold tracking-widest uppercase text-xs border-2 border-dashed border-border rounded-xl bg-surface-muted/50',
          sizeClasses[props.size],
          props.class,
        ]}
      >
        <div class="flex flex-col items-center gap-1 opacity-50">
          <i class="bi bi-megaphone text-lg"></i>
          <span>{props.label}</span>
        </div>
      </div>
    )
  },
})
