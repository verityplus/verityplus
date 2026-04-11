import { defineComponent, ref, onMounted } from 'vue'
import { useHead } from '@/composables/useHead'
import { useSettingsStore } from '@/features/cms/store/settings.store'
import { BaseButton } from '@/components/ui/Button'

export default defineComponent({
  name: 'SettingsView',
  setup() {
    const settingsStore = useSettingsStore()
    const isSaving = ref(false)
    const successMessage = ref('')

    useHead({
      title: 'Site Settings — CMS VERITY+',
    })

    const form = ref({
      google_analytics_id: '',
      ga_property_id: '',
      adsense_pub_id: '',
      adsense_account_id: '',
    })

    onMounted(async () => {
      await settingsStore.fetchSettings()
      form.value = {
        google_analytics_id: settingsStore.settings.google_analytics_id || '',
        ga_property_id: settingsStore.settings.ga_property_id || '',
        adsense_pub_id: settingsStore.settings.adsense_pub_id || '',
        adsense_account_id: settingsStore.settings.adsense_account_id || '',
      }
    })

    const handleSave = async () => {
      isSaving.value = true
      successMessage.value = ''
      try {
        await settingsStore.updateSettings(form.value)
        successMessage.value = 'Settings updated successfully!'
        setTimeout(() => {
          successMessage.value = ''
        }, 3000)
      } catch (err) {
        console.error(err)
      } finally {
        isSaving.value = false
      }
    }

    return () => (
      <div class="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div>
          <h1 class="text-3xl font-black text-slate-900">Site Settings</h1>
          <p class="text-slate-500 mt-1">Configure third-party integrations and global site parameters</p>
        </div>

        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <header class="p-6 border-b border-slate-100 bg-slate-50/50">
            <h3 class="font-black text-slate-800 flex items-center gap-2">
              <i class="bi bi-google text-primary text-xl"></i>
              Google Integrations
            </h3>
          </header>
          
          <div class="p-8 space-y-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-2">
                <label class="block text-xs font-black uppercase tracking-widest text-slate-400">
                  GA4 Measurement ID
                </label>
                <input
                  v-model={form.value.google_analytics_id}
                  type="text"
                  placeholder="G-XXXXXXXXXX"
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition font-mono text-sm"
                />
                <p class="text-[10px] text-slate-400">Used for client-side event tracking.</p>
              </div>

              <div class="space-y-2">
                <label class="block text-xs font-black uppercase tracking-widest text-slate-400">
                  GA4 Property ID
                </label>
                <input
                  v-model={form.value.ga_property_id}
                  type="text"
                  placeholder="123456789"
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition font-mono text-sm"
                />
                <p class="text-[10px] text-slate-400">Used for backend API reporting.</p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-50">
              <div class="space-y-2">
                <label class="block text-xs font-black uppercase tracking-widest text-slate-400">
                  AdSense Publisher ID
                </label>
                <input
                  v-model={form.value.adsense_pub_id}
                  type="text"
                  placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition font-mono text-sm"
                />
                <p class="text-[10px] text-slate-400">Used for script injection.</p>
              </div>

              <div class="space-y-2">
                <label class="block text-xs font-black uppercase tracking-widest text-slate-400">
                  AdSense Account ID
                </label>
                <input
                  v-model={form.value.adsense_account_id}
                  type="text"
                  placeholder="pub-123456789"
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition font-mono text-sm"
                />
                <p class="text-[10px] text-slate-400">Used for earnings reports.</p>
              </div>
            </div>
          </div>

          <footer class="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <div class="flex items-center gap-2">
              {successMessage.value && (
                <span class="text-emerald-600 text-sm font-bold flex items-center gap-1 animate-in fade-in slide-in-from-left-2">
                  <i class="bi bi-check-circle-fill"></i>
                  {successMessage.value}
                </span>
              )}
            </div>
            <BaseButton
              onClick={handleSave}
              loading={isSaving.value}
              variant="primary"
              class="px-8 py-3 uppercase font-black tracking-widest text-xs"
            >
              Save Configuration
            </BaseButton>
          </footer>
        </div>

        <div class="bg-amber-50 rounded-2xl border border-amber-100 p-6 flex gap-4">
          <div class="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 text-xl shrink-0">
            <i class="bi bi-info-circle-fill"></i>
          </div>
          <div>
            <h4 class="font-black text-amber-900">Integration Notice</h4>
            <p class="text-amber-700 text-sm mt-1 leading-relaxed">
              Updating these IDs will immediately affect how data is collected and reported. 
              Ensure you have granted access to the service account email in your Google Cloud Console 
              for the reporting features to work correctly.
            </p>
          </div>
        </div>
      </div>
    )
  },
})
