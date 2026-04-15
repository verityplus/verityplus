import { defineComponent, ref, onMounted } from 'vue'
import { BaseButton } from '@/components/ui/Button'

export interface AIDraftOptions {
  topic: string
  tone: string
  audience: string
  goals: string
  keywords: string
  keyPoints: string
}

export const AIDraftModal = defineComponent({
  name: 'AIDraftModal',
  props: {
    onConfirm: {
      type: Function as import('vue').PropType<(options: AIDraftOptions) => void>,
      required: true,
    },
    onCancel: {
      type: Function as import('vue').PropType<() => void>,
      required: true,
    },
  },
  setup(props) {
    const isVisible = ref(false)
    const form = ref<AIDraftOptions>({
      topic: '',
      tone: 'Professional',
      audience: '',
      goals: '',
      keywords: '',
      keyPoints: '',
    })

    const tones = [
      'Professional',
      'Casual',
      'Inspiring',
      'Witty',
      'Academic',
      'Empathetic',
      'Journalistic',
    ]

    onMounted(() => {
      setTimeout(() => {
        isVisible.value = true
      }, 10)
    })

    const handleConfirm = () => {
      if (!form.value.topic.trim()) return
      isVisible.value = false
      setTimeout(() => {
        props.onConfirm(form.value)
      }, 300)
    }

    const handleCancel = () => {
      isVisible.value = false
      setTimeout(() => {
        props.onCancel()
      }, 300)
    }

    return () => (
      <div
        class={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-500 p-4 md:p-6 ${
          isVisible.value ? 'opacity-100 backdrop-blur-xl bg-slate-900/60' : 'opacity-0 bg-transparent pointer-events-none'
        }`}
      >
        <div
          class={`bg-white/95 backdrop-blur-md rounded-[2rem] shadow-[0_32px_128px_rgba(0,0,0,0.3)] border border-white/20 max-w-2xl w-full overflow-hidden transform transition-all duration-500 ease-out-back relative ${
            isVisible.value ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
          }`}
        >
          {/* Close Button */}
          <button
            onClick={handleCancel}
            class="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-100/50 hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition flex items-center justify-center border-none cursor-pointer"
          >
            <i class="bi bi-x-lg text-xs" />
          </button>

          {/* Header */}
          <div class="relative p-6 pb-2">
            <div class="flex items-center gap-3">
               <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <i class="bi bi-robot text-primary text-xl"></i>
               </div>
               <div>
                  <h2 class="text-2xl font-black text-slate-900 tracking-tight leading-none">
                    AI Content <span class="text-primary italic">Architect</span>
                  </h2>
                  <p class="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] mt-1">
                    Premium Drafting Engine
                  </p>
               </div>
            </div>
          </div>

          {/* Body */}
          <div class="p-6 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto max-h-[70vh] custom-scrollbar">
            <div class="space-y-2 md:col-span-2">
              <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest block pl-1">
                Primary Topic / Headline Focus
              </label>
              <input
                type="text"
                value={form.value.topic}
                onInput={(e) => (form.value.topic = (e.target as HTMLInputElement).value)}
                placeholder="Ex: The Future of Quantum Computing in Healthcare"
                class="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-900 font-bold focus:bg-white focus:border-primary/20 transition-all outline-none text-xs"
                autofocus
              />
            </div>

            <div class="space-y-2">
              <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest block pl-1">
                Editorial Tone
              </label>
              <select
                value={form.value.tone}
                onChange={(e) => (form.value.tone = (e.target as HTMLSelectElement).value)}
                class="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-900 font-bold focus:bg-white focus:border-primary/20 transition-all outline-none text-xs appearance-none cursor-pointer"
              >
                {tones.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div class="space-y-2">
              <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest block pl-1">
                Target Audience
              </label>
              <input
                type="text"
                value={form.value.audience}
                onInput={(e) => (form.value.audience = (e.target as HTMLInputElement).value)}
                placeholder="Ex: Tech Professionals"
                class="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-900 font-bold focus:bg-white focus:border-primary/20 transition-all outline-none text-xs"
              />
            </div>

            <div class="space-y-2">
              <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest block pl-1">
                Article Goals
              </label>
              <input
                type="text"
                value={form.value.goals}
                onInput={(e) => (form.value.goals = (e.target as HTMLInputElement).value)}
                placeholder="Ex: Educational, SEO"
                class="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-900 font-bold focus:bg-white focus:border-primary/20 transition-all outline-none text-xs"
              />
            </div>

            <div class="space-y-2">
              <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest block pl-1">
                Keywords to Target
              </label>
              <input
                type="text"
                value={form.value.keywords}
                onInput={(e) => (form.value.keywords = (e.target as HTMLInputElement).value)}
                placeholder="Ex: quantum, ai ethics"
                class="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-900 font-bold focus:bg-white focus:border-primary/20 transition-all outline-none text-xs"
              />
            </div>

            <div class="space-y-2 md:col-span-2">
              <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest block pl-1">
                Key Points / Skeleton
              </label>
              <textarea
                value={form.value.keyPoints}
                onInput={(e) => (form.value.keyPoints = (e.target as HTMLTextAreaElement).value)}
                placeholder="- Introduction&#10;- Challenges&#10;- Solutions"
                rows={3}
                class="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-900 font-bold focus:bg-white focus:border-primary/20 transition-all outline-none text-xs resize-none"
              ></textarea>
            </div>
          </div>

          {/* Footer */}
          <div class="p-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={handleCancel}
              class="px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all"
            >
              Cancel
            </button>
            <BaseButton
              onClick={handleConfirm}
              disabled={!form.value.topic.trim()}
              variant="primary"
              class="px-6 py-3 rounded-xl shadow-lg shadow-primary/20 !text-[9px] uppercase tracking-[0.2em] font-black"
            >
              Initialize Generation
            </BaseButton>
          </div>
        </div>
      </div>
    )
  },
})
