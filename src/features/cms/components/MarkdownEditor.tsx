import { defineComponent, ref } from 'vue'

/**
 * MarkdownEditor: Reusable markdown editor with toolbar.
 */
export const MarkdownEditor = defineComponent({
  name: 'MarkdownEditor',
  props: {
    /**
     * Markdown content string.
     */
    modelValue: {
      type: String,
      default: '',
    },
    /**
     * Whether the editor is disabled.
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const textareaRef = ref<HTMLTextAreaElement | null>(null)

    const insertMarkdown = (before: string, after: string = '') => {
      const el = textareaRef.value
      if (!el) return

      const start = el.selectionStart
      const end = el.selectionEnd
      const text = props.modelValue || ''
      const selectedText = text.substring(start, end)

      const newText = text.substring(0, start) + before + selectedText + after + text.substring(end)
      emit('update:modelValue', newText)

      setTimeout(() => {
        el.focus()
        const newPos = start + before.length + selectedText.length + after.length
        el.setSelectionRange(newPos, newPos)
      }, 0)
    }

    const onToolbarImageUpload = () => {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0]
        if (file) {
          const url = URL.createObjectURL(file)
          insertMarkdown(`![Image](${url})`)
        }
      }
      input.click()
    }

    const toolbar = [
      { name: 'H2', icon: 'bi-type-h2', action: () => insertMarkdown('## ') },
      { name: 'H3', icon: 'bi-type-h3', action: () => insertMarkdown('### ') },
      { name: 'H4', icon: 'bi-type-h4', action: () => insertMarkdown('#### ') },
      { name: 'H5', icon: 'bi-type-h5', action: () => insertMarkdown('##### ') },
      { name: 'H6', icon: 'bi-type-h6', action: () => insertMarkdown('###### ') },
      { name: 'Bold', icon: 'bi-type-bold', action: () => insertMarkdown('**', '**') },
      { name: 'Italic', icon: 'bi-type-italic', action: () => insertMarkdown('*', '*') },
      { name: 'Underline', icon: 'bi-type-underline', action: () => insertMarkdown('<u>', '</u>') },
      {
        name: 'Strikethrough',
        icon: 'bi-type-strikethrough',
        action: () => insertMarkdown('~~', '~~'),
      },
      { name: 'Code', icon: 'bi-code-slash', action: () => insertMarkdown('```\n', '\n```') },
      { name: 'Image', icon: 'bi-image', action: onToolbarImageUpload },
      { name: 'YouTube', icon: 'bi-youtube', action: () => insertMarkdown('@[youtube](', ')') },
    ]

    return () => (
      <div class="pt-4 border-t border-slate-100 min-h-[500px] flex flex-col">
        <header class="flex items-center justify-between mb-4">
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Long-form Content (Markdown)
          </label>

          {/* Markdown Toolbar */}
          <div class="flex items-center gap-1 bg-slate-50 p-1 rounded-lg border border-slate-100 overflow-x-auto custom-scrollbar">
            {toolbar.map((tool) => (
              <button
                key={tool.name}
                onClick={tool.action}
                title={tool.name}
                class="h-8 min-w-[32px] px-2 rounded flex items-center justify-center text-slate-500 hover:bg-white hover:text-primary hover:shadow-sm transition cursor-pointer font-black text-[10px]"
              >
                {tool.name.startsWith('H') ? (
                  <span class="leading-none uppercase">{tool.name}</span>
                ) : (
                  <i class={['bi', tool.icon]} />
                )}
              </button>
            ))}
          </div>
        </header>

        <textarea
          ref={textareaRef}
          disabled={props.disabled}
          value={props.modelValue || ''}
          onInput={(e) => {
            emit('update:modelValue', (e.target as HTMLTextAreaElement).value)
          }}
          placeholder="Tell your story. Support Markdown (H2, H3, Lists, Links, Bold, Italic)..."
          class="w-full flex-grow p-4 bg-slate-50/30 rounded-xl font-mono text-sm leading-relaxed border border-transparent focus:border-slate-100 focus:bg-white focus:ring-0 outline-none resize-none min-h-[400px]"
        />
      </div>
    )
  },
})
