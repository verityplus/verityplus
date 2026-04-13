import { defineComponent, ref, computed, watchEffect, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '@/composables/useHead'
import { useArticleStore } from '@/features/article/store/article.store'
import { useCMSContentStore } from '@/features/cms/store/cms-content.store'
import { MarkdownEditor } from '@/features/cms/components/MarkdownEditor'
import type { ArticleStatus, Category, Author } from '@/shared/types'
import { ARTICLE_STATUS_LABELS } from '@/shared/types'
import { BaseButton } from '@/components/ui/Button'
import { Tabs } from '@/components/ui/Tabs'
import { appAlert } from '@/utils/dialog'
import { StorageService } from '@/shared/services/storage.service'
import { resolveAssetUrl } from '@/shared/utils/assets'
import { AIService } from '@/shared/services/ai.service'

/**
 * CMS View: ArticleEditorView
 * Full-screen editor with Markdown toolbar.
 */
export default defineComponent({
  name: 'ArticleEditorView',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const articleStore = useArticleStore()
    const cmsContentStore = useCMSContentStore()

    const isEdit = computed(() => route.params.id !== undefined)
    const tagInput = ref('')
    const isUploading = ref(false)
    const isAILoading = ref(false)
    const isManualEdit = ref(false)
    const currentStep = ref(0)
    const steps = ['Bahasa Indonesia', 'English', '中文 (Chinese)']

    useHead({
      title: computed(() =>
        isEdit.value ? `Edit Article — CMS VERITY+` : `New Article — CMS VERITY+`,
      ),
    })

    type EditorForm = Record<string, unknown> & {
      id: string
      titleId: string
      titleEn: string
      titleZh: string
      contentId: string
      contentEn: string
      contentZh: string
      coverImage: string
      coverImageCaptionId: string
      coverImageCaptionEn: string
      coverImageCaptionZh: string
      category: Category | null
      author: Author | null
      tagsId: string[]
      tagsEn: string[]
      tagsZh: string[]
      publishedAt: string
      status: ArticleStatus
    }

    const form = ref<EditorForm>({
      id: '',
      titleId: '',
      titleEn: '',
      titleZh: '',
      contentId: '',
      contentEn: '',
      contentZh: '',
      coverImage: '/universal-placeholder.png',
      coverImageCaptionId: '',
      coverImageCaptionEn: '',
      coverImageCaptionZh: '',
      category: null,
      author: null,
      tagsId: [],
      tagsEn: [],
      tagsZh: [],
      publishedAt: new Date().toISOString(),
      status: 'draft' as ArticleStatus,
    })


    watch(
      () => [articleStore.categories, articleStore.authors] as const,
      ([cats, auths]) => {
        if (!isEdit.value) {
          if (!form.value.category && cats.length > 0) form.value.category = cats[0] || null
          if (!form.value.author && auths.length > 0) form.value.author = auths[0] || null
        }
      },
      { immediate: true },
    )

    const loadData = async () => {
      if (isEdit.value) {
        const found = await articleStore.findById(route.params.id as string)
        if (found) {
          const processed = JSON.parse(JSON.stringify(found))

          processed.tagsId = found.tagsId ? JSON.parse(found.tagsId) : []
          processed.tagsEn = found.tagsEn ? JSON.parse(found.tagsEn) : []
          processed.tagsZh = found.tagsZh ? JSON.parse(found.tagsZh) : []
          form.value = processed
        }
      }
    }

    watchEffect(() => {
      loadData()
    })


    const activeLangSuffix = computed(() => {
      if (currentStep.value === 0) return 'Id'
      if (currentStep.value === 1) return 'En'
      if (currentStep.value === 2) return 'Zh'
      return 'Id'
    })

    const isFieldReadOnly = computed(() => {
      return currentStep.value !== 0 && !isManualEdit.value
    })

    const getCurrentTags = () => {
      const suffix = activeLangSuffix.value as 'Id' | 'En' | 'Zh'
      return form.value[`tags${suffix}`]
    }

    const addTag = () => {
      const tag = tagInput.value.trim()
      const tags = getCurrentTags()
      if (tag && !tags.includes(tag)) {
        tags.push(tag)
        tagInput.value = ''
      }
    }

    const removeTag = (index: number) => {
      const tags = getCurrentTags()
      tags.splice(index, 1)
    }

    const touched = ref<Record<string, boolean>>({})
    const showErrors = ref(false)

    const markTouched = (field: string) => {
      touched.value[field] = true
    }

    const errors = computed(() => {
      const errs: Record<string, string> = {}

      if (!form.value.titleId) errs.titleId = 'Title (ID) is required'
      if (!form.value.titleEn) errs.titleEn = 'Title (EN) is required'
      if (!form.value.titleZh) errs.titleZh = 'Title (ZH) is required'
      if (!form.value.contentId) errs.contentId = 'Content (ID) is required'
      if (!form.value.contentEn) errs.contentEn = 'Content (EN) is required'
      if (!form.value.contentZh) errs.contentZh = 'Content (ZH) is required'
      
      if (!form.value.category) errs.category = 'Category is required'
      if (!form.value.author) errs.author = 'Author is required'
      return errs
    })

    const handleDraft = async () => {
      const topic = prompt('Enter a topic for the AI to draft an article about:')
      if (!topic) return

      isAILoading.value = true
      try {
        const result = await AIService.draft(topic)
        form.value.titleId = result.title
        form.value.contentId = result.content
        form.value.excerptId = result.excerpt
        form.value.tagsId = result.tags.split(',').map(t => t.trim())
        currentStep.value = 0
      } catch (err: any) {
        await appAlert(`Failed to generate draft: ${err.message}`, 'AI Error')
      } finally {
        isAILoading.value = false
      }
    }

    const handleExcerpt = async () => {
      const content = (form.value as Record<string, string>)[`content${activeLangSuffix.value}`]
      if (!content) {
        await appAlert('Please write some content first.', 'Notice')
        return
      }

      isAILoading.value = true
      try {
        const { excerpt } = await AIService.generateExcerpt(content)
        ;(form.value as Record<string, string>)[`excerpt${activeLangSuffix.value}`] = excerpt
      } catch (err: any) {
        await appAlert(`Failed to generate excerpt: ${err.message}`, 'AI Error')
      } finally {
        isAILoading.value = false
      }
    }

    const handleTranslateAll = async () => {
      if (!form.value.titleId || !form.value.contentId) {
        await appAlert('Please ensure Indonesian title and content are filled first.', 'Notice')
        return
      }

      isAILoading.value = true
      try {
        // Translate to English
        const [titleEn, contentEn, excerptEn, tagsEn] = await Promise.all([
           AIService.translate(form.value.titleId, 'en'),
           AIService.translate(form.value.contentId, 'en'),
           form.value.excerptId ? AIService.translate(form.value.excerptId, 'en') : Promise.resolve({ translated: '' }),
           form.value.tagsId.length > 0 ? AIService.translate(form.value.tagsId.join(', '), 'en') : Promise.resolve({ translated: '' })
        ])
        
        form.value.titleEn = titleEn.translated
        form.value.contentEn = contentEn.translated
        form.value.excerptEn = excerptEn.translated
        form.value.tagsEn = tagsEn.translated ? tagsEn.translated.split(',').map(t => t.trim()) : []

        // Translate to Chinese
        const [titleZh, contentZh, excerptZh, tagsZh] = await Promise.all([
           AIService.translate(form.value.titleId, 'zh'),
           AIService.translate(form.value.contentId, 'zh'),
           form.value.excerptId ? AIService.translate(form.value.excerptId, 'zh') : Promise.resolve({ translated: '' }),
           form.value.tagsId.length > 0 ? AIService.translate(form.value.tagsId.join(', '), 'zh') : Promise.resolve({ translated: '' })
        ])

        form.value.titleZh = titleZh.translated
        form.value.contentZh = contentZh.translated
        form.value.excerptZh = excerptZh.translated
        form.value.tagsZh = tagsZh.translated ? tagsZh.translated.split(',').map(t => t.trim()) : []
        
        await appAlert('Translation completed for English and Chinese variants, including tags!', 'AI Success')
      } catch (err: any) {
        await appAlert(`Failed to translate: ${err.message}`, 'AI Error')
      } finally {
        isAILoading.value = false
      }
    }

    const triggerAutoTranslateAtOnce = async () => {
      if (isManualEdit.value || isAILoading.value) return
      await handleTranslateAll()
    }

    const save = async () => {
      showErrors.value = true

      if (Object.keys(errors.value).length > 0) {
        if (errors.value.titleId || errors.value.contentId) currentStep.value = 0
        else if (errors.value.titleEn || errors.value.contentEn) currentStep.value = 1
        else if (errors.value.titleZh || errors.value.contentZh) currentStep.value = 2

        const errorMsg = Object.values(errors.value).join('\n')
        await appAlert(`Please fix the following validation errors before saving:\n\n${errorMsg}`, 'Validation Error')
        return
      }



      const submissionData = {
        titleId: form.value.titleId,
        titleEn: form.value.titleEn,
        titleZh: form.value.titleZh,
        contentId: form.value.contentId,
        contentEn: form.value.contentEn,
        contentZh: form.value.contentZh,
        coverImage: form.value.coverImage,
        coverImageCaptionId: form.value.coverImageCaptionId,
        coverImageCaptionEn: form.value.coverImageCaptionEn,
        coverImageCaptionZh: form.value.coverImageCaptionZh,
        publishedAt: form.value.publishedAt,
        categoryId: form.value.category!.id,
        authorId: form.value.author!.id,
        status: form.value.status,
        tagsId: JSON.stringify(form.value.tagsId),
        tagsEn: JSON.stringify(form.value.tagsEn),
        tagsZh: JSON.stringify(form.value.tagsZh),
      }

      try {
        if (isEdit.value) {
          await cmsContentStore.updateArticle({
            id: form.value.id,
            ...submissionData,
          })
        } else {
          await cmsContentStore.addArticle(submissionData)
        }
        router.push('/cms/articles')
      } catch (err: unknown) {
        console.error('Save failed:', err)
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        let detail = errorMessage || 'Please check your connection.'
        let title = 'Save Failed'

        if (detail.includes('Unauthorized')) {
          detail = 'Your session has expired or you are not authorized to perform this action. Please log in again in a new tab, then return here to try saving again.'
          title = 'Session Expired'
        }

        await appAlert(`Failed to save article.\n\nDetail: ${detail}`, title)
      }
    }

    return () => (
      <div class="cms-editor h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-500">
        <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="flex flex-col">
            <h1 class="text-2xl font-black text-slate-900 tracking-tight">
              {isEdit.value ? 'Edit Article' : 'New Article'}
            </h1>
            <p class="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1 italic">
              VERITY+ Unified Content Studio
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
              onClick={handleTranslateAll}
              loading={isAILoading.value}
              variant="outline"
              class="px-6 py-3.5 uppercase font-black tracking-widest text-xs border-primary/20 text-primary hover:bg-primary/5"
            >
              <i class="bi bi-translate mr-2"></i> Sync All
            </BaseButton>
            <BaseButton
              onClick={() => {
                void save()
              }}
              variant="primary"
              class="shadow-lg shadow-primary/20 px-8 py-3.5 uppercase font-black tracking-widest text-xs"
            >
              {isEdit.value ? 'Save Changes' : 'Save Article'}
            </BaseButton>
          </div>
        </header>

        <div class="flex-grow flex flex-col xl:flex-row gap-8 min-h-[600px]">
          <div class="flex-grow space-y-6 overflow-hidden">
            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-8">
              <Tabs
                tabs={steps.map((text, idx) => {
                  const hasErr =
                    (idx === 0 && (errors.value.titleId || errors.value.contentId)) ||
                    (idx === 1 && (errors.value.titleEn || errors.value.contentEn)) ||
                    (idx === 2 && (errors.value.titleZh || errors.value.contentZh))
                  return hasErr && showErrors.value ? `${text} ⚠️` : text
                })}
                modelValue={currentStep.value}
                onUpdate:modelValue={(val) => (currentStep.value = val)}
              />

              <div
                class="pt-6 border-t border-slate-100 space-y-8 animate-in fade-in duration-500"
                key={currentStep.value}
              >
                <div class="space-y-4">
                  <label class="text-[10px] items-center flex justify-between font-bold text-slate-500 uppercase tracking-widest">
                    <span>Article Title</span>
                    <span class="text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      {activeLangSuffix.value}
                    </span>
                  </label>
                  <div class="flex gap-4 items-center">
                    <input
                      value={(form.value as Record<string, string>)[`title${activeLangSuffix.value}`]}
                      onInput={(e) => {
                        const val = (e.target as HTMLInputElement).value
                        ;(form.value as Record<string, string>)[`title${activeLangSuffix.value}`] =
                          val
                      }}
                      onBlur={() => {
                        markTouched(`title${activeLangSuffix.value}`)
                        if (currentStep.value === 0) triggerAutoTranslateAtOnce()
                      }}
                      type="text"
                      disabled={isFieldReadOnly.value}
                      placeholder={`Enter headline in ${steps[currentStep.value]}...`}
                      class={[
                        'flex-grow text-3xl sm:text-4xl rounded-xl border border-transparent focus:border-slate-100 focus:bg-slate-50/20 p-2 outline-none font-black transition',
                        isFieldReadOnly.value ? 'bg-slate-50/40 text-slate-400 cursor-not-allowed' : 'text-slate-900',
                        (showErrors.value || touched.value[`title${activeLangSuffix.value}`]) &&
                        errors.value[`title${activeLangSuffix.value}`]
                          ? 'text-red-600 placeholder-red-200'
                          : 'placeholder-slate-200',
                      ]}
                    />
                    {currentStep.value === 0 && (
                      <button
                        onClick={handleDraft}
                        disabled={isAILoading.value}
                        class="shrink-0 w-12 h-12 rounded-full bg-slate-100 text-slate-600 hover:bg-primary/10 hover:text-primary transition flex items-center justify-center border-none cursor-pointer"
                        title="Draft article with AI"
                      >
                         {isAILoading.value ? (
                          <div class="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <i class="bi bi-magic text-xl"></i>
                        )}
                      </button>
                    )}
                  </div>
                  {(showErrors.value || touched.value[`title${activeLangSuffix.value}`]) &&
                    errors.value[`title${activeLangSuffix.value}`] && (
                      <p class="text-[10px] font-black text-red-500 uppercase tracking-widest animate-in fade-in slide-in-from-top-1">
                        {errors.value[`title${activeLangSuffix.value}`]}
                      </p>
                    )}
                </div>

                <div class="space-y-4">
                  <label class="text-[10px] items-center flex justify-between font-bold text-slate-500 uppercase tracking-widest">
                    <span>Main Content</span>
                    <span class="text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      {activeLangSuffix.value}
                    </span>
                  </label>
                  <MarkdownEditor
                    modelValue={
                      (form.value as Record<string, string>)[`content${activeLangSuffix.value}`]
                    }
                    onUpdate:modelValue={(val) => {
                      ;(form.value as Record<string, string>)[`content${activeLangSuffix.value}`] =
                        val
                    }}
                    onBlur={() => {
                        if (currentStep.value === 0) triggerAutoTranslateAtOnce()
                    }}
                    disabled={isFieldReadOnly.value}
                  />
                </div>

                <div class="pt-6 border-t border-slate-50 space-y-3">
                  <label class="text-[10px] items-center flex justify-between font-bold text-slate-500 uppercase tracking-widest">
                    <span>Article Excerpt</span>
                    <button 
                       onClick={handleExcerpt}
                       disabled={isAILoading.value}
                       class="text-[9px] bg-primary/5 hover:bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-md transition font-black flex items-center gap-1 cursor-pointer"
                    >
                      {isAILoading.value ? (
                        <div class="w-3 h-3 border border-primary border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <><i class="bi bi-cpu"></i> AI GENERATE</>
                      )}
                    </button>
                  </label>
                  <textarea
                    value={(form.value as Record<string, string>)[`excerpt${activeLangSuffix.value}`]}
                    onInput={(e) => {
                      ;(form.value as Record<string, string>)[`excerpt${activeLangSuffix.value}`] = (e.target as HTMLTextAreaElement).value
                    }}
                    onBlur={() => {
                        if (currentStep.value === 0) triggerAutoTranslateAtOnce()
                    }}
                    disabled={isFieldReadOnly.value}
                    placeholder="Brief summary used for previews..."
                    class={[
                      "w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold outline-none min-h-[80px] resize-none transition",
                      isFieldReadOnly.value ? "bg-slate-50 text-slate-400 cursor-not-allowed" : "bg-slate-50/50 text-slate-700"
                    ]}
                  />
                </div>

                <div class="pt-6 border-t border-slate-50 space-y-3">
                  <label class="text-[10px] items-center flex justify-between font-bold text-slate-500 uppercase tracking-widest">
                    <span>Tags</span>
                    <span class="text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      {activeLangSuffix.value}
                    </span>
                  </label>
                  <div class="flex gap-2">
                    <input
                      value={tagInput.value}
                      disabled={isFieldReadOnly.value}
                      onInput={(e) => {
                        tagInput.value = (e.target as HTMLInputElement).value
                      }}
                      onBlur={() => {
                        if (currentStep.value === 0) triggerAutoTranslateAtOnce()
                      }}
                      onKeydown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addTag()
                        }
                      }}
                      type="text"
                      placeholder={isFieldReadOnly.value ? "Switch to Manual Mode to edit" : `Add tag for ${steps[currentStep.value]}...`}
                      class={[
                        "flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold outline-none transition",
                        isFieldReadOnly.value ? "bg-slate-50 text-slate-400 cursor-not-allowed" : "bg-slate-50/50 text-slate-700"
                      ]}
                    />
                    <button
                      onClick={addTag}
                      type="button"
                      class="px-3 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 transition cursor-pointer border-none"
                    >
                      <i class="bi bi-plus"></i>
                    </button>
                  </div>
                  {getCurrentTags().length > 0 && (
                    <div class="flex flex-wrap gap-2 mt-2">
                      {getCurrentTags().map((tag, index) => (
                        <span
                          key={tag}
                          class="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-primary/10 text-primary text-xs font-bold"
                        >
                          {tag}
                          <button
                            onClick={() => removeTag(index)}
                            type="button"
                            class="hover:text-primary/70 transition cursor-pointer border-none bg-transparent p-0"
                          >
                            <i class="bi bi-x text-[10px]"></i>
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <aside class="w-full xl:w-80 shrink-0 space-y-6 animate-in fade-in slide-in-from-right-10">
            <div class="bg-primary rounded-2xl p-6 text-white text-center shadow-lg shadow-primary/20">
              <i class="bi bi-globe text-3xl mb-3 block text-white/40" />
              <h4 class="font-black text-lg mb-1 leading-none uppercase tracking-tight">
                Global Asset
              </h4>
              <p class="text-[10px] text-white/60 mb-0 leading-relaxed uppercase font-bold tracking-widest">
                Applies to all language variants
              </p>
            </div>

            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div class="section-header mb-4 border-b border-slate-50 pb-2">
                <span class="section-header-title">Cover Asset</span>
              </div>

              <div class="space-y-4">
                <div class="aspect-video w-full rounded-xl overflow-hidden bg-slate-100 relative group">
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
                          form.value.coverImage = url
                        } catch (err: unknown) {
                          console.error('Upload failed:', err)
                          const errorMessage = err instanceof Error ? err.message : 'Unknown error'
                          await appAlert(`Failed to upload image. ${errorMessage}`, 'Upload Error')
                        } finally {
                          isUploading.value = false
                        }
                      }
                    }}
                  />
                  <img
                    src={resolveAssetUrl(form.value.coverImage as string)}
                    class={[
                      'w-full h-full object-cover group-hover:scale-110 transition duration-700',
                      isUploading.value ? 'opacity-20 scale-95' : 'opacity-100',
                    ]}
                  />
                  <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <span class="px-4 py-2 bg-white text-slate-900 rounded-lg text-xs font-black uppercase tracking-widest shadow-xl pointer-events-none">
                      {isUploading.value ? 'Uploading...' : 'Change Asset'}
                    </span>
                  </div>
                  {isUploading.value && (
                    <div class="absolute inset-0 flex items-center justify-center">
                      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  )}
                </div>
                <p class="text-[10px] text-slate-400 leading-tight italic uppercase font-bold tracking-widest text-center">
                  {isUploading.value ? 'Synchronizing with Secure Storage...' : 'Click Image to Upload'}
                </p>

                <div class="pt-4 border-t border-slate-50 space-y-3">
                  <label class="text-[10px] items-center flex justify-between font-bold text-slate-500 uppercase tracking-widest">
                    <span>Image Caption</span>
                    <span class="text-primary">{activeLangSuffix.value}</span>
                  </label>
                  <input
                    value={
                      (form.value as Record<string, string>)[
                        `coverImageCaption${activeLangSuffix.value}`
                      ]
                    }
                    onInput={(e) => {
                      ;(form.value as Record<string, string>)[
                        `coverImageCaption${activeLangSuffix.value}`
                      ] = (e.target as HTMLInputElement).value
                    }}
                    type="text"
                    placeholder="Caption for cover image..."
                    class="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-bold text-slate-700 outline-none"
                  />
                </div>
              </div>
            </div>

            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div class="section-header mb-4 border-b border-slate-50 pb-2">
                <span class="section-header-title">Article Configuration</span>
              </div>

              <div class="space-y-4">
                <div class="space-y-2">
                  <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Publication Status
                  </label>
                  <select
                    value={form.value.status}
                    onChange={(e) => {
                      form.value.status = (e.target as HTMLSelectElement).value as ArticleStatus
                    }}
                    class="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-black text-slate-700 outline-none"
                  >
                    {(Object.keys(ARTICLE_STATUS_LABELS) as ArticleStatus[]).map((status) => (
                      <option key={status} value={status}>
                        {ARTICLE_STATUS_LABELS[status]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div class="pt-6 border-t border-slate-50 space-y-3">
                <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Category
                </label>
                <select
                  value={form.value.category?.id || ''}
                  onChange={(e) => {
                    const cat = articleStore.categories.find(
                      (c) => c.id === (e.target as HTMLSelectElement).value,
                    )
                    if (cat) form.value.category = cat
                  }}
                  onBlur={() => markTouched('category')}
                  class={[
                    'w-full px-3 py-2 rounded-xl border bg-slate-50/50 focus:bg-white text-xs font-bold transition cursor-pointer outline-none',
                    (showErrors.value || touched.value.category) && errors.value.category
                      ? 'border-red-200 text-red-600'
                      : 'border-slate-200 text-slate-700',
                  ]}
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {articleStore.categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nameId}
                    </option>
                  ))}
                </select>
                {(showErrors.value || touched.value.category) && errors.value.category && (
                  <p class="text-[10px] font-black text-red-500 uppercase tracking-widest">
                    {errors.value.category}
                  </p>
                )}
              </div>

              <div class="pt-6 border-t border-slate-50 space-y-3">
                <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Author / Character
                </label>
                <select
                  value={form.value.author?.id || ''}
                  onChange={(e) => {
                    const auth = articleStore.authors.find(
                      (a) => a.id === (e.target as HTMLSelectElement).value,
                    )
                    if (auth) form.value.author = auth
                  }}
                  onBlur={() => markTouched('author')}
                  class={[
                    'w-full px-3 py-2 rounded-xl border bg-slate-50/50 text-xs font-black transition outline-none',
                    (showErrors.value || touched.value.author) && errors.value.author
                      ? 'border-red-200 text-red-600'
                      : 'border-slate-200 text-slate-700',
                  ]}
                >
                  <option value="" disabled>
                    Select Author
                  </option>
                  {articleStore.authors.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
                {(showErrors.value || touched.value.author) && errors.value.author && (
                  <p class="text-[10px] font-black text-red-500 uppercase tracking-widest">
                    {errors.value.author}
                  </p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    )
  },
})
