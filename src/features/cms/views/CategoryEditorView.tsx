import { defineComponent, ref, watchEffect, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { nanoid } from 'nanoid'
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

    const currentStep = ref(0)
    const steps = ['Bahasa Indonesia', 'English', '中文 (Chinese)']

    const activeLangSuffix = computed(() => {
      if (currentStep.value === 0) return 'Id'
      if (currentStep.value === 1) return 'En'
      if (currentStep.value === 2) return 'Zh'
      return 'Id'
    })

    const isFieldReadOnly = computed(() => {
      return false
    })

    const form = ref<Category>({
      id: `cat-${Date.now()}`,
      nameId: '',
      nameEn: '',
      nameZh: '',
      slug: '',
    })

    const loadData = () => {
      if (isEdit.value) {
        const found = articleStore.categories.find((c) => c.id === (route.params.id as string))
        if (found) {
          form.value = { ...found, slug: found.slug || '' }
        }
      }
    }

    watchEffect(() => {
      loadData()
    })

    const handleAutoTranslate = async () => {
      if (isAILoading.value || !form.value.nameId) return
      
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

    const handleGenerateSlug = async () => {
      if (!form.value.nameId) {
        await appAlert('Please enter a name first.', 'Notice')
        return
      }
      isAILoading.value = true
      try {
        const { slug } = await AIService.generateSlug(form.value.nameId)
        form.value.slug = `${slug}-${nanoid(6)}`
      } catch (err: any) {
        console.error('Failed to generate slug:', err)
        form.value.slug = `${(form.value.nameId as string).toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${nanoid(6)}`
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
        const submissionData = {
          nameId: form.value.nameId,
          nameEn: form.value.nameEn,
          nameZh: form.value.nameZh,
          slug: form.value.slug || undefined,
        }

        if (isEdit.value) {
          await cmsContentStore.updateCategory({
            id: form.value.id,
            ...submissionData,
          })
        } else {
          await cmsContentStore.addCategory(submissionData)
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
          <BaseButton
            onClick={save}
            variant="primary"
            class="shadow-lg shadow-primary/20 px-10 py-3.5 uppercase font-black tracking-widest text-xs"
          >
            Save Taxonomy
          </BaseButton>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div class="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-8">
            <Tabs
              tabs={steps}
              modelValue={currentStep.value}
              onUpdate:modelValue={(val) => (currentStep.value = val)}
            />

            {currentStep.value === 0 && (
               <div class="flex justify-between items-center bg-slate-50/50 p-4 rounded-xl border border-slate-100 mt-4">
                  <div class="flex items-center gap-3">
                     <i class="bi bi-shield-check text-primary/40 text-lg"></i>
                     <div>
                        <p class="text-[9px] font-black uppercase tracking-tighter text-slate-400 mb-0 leading-none">Source Content Authority</p>
                        <h6 class="text-[11px] font-black text-slate-800 uppercase tracking-widest">Indonesian Master Identity</h6>
                     </div>
                  </div>
                  <div class="p-1 px-3 bg-primary/5 border border-primary/10 rounded-full">
                    <span class="text-[9px] font-black text-primary uppercase tracking-widest leading-none">PRIMARY</span>
                  </div>
               </div>
            )}

            {(currentStep.value === 1 || currentStep.value === 2) && (
              <div class="flex justify-between items-center bg-slate-50/50 p-4 rounded-xl border border-slate-100 mt-4">
                <div class="flex items-center gap-3">
                   <i class="bi bi-robot text-primary/40 text-lg"></i>
                   <span class="text-[10px] font-black text-slate-800 uppercase tracking-widest">{steps[currentStep.value]} Localization</span>
                </div>

                <div class="flex items-center gap-6">
                  <button
                    onClick={handleAutoTranslate}
                    disabled={isAILoading.value}
                    class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-[9px] font-black uppercase tracking-widest hover:border-primary/20 hover:text-primary transition cursor-pointer"
                  >
                    {isAILoading.value ? (
                      <div class="w-2 h-2 border border-primary border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <i class="bi bi-arrow-repeat"></i>
                    )}
                    <span>Sync</span>
                  </button>
                </div>
              </div>
            )}

            <div class={["space-y-6 pt-6 border-t border-slate-100", currentStep.value !== 0 ? "mt-4" : ""]} key={currentStep.value}>
              <div class="space-y-2">
                <label class="text-[10px] items-center flex justify-between font-black text-slate-400 uppercase tracking-widest">
                  <span>Public Taxonomy Name</span>
                  <span class="text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {activeLangSuffix.value}
                  </span>
                </label>
                <input
                  value={(form.value as any)[`name${activeLangSuffix.value}`]}
                  onInput={(e) => {
                    const val = (e.target as HTMLInputElement).value
                    ;(form.value as any)[`name${activeLangSuffix.value}`] = val
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

              <div class="space-y-4 pt-6 border-t border-slate-100">
                <label class="text-[10px] items-center flex justify-between font-black text-slate-400 uppercase tracking-widest">
                  <span>SEO Slug</span>
                  <button
                    onClick={handleGenerateSlug}
                    disabled={isAILoading.value}
                    class="text-[9px] bg-primary/5 hover:bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-md transition font-black flex items-center gap-1 cursor-pointer"
                  >
                    {isAILoading.value ? (
                      <div class="w-3 h-3 border border-primary border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <><i class="bi bi-cpu"></i> AI GEN</>
                    )}
                  </button>
                </label>
                <input
                  value={form.value.slug}
                  onInput={(e) => {
                    form.value.slug = (e.target as HTMLInputElement).value
                  }}
                  type="text"
                  placeholder="category-url-slug"
                  class="w-full text-base font-black p-3 rounded-xl outline-none transition bg-slate-50 border-transparent focus:bg-white focus:border-primary/20 text-slate-900"
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
                    {(form.value as any)[`name${activeLangSuffix.value}`] ||
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
