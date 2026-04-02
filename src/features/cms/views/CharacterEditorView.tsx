import { defineComponent, ref, watchEffect, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useArticleStore } from '@/features/article/store/article.store'
import { useCMSContentStore } from '@/features/cms/store/cms-content.store'
import type { Author } from '@/shared/types'
import { BaseButton } from '@/components/ui/Button'

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

    const form = ref<Author>({
      id: `char-${Date.now()}`,
      name: '',
      avatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80',
      bio: 'Verity+ Staff Writer',
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

    const save = () => {
      if (!form.value.name) return

      if (isEdit.value) {
        cmsContentStore.updateAuthor(form.value)
      } else {
        cmsContentStore.addAuthor(form.value)
      }

      router.push('/cms/characters')
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
            <div class="flex flex-col items-center justify-center p-8 border-4 border-dashed border-slate-100 rounded-3xl group hover:border-primary/20 transition duration-300 relative">
              <input
                type="file"
                class="absolute inset-0 opacity-0 cursor-pointer z-10"
                accept="image/*"
                onChange={(e) => {
                  const file = (e.target as HTMLInputElement).files?.[0]
                  if (file) {
                    // Mocking upload by creating a local blob URL
                    form.value.avatar = URL.createObjectURL(file)
                  }
                }}
              />
              <div class="relative">
                <img
                  src={form.value.avatar}
                  class="w-40 h-40 rounded-full border-4 border-white shadow-xl group-hover:scale-105 transition object-cover"
                />
                <div class="absolute bottom-2 right-2 w-10 h-10 bg-slate-900 border-2 border-white rounded-full flex items-center justify-center text-white text-lg shadow-lg">
                  <i class="bi bi-camera-fill text-sm"></i>
                </div>
              </div>
              <p class="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-6 group-hover:text-primary">
                Click to Upload New Avatar
              </p>
            </div>

            <div class="space-y-6">
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
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Character Biography / Backstory
                </label>
                <textarea
                  value={form.value.bio}
                  onInput={(e) => {
                    form.value.bio = (e.target as HTMLTextAreaElement).value
                  }}
                  placeholder="Tell the character's story..."
                  class="w-full text-sm font-medium p-3 bg-slate-50 border-transparent focus:bg-white focus:border-primary/20 rounded-xl outline-none text-slate-700 transition min-h-[120px] resize-none"
                />
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
                Verity+ authors are part of a larger narrative. Ensure the biography is engaging and
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
