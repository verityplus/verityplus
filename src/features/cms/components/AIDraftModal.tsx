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
          class={`bg-white/90 backdrop-blur-md rounded-[2.5rem] shadow-[0_32px_128px_rgba(0,0,0,0.3)] border border-white/20 max-w-2xl w-full overflow-hidden transform transition-all duration-500 ease-out-back ${
            isVisible.value ? 'scale-100 translate-y-0' : 'scale-90 translate-y-12'
          }`}
        >
          {/* Header */}
          <div class="relative p-8 pb-0">
            <div class="absolute top-0 right-0 p-8">
               <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                  <i class="bi bi-robot text-primary text-2xl"></i>
               </div>
            </div>
            <h2 class="text-3xl font-black text-slate-900 tracking-tight mb-1">
              AI Content <span class="text-primary italic">Architect</span>
            </h2>
            <p class="text-slate-400 text-xs font-black uppercase tracking-[0.2em] mb-8">
              Premium Article Drafting Engine
            </p>
          </div>

          {/* Body */}
          <div class="p-8 pt-0 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto max-h-[70vh] custom-scrollbar">
            <div class="space-y-4 md:col-span-2">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block pl-1">
                Primary Topic / Headline Focus
              </label>
              <input
                type="text"
                value={form.value.topic}
                onInput={(e) => (form.value.topic = (e.target as HTMLInputElement).value)}
                placeholder="Ex: The Future of Quantum Computing in Healthcare"
                class="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-900 font-bold focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-sm"
                autofocus
              />
            </div>

            <div class="space-y-4">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block pl-1">
                Editorial Tone
              </label>
              <select
                value={form.value.tone}
                onChange={(e) => (form.value.tone = (e.target as HTMLSelectElement).value)}
                class="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-900 font-bold focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-sm appearance-none cursor-pointer"
              >
                {tones.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div class="space-y-4">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block pl-1">
                Target Audience
              </label>
              <input
                type="text"
                value={form.value.audience}
                onInput={(e) => (form.value.audience = (e.target as HTMLInputElement).value)}
                placeholder="Ex: Tech Professionals, Medical Experts"
                class="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-900 font-bold focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-sm"
              />
            </div>

            <div class="space-y-4">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block pl-1">
                Article Goals
              </label>
              <input
                type="text"
                value={form.value.goals}
                onInput={(e) => (form.value.goals = (e.target as HTMLInputElement).value)}
                placeholder="Ex: Educational, SEO-driven, Lead Generation"
                class="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-900 font-bold focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-sm"
              />
            </div>

            <div class="space-y-4">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block pl-1">
                Keywords to Target
              </label>
              <input
                type="text"
                value={form.value.keywords}
                onInput={(e) => (form.value.keywords = (e.target as HTMLInputElement).value)}
                placeholder="Ex: quantum, healthcare, ai ethics"
                class="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-900 font-bold focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-sm"
              />
            </div>

            <div class="space-y-4 md:col-span-2">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block pl-1">
                Key Points / Skeleton (One per line)
              </label>
              <textarea
                value={form.value.keyPoints}
                onInput={(e) => (form.value.keyPoints = (e.target as HTMLTextAreaElement).value)}
                placeholder="- Introduction to Quantum Tech&#10;- Current Challenges in Medicine&#10;- Solutions provided by AI integration"
                rows={4}
                class="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-900 font-bold focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-sm resize-none"
              ></textarea>
            </div>
          </div>

          {/* Footer */}
          <div class="p-8 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={handleCancel}
              class="px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
            >
              Discard Request
            </button>
            <BaseButton
              onClick={handleConfirm}
              disabled={!form.value.topic.trim()}
              variant="primary"
              class="px-8 py-4 rounded-2xl shadow-[0_8px_24px_rgba(var(--color-primary-rgb),0.3)] !text-[10px] uppercase tracking-[0.2em] font-black"
            >
              Initialize Generation
            </BaseButton>
          </div>
        </div>
      </div>
    )
  },
})
