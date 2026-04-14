import { defineComponent, ref, watchEffect, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { nanoid } from 'nanoid'
import { useArticleStore } from '@/features/article/store/article.store'
import { useCMSContentStore } from '@/features/cms/store/cms-content.store'
import type { Author } from '@/shared/types'
import { BaseButton } from '@/components/ui/Button'
import { Tabs } from '@/components/ui/Tabs'
import { appAlert } from '@/utils/dialog'
import { StorageService } from '@/shared/services/storage.service'
import { resolveAssetUrl } from '@/shared/utils/assets'
import { AIService } from '@/shared/services/ai.service'

/**
 * CMS View: CharacterEditorView
 * Detailed form to manage identities and personas.
 */
export default defineComponent({
  name: 'CharacterEditorView',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const articleStore = useArticleStore()
    const cmsContentStore = useCMSContentStore()

    const isEdit = computed(() => route.params.id !== undefined)
    const isUploading = ref(false)
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

    const form = ref<Author>({
      id: `char-${Date.now()}`,
      name: '',
      avatar: '/profile-placeholder.png',
      bioId: '',
      bioEn: '',
      bioZh: '',
      slug: '',
    })

    const loadData = () => {
      if (isEdit.value) {
        const found = articleStore.findAuthorById(route.params.id as string)
        if (found) {
          form.value = { ...found }
        }
      }
    }

    watchEffect(() => {
      loadData()
    })

    const handleAutoTranslate = async () => {
      if (isAILoading.value || !form.value.bioId) return
      
      isAILoading.value = true
      try {
        const [en, zh] = await Promise.all([
           AIService.translate(form.value.bioId, 'en'),
           AIService.translate(form.value.bioId, 'zh')
        ])
        form.value.bioEn = en.translated
        form.value.bioZh = zh.translated
      } catch (err: any) {
        console.error('Auto-translate failed:', err)
      } finally {
        isAILoading.value = false
      }
    }

    const handleGenerateSlug = async () => {
      if (!form.value.name) {
        await appAlert('Please enter a name first.', 'Notice')
        return
      }
      isAILoading.value = true
      try {
        const { slug } = await AIService.generateSlug(form.value.name)
        form.value.slug = `${slug}-${nanoid(6)}`
      } catch (err: any) {
        console.error('Failed to generate slug:', err)
        form.value.slug = `${(form.value.name as string).toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${nanoid(6)}`
      } finally {
        isAILoading.value = false
      }
    }

    const save = async () => {
      if (!form.value.name) return

      try {
        if (isEdit.value) {
          const { role, ...updateData } = form.value
          await cmsContentStore.updateAuthor({
            ...updateData,
            role: role ?? undefined
          })
        } else {
          const { id: _id, role, ...createData } = form.value
          await cmsContentStore.addAuthor({
            ...createData,
            role: role ?? undefined
          })
        }
        router.push('/cms/characters')
      } catch (err: unknown) {
        const detail = err instanceof Error ? err.message : 'Check your network connection and retry.'
        await appAlert(`Failed to save character.\n\nDetail: ${detail}`, 'Save Error')
      }
    }

    return () => (
      <div class="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-500">
        <header class="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="flex flex-col">
            <h1 class="text-2xl font-black text-slate-900 tracking-tight">
              {isEdit.value ? 'Modify Identity' : 'Register Identity'}
            </h1>
            <p class="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1 italic">
              Identity Protection Protocol Active
            </p>
          </div>
          <BaseButton
            onClick={save}
            variant="primary"
            class="shadow-lg shadow-primary/20 px-10 py-3.5 uppercase font-black tracking-widest text-xs"
          >
            Save Character
          </BaseButton>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div class="bg-white p-12 rounded-2xl border border-slate-200 shadow-sm space-y-8">
            <div class={[
              'flex flex-col items-center justify-center p-8 border-4 border-dashed rounded-3xl group transition duration-300 relative',
              isUploading.value ? 'border-primary/40 bg-slate-50' : 'border-slate-100 hover:border-primary/20',
            ]}>
              <input
                type="file"
                class="absolute inset-0 opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
                accept="image/*"
                disabled={isUploading.value}
                onChange={async (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0]
                  if (file) {
                    isUploading.value = true
                    try {
                      const url = await StorageService.upload(file)
                      form.value.avatar = url
                    } catch (err: unknown) {
                      console.error('Avatar upload failed:', err)
                      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
                      await appAlert(`Failed to upload avatar. ${errorMessage}`, 'Upload Error')
                    } finally {
                      isUploading.value = false
                    }
                  }
                }}
              />
              <div class="relative">
                <img
                  src={resolveAssetUrl(form.value.avatar)}
                  class={[
                    'w-40 h-40 rounded-full border-4 border-white shadow-xl group-hover:scale-105 transition object-cover',
                    isUploading.value ? 'opacity-30 blur-sm' : 'opacity-100',
                  ]}
                />
                <div class="absolute bottom-2 right-2 w-10 h-10 bg-slate-900 border-2 border-white rounded-full flex items-center justify-center text-white text-lg shadow-lg">
                  {isUploading.value ? (
                    <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <i class="bi bi-camera-fill text-sm"></i>
                  )}
                </div>
              </div>
              <p class="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-6 group-hover:text-primary">
                {isUploading.value ? 'Uploading to Secure Vault...' : 'Click to Upload New Avatar'}
              </p>
            </div>

            <div class="space-y-6 pt-6 border-t border-slate-50">
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Public Representative Name
                </label>
                <input
                  value={form.value.name}
                  onInput={(e) => {
                    form.value.name = (e.target as HTMLInputElement).value
                  }}
                  type="text"
                  placeholder="e.g. John Doe"
                  class="w-full text-2xl font-black p-3 bg-slate-50 border-transparent focus:bg-white focus:border-primary/20 rounded-xl outline-none text-slate-900 transition"
                />
              </div>

              <div class="space-y-2 pt-6 border-t border-slate-50">
                <label class="text-[10px] items-center flex justify-between font-black text-slate-400 uppercase tracking-widest">
                  <span>SEO Slug</span>
                  <button
                    onClick={handleGenerateSlug}
                    disabled={isAILoading.value}
                    class="text-[9px] bg-primary/5 hover:bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-md transition font-black flex items-center gap-1 cursor-pointer"
                  >
                    {isAILoading.value ? (
                      <div class="w-2 h-2 border border-primary border-t-transparent rounded-full animate-spin"></div>
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
                  placeholder="author-url-slug"
                  class="w-full text-base font-black p-3 rounded-xl outline-none transition bg-slate-50 border-transparent focus:bg-white focus:border-primary/20 text-slate-900"
                />
              </div>

              <div class="pt-6 mt-6 space-y-6">
                <Tabs
                  tabs={steps}
                  modelValue={currentStep.value}
                  onUpdate:modelValue={(val) => (currentStep.value = val)}
                />

                {currentStep.value === 0 && (
                  <div class="flex justify-between items-center bg-slate-50/50 p-4 rounded-xl border border-slate-100 mt-4 outline outline-2 outline-primary/5">
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
                  <div class="flex justify-between items-center bg-slate-50/50 p-4 rounded-xl border border-slate-100 mt-4 overflow-hidden outline outline-4 outline-primary/5">
                    <div class="flex items-center gap-3">
                       <i class="bi bi-robot text-primary/40 text-lg"></i>
                       <span class="text-[10px] font-black text-slate-800 uppercase tracking-widest">{steps[currentStep.value]} Profile Sync</span>
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

                <div
                  class={["space-y-4 pt-4 border-t border-slate-50 animate-in fade-in", currentStep.value !== 0 ? "mt-4" : ""]}
                  key={currentStep.value}
                >
                  <label class="text-[10px] items-center flex justify-between font-black text-slate-400 uppercase tracking-widest">
                    <span>Character Biography / Backstory</span>
                    <span class="text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      {activeLangSuffix.value}
                    </span>
                  </label>
                  <textarea
                    value={(form.value as Record<string, string>)[`bio${activeLangSuffix.value}`]}
                    onInput={(e) => {
                      ;(form.value as Record<string, string>)[`bio${activeLangSuffix.value}`] = (
                        e.target as HTMLTextAreaElement
                      ).value
                    }}
                    onBlur={() => {
                      if (currentStep.value === 0) handleAutoTranslate()
                    }}
                    disabled={isFieldReadOnly.value}
                    placeholder={`Tell the character's story in ${steps[currentStep.value]}...`}
                    class={[
                      "w-full text-sm font-medium p-3 rounded-xl outline-none transition min-h-[120px] resize-none",
                      isFieldReadOnly.value ? "bg-slate-50 text-slate-400 cursor-not-allowed" : "bg-slate-50 border-transparent focus:bg-white focus:border-primary/20 text-slate-700"
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="bg-indigo-900 p-12 rounded-2xl text-white relative overflow-hidden flex flex-col justify-center min-h-[400px] shadow-2xl">
            <div class="relative z-10 space-y-6">
              <i class="bi bi-person-badge text-6xl opacity-30 drop-shadow-xl" />
              <h3 class="text-3xl font-black leading-tight border-b border-white/20 pb-4">
                Character Backstory Guidelines
              </h3>
              <p class="text-indigo-100/70 text-sm leading-relaxed">
                VERITY+ authors are part of a larger narrative. Ensure the biography is engaging and
                provides context to why this character is an authority on their topics.
              </p>
              <div class="space-y-2 pt-4 border-t border-white/10">
                <div class="flex items-center gap-3">
                  <i class="bi bi-check-circle-fill text-indigo-400" />
                  <span class="text-xs font-black uppercase">
                    Verified Badge Automatically Applied
                  </span>
                </div>
                <div class="flex items-center gap-3">
                  <i class="bi bi-check-circle-fill text-indigo-400" />
                  <span class="text-xs font-black uppercase">Instant Global Profile Refresh</span>
                </div>
              </div>
            </div>
            <div class="absolute -top-10 -right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl opacity-20" />
          </div>
        </div>
      </div>
    )
  },
})
