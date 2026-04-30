import { defineComponent, type PropType, onMounted, onUnmounted, nextTick, ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { AdSize } from '@/shared/types'
import { useSettingsStore } from '@/features/cms/store/settings.store'

/**
 * Feature Component: AdDisplay
 * Integration with Google AdSense.
 */
export const AdDisplay = defineComponent({
  name: 'AdDisplay',
  props: {
    size: {
      type: String as PropType<AdSize>,
      default: 'banner',
    },
    label: {
      type: String,
      default: '',
    },
    slot: {
      type: String,
      default: '',
    },
    class: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const { t } = useI18n()
    const adLoaded = ref(false)
    const adContainer = ref<HTMLElement | null>(null)
    let resizeObserver: ResizeObserver | null = null
    const settingsStore = useSettingsStore()

    const pubId = computed(() => settingsStore.settings.adsense_pub_id)
    
    // Note: AdSense script is now managed centrally in LocaleLayout.tsx

    const slotId = computed(() => {
      if (props.slot) return props.slot
      
      const s = settingsStore.settings
      switch (props.size) {
        case 'leaderboard': return s.ads_slot_leaderboard || ''
        case 'banner': return s.ads_slot_banner || ''
        case 'sidebar': return s.ads_slot_sidebar || ''
        case 'inline': return s.ads_slot_inline || ''
        default: return s.ads_slot_inline || ''
      }
    })

    const sizeClasses: Record<AdSize, string> = {
      leaderboard: 'min-h-[96px]',
      banner: 'min-h-[128px]',
      sidebar: 'min-h-[256px]',
      inline: 'min-h-[160px]',
    }

    const adFormat: Record<AdSize, string> = {
      leaderboard: 'horizontal',
      banner: 'horizontal',
      sidebar: 'vertical',
      inline: 'auto',
    }

    const initAd = async () => {
      if (adLoaded.value) return
      if (pubId.value && pubId.value !== 'ca-pub-XXXXXXXXXXXXXXXX' && slotId.value) {
        await nextTick()

        const pushAd = () => {
          try {
            const adsbygoogle = (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle
            if (adsbygoogle) {
              adsbygoogle.push({})
              adLoaded.value = true
            }
          } catch (e: any) {
            // Suppress the error if it's about slot size, as it just means the container is too small
            if (e && e.message && e.message.includes('No slot size for availableWidth')) {
              console.warn(`AdSense: Waiting for container to be wider. (${e.message})`)
            } else {
              console.error('AdSense error:', e)
            }
          }
        }

        if (adContainer.value) {
          const checkAndPush = () => {
            if (adLoaded.value || !adContainer.value) return
            const width = adContainer.value.clientWidth
            // AdSense minimum width for responsive is typically ~200px, but vertical can be narrower
            const minWidth = adFormat[props.size] === 'vertical' ? 120 : 200
            
            if (width >= minWidth) {
              pushAd()
              if (resizeObserver) {
                resizeObserver.disconnect()
                resizeObserver = null
              }
            }
          }

          checkAndPush()

          if (!adLoaded.value && !resizeObserver) {
            resizeObserver = new ResizeObserver(() => {
              checkAndPush()
            })
            resizeObserver.observe(adContainer.value)
          }
        } else {
          pushAd()
        }
      }
    }

    onMounted(() => {
      initAd()
    })

    onUnmounted(() => {
      if (resizeObserver) {
        resizeObserver.disconnect()
        resizeObserver = null
      }
    })

    watch([pubId, slotId], () => {
      initAd()
    })

    return () => {
      // In development or if IDs are missing, show a placeholder
      const isMissingConfig = !pubId.value || pubId.value === 'ca-pub-XXXXXXXXXXXXXXXX' || !slotId.value

      if (isMissingConfig && !adLoaded.value) {
        return (
          <div
            class={[
              'w-full flex items-center justify-center text-slate-400 font-bold tracking-widest uppercase text-[10px] border border-dashed border-slate-200 rounded-xl bg-slate-50',
              sizeClasses[props.size],
              props.class,
            ]}
          >
            <div class="flex flex-col items-center gap-1 text-center px-4">
              <i class="bi bi-megaphone text-lg opacity-30"></i>
              <span>{props.label || t('ads.defaultLabel')}</span>
              <span class="text-[8px] lowercase font-normal opacity-50">
                {pubId.value ? (slotId.value ? 'AdSense Active' : 'Missing Slot ID') : 'Pub ID Not Configured'}
              </span>
            </div>
          </div>
        )
      }

      return (
        <div ref={adContainer} class={['w-full overflow-hidden rounded-xl bg-transparent flex justify-center', sizeClasses[props.size], props.class]}>
          <ins
            key={slotId.value}
            class="adsbygoogle"
            style={{ display: 'block', width: '100%' }}
            data-ad-client={pubId.value}
            data-ad-slot={slotId.value}
            data-ad-format={adFormat[props.size]}
            data-full-width-responsive="true"
          ></ins>
        </div>
      )
    }
  },
})
