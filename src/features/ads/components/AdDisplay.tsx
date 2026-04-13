import { defineComponent, type PropType, onMounted, nextTick, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { AdSize } from '@/shared/types'
import { useSettingsStore } from '@/features/cms/store/settings.store'
import { loadAdSenseScript } from '../services/script.service'

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
    const settingsStore = useSettingsStore()

    const pubId = computed(() => settingsStore.settings.adsense_pub_id)
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
      if (pubId.value && pubId.value !== 'ca-pub-XXXXXXXXXXXXXXXX' && slotId.value) {
        loadAdSenseScript()
        await nextTick()
        try {
          const win = window as any
          if (win.adsbygoogle) {
            ;(win.adsbygoogle = win.adsbygoogle || []).push({})
            adLoaded.value = true
          }
        } catch (e) {

          console.error('AdSense error:', e)
        }
      }
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
        <div class={['overflow-hidden rounded-xl bg-transparent', props.class]}>
          <ins
            class="adsbygoogle"
            style={{ display: 'block', height: '100%' }}
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
