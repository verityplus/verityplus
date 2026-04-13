import { defineComponent, ref, watchEffect, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useArticleStore } from '@/features/article/store/article.store'
import { useCMSContentStore } from '@/features/cms/store/cms-content.store'
import type { Category } from '@/shared/types'
import { BaseButton } from '@/components/ui/Button'
import { Tabs } from '@/components/ui/Tabs'
import { appAlert } from '@/utils/dialog'
import { AIService } from '@/shared/services/ai.service'

/**
 * CMS View: CategoryEditorView
 * Detailed form to manage article categories.
 */
export default defineComponent({
  name: 'CategoryEditorView',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const articleStore = useArticleStore()
    const cmsContentStore = useCMSContentStore()

    const isEdit = computed(() => route.params.id !== undefined)
    const isAILoading = ref(false)
    const isManualEdit = ref(false)

    const currentStep = ref(0)
    const steps = ['Bahasa Indonesia', 'English', '中文 (Chinese)']

    const activeLangSuffix = computed(() => {
      if (currentStep.value === 0) return 'Id'
      if (currentStep.value === 1) return 'En'
      if (currentStep.value === 2) return 'Zh'
      return 'Id'
    })

    const isFieldReadOnly = computed(() => {
      return currentStep.value !== 0 && !isManualEdit.value
    })

    const form = ref<Category>({
      id: `cat-${Date.now()}`,
      nameId: '',
      nameEn: '',
      nameZh: '',
    })

    const loadData = () => {
      if (isEdit.value) {
        const found = articleStore.categories.find((c) => c.id === (route.params.id as string))
        if (found) {
          form.value = { ...found }
        }
      }
    }

    watchEffect(() => {
      loadData()
    })

    const handleAutoTranslate = async () => {
      if (isManualEdit.value || isAILoading.value || !form.value.nameId) return
      
      isAILoading.value = true
      try {
        const [en, zh] = await Promise.all([
           AIService.translate(form.value.nameId, 'en'),
           AIService.translate(form.value.nameId, 'zh')
        ])
        form.value.nameEn = en.translated
        form.value.nameZh = zh.translated
      } catch (err: any) {
        console.error('Auto-translate failed:', err)
      } finally {
        isAILoading.value = false
      }
    }

    const save = async () => {
      if (!form.value.nameId) {
        await appAlert('Name (ID) is required.', 'Validation Error')
        currentStep.value = 0
        return
      }
      if (!form.value.nameEn) {
        await appAlert('Name (EN) is required.', 'Validation Error')
        currentStep.value = 1
        return
      }
      if (!form.value.nameZh) {
        await appAlert('Name (ZH) is required.', 'Validation Error')
        currentStep.value = 2
        return
      }

      try {
        if (isEdit.value) {
          await cmsContentStore.updateCategory(form.value)
        } else {
          const { id: _id, ...createData } = form.value
          await cmsContentStore.addCategory(createData)
        }
        router.push('/cms/categories')
      } catch (err: unknown) {
        const detail = err instanceof Error ? err.message : 'Check your network connection and retry.'
        await appAlert(`Failed to save category.\n\nDetail: ${detail}`, 'Save Error')
      }
    }

    return () => (
      <div class="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-500">
        <header class="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="flex flex-col">
            <h1 class="text-2xl font-black text-slate-900 tracking-tight">
              {isEdit.value ? 'Modify Category' : 'Register Category'}
            </h1>
            <p class="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1 italic">
              Structural Meta-Taxonomy Unit
            </p>
          </div>
          <div class="flex items-center gap-6">
            <div class="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
               <span class="text-[10px] font-black uppercase tracking-widest text-slate-500">Manual Edit (EN/ZH)</span>
               <label class="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  class="sr-only peer" 
                  checked={isManualEdit.value}
                  onChange={(e) => (isManualEdit.value = (e.target as HTMLInputElement).checked)}
                />
                <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <BaseButton
              onClick={handleAutoTranslate}
              loading={isAILoading.value}
              variant="outline"
              class="px-6 py-3.5 uppercase font-black tracking-widest text-xs border-primary/20 text-primary hover:bg-primary/5"
            >
              <i class="bi bi-translate mr-2"></i> Sync
            </BaseButton>
            <BaseButton
              onClick={save}
              variant="primary"
              class="shadow-lg shadow-primary/20 px-8 py-3.5 uppercase font-black tracking-widest text-xs"
            >
              Save Taxonomy
            </BaseButton>
          </div>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div class="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-8">
            <Tabs
              tabs={steps}
              modelValue={currentStep.value}
              onUpdate:modelValue={(val) => (currentStep.value = val)}
            />

            <div class="space-y-6 pt-6 border-t border-slate-100" key={currentStep.value}>
              <div class="space-y-2">
                <label class="text-[10px] items-center flex justify-between font-black text-slate-400 uppercase tracking-widest">
                  <span>Public Taxonomy Name</span>
                  <span class="text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {activeLangSuffix.value}
                  </span>
                </label>
                <input
                  value={(form.value as Record<string, string>)[`name${activeLangSuffix.value}`]}
                  onInput={(e) => {
                    const val = (e.target as HTMLInputElement).value
                    ;(form.value as Record<string, string>)[`name${activeLangSuffix.value}`] = val
                  }}
                  onBlur={() => {
                    if (currentStep.value === 0) handleAutoTranslate()
                  }}
                  disabled={isFieldReadOnly.value}
                  type="text"
                  placeholder={`e.g. ${steps[currentStep.value] === 'Bahasa Indonesia' ? 'Sains' : steps[currentStep.value] === 'English' ? 'Science' : '科学'}`}
                  class={[
                    "w-full text-2xl font-black p-3 rounded-xl outline-none transition",
                    isFieldReadOnly.value ? "bg-slate-50 text-slate-400 cursor-not-allowed" : "bg-slate-50 border-transparent focus:bg-white focus:border-primary/20 text-slate-900"
                  ]}
                />
              </div>


            </div>
          </div>

          <div class="bg-slate-900 p-12 rounded-2xl text-white relative overflow-hidden flex flex-col justify-center min-h-[400px] shadow-2xl">
            <div class="relative z-10 space-y-6">
              <i class="bi bi-tag text-6xl opacity-30 drop-shadow-xl" />
              <h3 class="text-3xl font-black leading-tight border-b border-white/20 pb-4">
                Category Taxonomy
              </h3>
              <p class="text-slate-100/70 text-sm leading-relaxed">
                Categories help organize articles into logical structural units. The name will be
                displayed on badges and filters across the portal.
              </p>
              <div class="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-md">
                <p class="text-xs uppercase font-black tracking-widest mb-4 opacity-50 text-center">
                  Live Preview ({activeLangSuffix.value})
                </p>
                <div class="flex justify-center">
                  <div class="inline-block px-10 py-3 rounded-2xl text-sm font-black uppercase tracking-widest border-2 shadow-2xl transition-all duration-300 bg-primary/10 text-primary border-primary">
                    {(form.value as Record<string, string>)[`name${activeLangSuffix.value}`] ||
                      'Sample Taxonomy'}
                  </div>
                </div>
              </div>
            </div>
            <div class="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-20" />
          </div>
        </div>
      </div>
    )
  },
})
