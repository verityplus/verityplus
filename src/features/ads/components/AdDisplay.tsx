import { defineComponent, type PropType, onMounted, nextTick, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { AdSize } from '@/shared/types'

/**
 * Feature Component: AdDisplay
 * Integration with Google AdSense.
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
     * Label for the ad placement (shown if ad fails to load or in dev).
     */
    label: {
      type: String,
      default: '',
    },
    /**
     * Google AdSense Slot ID.
     */
    slot: {
      type: String,
      default: '',
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
    const { t } = useI18n()
    const adLoaded = ref(false)
    const pubId = import.meta.env.VITE_ADSENSE_PUB_ID

    const sizeClasses: Record<AdSize, string> = {
      leaderboard: 'h-24',
      banner: 'h-32',
      sidebar: 'h-64',
      inline: 'h-40',
    }

    const adFormat: Record<AdSize, string> = {
      leaderboard: 'horizontal',
      banner: 'horizontal',
      sidebar: 'vertical',
      inline: 'auto',
    }

    onMounted(async () => {
      if (pubId && props.slot) {
        await nextTick()
        try {
          // @ts-ignore
          ;(window.adsbygoogle = window.adsbygoogle || []).push({})
          adLoaded.value = true
        } catch (e) {
          console.error('AdSense error:', e)
        }
      }
    })

    return () => {
      const isDev = import.meta.env.DEV || !pubId || !props.slot

      if (isDev && !adLoaded.value) {
        return (
          <div
            class={[
              'w-full flex items-center justify-center text-text-muted font-bold tracking-widest uppercase text-xs border-2 border-dashed border-border rounded-xl bg-surface-muted/50',
              sizeClasses[props.size],
              props.class,
            ]}
          >
            <div class="flex flex-col items-center gap-1 opacity-50 text-center px-4">
              <i class="bi bi-megaphone text-lg"></i>
              <span>{props.label || t('ads.defaultLabel')}</span>
              {isDev && (
                <span class="text-[10px] lowercase font-normal opacity-70">
                  {pubId ? (props.slot ? 'AdSense Active' : 'Missing Slot ID') : 'Pub ID Not Configured'}
                </span>
              )}
            </div>
          </div>
        )
      }

      return (
        <div class={['overflow-hidden rounded-xl bg-surface-muted/10', props.class]}>
          <ins
            class="adsbygoogle"
            style={{ display: 'block', height: '100%' }}
            data-ad-client={pubId}
            data-ad-slot={props.slot}
            data-ad-format={adFormat[props.size]}
            data-full-width-responsive="true"
          ></ins>
        </div>
      )
    }
  },
})
