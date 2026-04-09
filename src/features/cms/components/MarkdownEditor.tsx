import { defineComponent, ref, watch, onBeforeUnmount } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'
import Link from '@tiptap/extension-link'
import { Markdown } from 'tiptap-markdown'

export const MarkdownEditor = defineComponent({
  name: 'MarkdownEditor',
  props: {
    modelValue: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const activeTab = ref<'visual' | 'raw'>('visual')

    const editor = useEditor({
      extensions: [
        StarterKit,
        Underline,
        Image,
        Youtube,
        Markdown,

        Link.configure({
          openOnClick: false,
          autolink: true,
        }),
      ],
      content: props.modelValue,
      editable: !props.disabled,
      editorProps: {
        attributes: {
          class:
            'prose prose-sm sm:prose-base max-w-none w-full min-h-[400px] focus:outline-none prose-headings:font-bold prose-a:text-primary',
        },
      },
      onUpdate: ({ editor }) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        emit('update:modelValue', (editor.storage as any).markdown.getMarkdown())
      },
    })

    watch(
      () => props.modelValue,
      (value) => {
        if (!editor.value) return
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const isSame = (editor.value.storage as any).markdown.getMarkdown() === value
        if (!isSame) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          editor.value.commands.setContent(value, false as any)
        }
      },
    )

    onBeforeUnmount(() => editor.value?.destroy())

    const onToolbarImageUpload = () => {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0]
        if (file) {
          const url = URL.createObjectURL(file)
          editor.value?.chain().focus().setImage({ src: url }).run()
        }
      }
      input.click()
    }

    const onToolbarYoutube = () => {
      const url = prompt('Masukkan URL YouTube:')
      if (url) editor.value?.chain().focus().setYoutubeVideo({ src: url }).run()
    }

    const onToolbarLink = () => {
      if (!editor.value) return

      const previousUrl = editor.value.getAttributes('link').href
      const url = window.prompt('Masukkan URL Link:', previousUrl || '')

      if (url === null) {
        return
      }

      if (url === '') {
        editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
        return
      }

      editor.value.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }

    return () => {
      if (!editor.value) return null

      const toolbar = [
        {
          name: 'H2',
          icon: 'bi-type-h2',
          action: () => editor.value?.chain().focus().toggleHeading({ level: 2 }).run(),
          isActive: editor.value.isActive('heading', { level: 2 }),
        },
        {
          name: 'H3',
          icon: 'bi-type-h3',
          action: () => editor.value?.chain().focus().toggleHeading({ level: 3 }).run(),
          isActive: editor.value.isActive('heading', { level: 3 }),
        },
        {
          name: 'Bold',
          icon: 'bi-type-bold',
          action: () => editor.value?.chain().focus().toggleBold().run(),
          isActive: editor.value.isActive('bold'),
        },
        {
          name: 'Italic',
          icon: 'bi-type-italic',
          action: () => editor.value?.chain().focus().toggleItalic().run(),
          isActive: editor.value.isActive('italic'),
        },
        {
          name: 'Underline',
          icon: 'bi-type-underline',
          action: () => editor.value?.chain().focus().toggleUnderline().run(),
          isActive: editor.value.isActive('underline'),
        },
        {
          name: 'Code',
          icon: 'bi-code-slash',
          action: () => editor.value?.chain().focus().toggleCodeBlock().run(),
          isActive: editor.value.isActive('codeBlock'),
        },

        {
          name: 'Link',
          icon: 'bi-link-45deg',
          action: onToolbarLink,
          isActive: editor.value.isActive('link'),
        },
        {
          name: 'Image',
          icon: 'bi-image',
          action: onToolbarImageUpload,
          isActive: false,
        },
        {
          name: 'YouTube',
          icon: 'bi-youtube',
          action: onToolbarYoutube,
          isActive: editor.value.isActive('youtube'),
        },
      ]

      return (
        <div class="pt-4 border-t border-slate-100 min-h-[500px] flex flex-col">
          {/* Header & Tab Switcher */}
          <header class="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
            <div class="flex items-center gap-4">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Content Editor
              </label>

              {/* Tabs */}
              <div class="flex bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => (activeTab.value = 'visual')}
                  class={[
                    'px-3 py-1 text-[10px] font-bold rounded-md transition',
                    activeTab.value === 'visual'
                      ? 'bg-white shadow-sm text-primary'
                      : 'text-slate-500',
                  ]}
                >
                  VISUAL
                </button>
                <button
                  onClick={() => (activeTab.value = 'raw')}
                  class={[
                    'px-3 py-1 text-[10px] font-bold rounded-md transition',
                    activeTab.value === 'raw'
                      ? 'bg-white shadow-sm text-primary'
                      : 'text-slate-500',
                  ]}
                >
                  RAW
                </button>
              </div>
            </div>

            {/* Toolbar - Hanya tampil di mode Editor */}
            {activeTab.value === 'visual' && (
              <div class="flex items-center gap-1 bg-slate-50 p-1 rounded-lg border border-slate-100 overflow-x-auto custom-scrollbar">
                {toolbar.map((tool) => (
                  <button
                    key={tool.name}
                    onClick={tool.action}
                    disabled={props.disabled}
                    title={tool.name}
                    class={[
                      'h-8 min-w-[32px] px-2 rounded flex items-center justify-center transition disabled:opacity-50',
                      tool.isActive
                        ? 'bg-white text-primary shadow-sm ring-1 ring-slate-200'
                        : 'text-slate-500 hover:bg-white',
                    ]}
                  >
                    {tool.name.startsWith('H') ? (
                      <span class="text-[10px] font-black">{tool.name}</span>
                    ) : (
                      <i class={['bi', tool.icon]} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </header>

          {/* Main Content Area */}
          <div class="w-full flex-grow p-4 bg-slate-50/30 rounded-xl border border-transparent focus-within:border-slate-100 focus-within:bg-white transition-all">
            {activeTab.value === 'visual' ? (
              <EditorContent editor={editor.value} />
            ) : (
              <textarea
                value={props.modelValue}
                onInput={(e) => emit('update:modelValue', (e.target as HTMLTextAreaElement).value)}
                disabled={props.disabled}
                placeholder="Write raw markdown here..."
                class="w-full h-full min-h-[400px] bg-transparent font-mono text-sm leading-relaxed outline-none resize-none"
              />
            )}
          </div>
        </div>
      )
    }
  },
})
