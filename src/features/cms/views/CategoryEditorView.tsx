import { defineComponent, ref, watchEffect, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useArticleStore } from '@/features/article/store/article.store'
import { useCMSContentStore } from '@/features/cms/store/cms-content.store'
import type { Category } from '@/shared/types'
import { BaseButton } from '@/components/ui/Button'

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

    const form = ref<Category>({
      id: `cat-${Date.now()}`,
      name: '',
      slug: '',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary',
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

    const save = () => {
      if (!form.value.name || !form.value.slug) return

      if (isEdit.value) {
        cmsContentStore.updateCategory(form.value)
      } else {
        cmsContentStore.addCategory(form.value)
      }

      router.push('/cms/categories')
    }

    // NOTE: Contrast helper utilities are reserved for future accessibility features.
    // Kept as unused to satisfy lint rules while preserving implementation.
    const _getContrastYIQ = (_hexcolor: string) => {
      if (!_hexcolor || !_hexcolor.startsWith('#')) return 255
      _hexcolor = _hexcolor.replace('#', '')
      const r = parseInt(_hexcolor.substring(0, 2), 16)
      const g = parseInt(_hexcolor.substring(2, 4), 16)
      const b = parseInt(_hexcolor.substring(4, 6), 16)
      return (r * 299 + g * 587 + b * 114) / 1000
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
            <div class="space-y-6">
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Public Taxonomy Name
                </label>
                <input
                  value={form.value.name}
                  onInput={(e) => {
                    form.value.name = (e.target as HTMLInputElement).value
                  }}
                  type="text"
                  placeholder="e.g. Science"
                  class="w-full text-2xl font-black p-3 bg-slate-50 border-transparent focus:bg-white focus:border-primary/20 rounded-xl outline-none text-slate-900 transition"
                />
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  URL Slug Reference
                </label>
                <input
                  value={form.value.slug}
                  onInput={(e) => {
                    form.value.slug = (e.target as HTMLInputElement).value
                  }}
                  type="text"
                  placeholder="e.g. science-tech"
                  class="w-full text-lg font-bold p-3 bg-slate-50 border-transparent focus:bg-white focus:border-primary/20 rounded-xl outline-none text-slate-700 transition"
                />
              </div>
            </div>

            <div class="pt-8 border-t border-slate-50 space-y-6">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">
                Precision Theme Palette
              </label>

              <div class="space-y-4">
                {[
                  {
                    key: 'color' as keyof Category,
                    label: 'Text Color',
                    hint: 'The foreground legend color',
                  },
                  {
                    key: 'bgColor' as keyof Category,
                    label: 'Fill Color',
                    hint: 'Backdrop for badges and highlights',
                  },
                  {
                    key: 'borderColor' as keyof Category,
                    label: 'Stroke Color',
                    hint: 'Structural focus borders',
                  },
                ].map((field) => (
                  <div class="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div class="flex flex-col">
                      <span class="text-xs font-black text-slate-900 uppercase tracking-tight">
                        {field.label}
                      </span>
                      <span class="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-0.5">
                        {field.hint}
                      </span>
                    </div>
                    <div class="relative group">
                      <input
                        type="color"
                        value={
                          (form.value[field.key] ?? '').startsWith('#')
                            ? form.value[field.key]
                            : '#3b82f6'
                        }
                        onInput={(e) => {
                          ;(form.value[field.key] as string) = (e.target as HTMLInputElement).value
                        }}
                        class="w-12 h-12 rounded-lg cursor-pointer border-4 border-white shadow-sm appearance-none p-0 overflow-hidden"
                      />
                      <div class="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[8px] flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition">
                        <i class="bi bi-eyedropper" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contrast Warning Area */}
              <div class="p-4 rounded-xl bg-amber-50 border border-amber-100 flex items-start gap-3">
                <i class="bi bi-exclamation-triangle-fill text-amber-500 mt-0.5" />
                <div class="flex flex-col">
                  <p class="text-xs font-black text-amber-900 uppercase mb-1">
                    Accessibility Check
                  </p>
                  <p class="text-[10px] text-amber-700 leading-relaxed font-bold">
                    Ensure high contrast between Fill and Text colors for WCAG compliance. Soft
                    backgrounds are recommended.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-slate-900 p-12 rounded-2xl text-white relative overflow-hidden flex flex-col justify-center min-h-[400px] shadow-2xl">
            <div class="relative z-10 space-y-6">
              <i class="bi bi-brush text-6xl opacity-30 drop-shadow-xl" />
              <h3 class="text-3xl font-black leading-tight border-b border-white/20 pb-4">
                Real-time Theme Generation
              </h3>
              <p class="text-slate-100/70 text-sm leading-relaxed">
                The values selected will be used to generate CSS variables for the article's
                personality. Changes are propagated throughout the infrastructure instantly.
              </p>
              <div class="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-md">
                <p class="text-xs uppercase font-black tracking-widest mb-4 opacity-50 text-center">
                  Live Logic Preview
                </p>
                <div class="flex justify-center">
                  <div
                    style={{
                      backgroundColor: form.value.bgColor.startsWith('#')
                        ? form.value.bgColor
                        : '#3b82f61a',
                      color: form.value.color.startsWith('#') ? form.value.color : '#3b82f6',
                      borderColor: form.value.borderColor.startsWith('#')
                        ? form.value.borderColor
                        : '#3b82f6',
                    }}
                    class="inline-block px-10 py-3 rounded-2xl text-sm font-black uppercase tracking-widest border-2 shadow-2xl transition-all duration-300"
                  >
                    {form.value.name || 'Sample Taxonomy'}
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
