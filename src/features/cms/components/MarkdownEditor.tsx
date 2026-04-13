import { defineComponent, ref, watch, onBeforeUnmount } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'
import Link from '@tiptap/extension-link'
import { Markdown } from 'tiptap-markdown'
import { appPrompt } from '@/utils/dialog'
import { StorageService } from '@/shared/services/storage.service'
import { resolveAssetUrl } from '@/shared/utils/assets'

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
        const anyStorage = editor.storage as any
        if (anyStorage.markdown) {
          emit('update:modelValue', anyStorage.markdown.getMarkdown())
        }
      },

    })

    watch(
      () => props.modelValue,
      (value) => {
        if (!editor.value) return

        const currentMarkdown = (editor.value.storage as any).markdown?.getMarkdown()
        if (value !== currentMarkdown) {
          editor.value.commands.setContent(value)
        }
      },
    )


    onBeforeUnmount(() => editor.value?.destroy())

    const showImageDialog = ref(false)
    const imageUrl = ref('')

    const handleFileSelect = async (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        try {
          const url = await StorageService.upload(file)
          editor.value?.chain().focus().setImage({ src: resolveAssetUrl(url) }).run()
          showImageDialog.value = false
          imageUrl.value = ''
        } catch (err: unknown) {
          console.error('Markdown image upload failed:', err)
          const msg = err instanceof Error ? err.message : 'Unknown'
          alert(`Failed to upload image: ${msg}`)
        }
      }
    }

    const insertImageUrl = () => {
      if (imageUrl.value) {
        editor.value?.chain().focus().setImage({ src: imageUrl.value }).run()
        showImageDialog.value = false
        imageUrl.value = ''
      }
    }

    const onToolbarYoutube = async () => {
      const url = await appPrompt('Masukkan URL YouTube:', '', 'YouTube URL')
      if (url) editor.value?.chain().focus().setYoutubeVideo({ src: url }).run()
    }

    const onToolbarLink = async () => {
      if (!editor.value) return

      const previousUrl = editor.value.getAttributes('link').href
      const url = await appPrompt('Masukkan URL Link:', previousUrl || '', 'Insert Link')

      if (url === false || url === null) {
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
          action: () => (showImageDialog.value = true),
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
        <div class="pt-4 border-t border-slate-100 min-h-[500px] flex flex-col relative">

          <header class="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
            <div class="flex items-center gap-4">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Content Editor
              </label>


              <div class="flex bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => (activeTab.value = 'visual')}
                  class={[
                    'px-3 py-1 text-[10px] font-bold rounded-md transition border-none cursor-pointer',
                    activeTab.value === 'visual'
                      ? 'bg-white shadow-sm text-primary'
                      : 'text-slate-500 bg-transparent',
                  ]}
                >
                  VISUAL
                </button>
                <button
                  onClick={() => (activeTab.value = 'raw')}
                  class={[
                    'px-3 py-1 text-[10px] font-bold rounded-md transition border-none cursor-pointer',
                    activeTab.value === 'raw'
                      ? 'bg-white shadow-sm text-primary'
                      : 'text-slate-500 bg-transparent',
                  ]}
                >
                  RAW
                </button>
              </div>
            </div>


            {activeTab.value === 'visual' && (
              <div class="flex items-center gap-1 bg-slate-50 p-1 rounded-lg border border-slate-100 overflow-x-auto custom-scrollbar">
                {toolbar.map((tool) => (
                  <button
                    key={tool.name}
                    onClick={tool.action}
                    disabled={props.disabled}
                    title={tool.name}
                    class={[
                      'h-8 min-w-[32px] px-2 rounded flex items-center justify-center transition disabled:opacity-50 border-none cursor-pointer',
                      tool.isActive
                        ? 'bg-white text-primary shadow-sm ring-1 ring-slate-200'
                        : 'text-slate-500 hover:bg-white bg-transparent',
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


          <div class="w-full flex-grow p-4 bg-slate-50/30 rounded-xl border border-transparent focus-within:border-slate-100 focus-within:bg-white transition-all">
            {activeTab.value === 'visual' ? (
              <EditorContent editor={editor.value} />
            ) : (
              <textarea
                value={props.modelValue}
                onInput={(e) => emit('update:modelValue', (e.target as HTMLTextAreaElement).value)}
                disabled={props.disabled}
                placeholder="Write raw markdown here..."
                class="w-full h-full min-h-[400px] bg-transparent font-mono text-sm leading-relaxed outline-none resize-none border-none"
              />
            )}
          </div>


          {showImageDialog.value && (
            <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
              <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all p-6 relative">
                <button
                  onClick={() => (showImageDialog.value = false)}
                  class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 border-none bg-transparent cursor-pointer"
                >
                  <i class="bi bi-x-lg"></i>
                </button>
                <div class="text-center mb-6">
                  <div class="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4 text-xl">
                    <i class="bi bi-image"></i>
                  </div>
                  <h3 class="text-lg font-black text-slate-900">Upload Image</h3>
                  <p class="text-slate-500 text-sm mt-1">Provide a URL or browse an image file.</p>
                </div>

                <div class="space-y-4">
                  <div>
                    <label class="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
                      Image URL
                    </label>
                    <input
                      type="text"
                      value={imageUrl.value}
                      onInput={(e) => (imageUrl.value = (e.target as HTMLInputElement).value)}
                      placeholder="https://..."
                      class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition text-sm transition text-slate-800"
                    />
                  </div>

                  <div class="relative flex py-2 items-center">
                    <div class="flex-grow border-t border-slate-200"></div>
                    <span class="flex-shrink-0 mx-4 text-slate-400 text-xs font-medium uppercase">Or</span>
                    <div class="flex-grow border-t border-slate-200"></div>
                  </div>

                  <div>
                    <label class="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-slate-300 border-dashed rounded-xl appearance-none cursor-pointer hover:border-indigo-400 focus:outline-none">
                      <span class="flex flex-col items-center justify-center text-slate-500">
                        <i class="bi bi-cloud-arrow-up text-2xl mb-2"></i>
                        <span class="font-medium text-sm">Click to select file</span>
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        class="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div class="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => (showImageDialog.value = false)}
                    class="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition border-none cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={insertImageUrl}
                    disabled={!imageUrl.value}
                    class="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed border-none cursor-pointer shadow-lg shadow-indigo-600/20"
                  >
                    Insert Image
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )
    }
  },
})
