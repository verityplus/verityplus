import { createVNode, render, defineComponent, ref, onMounted } from 'vue'
import { BaseButton } from '@/components/ui/Button'

type DialogType = 'alert' | 'confirm' | 'prompt'

interface DialogOptions {
  type: DialogType
  title?: string
  message: string
  defaultValue?: string
  onResolve: (value: any) => void
  onClose: () => void
}

const DialogComponent = defineComponent({
  name: 'DialogComponent',
  props: {
    options: {
      type: Object as () => DialogOptions,
      required: true,
    },
  },
  setup(props) {
    const isVisible = ref(false)
    const inputValue = ref(props.options.defaultValue || '')

    // For animation
    onMounted(() => {
      // small delay to allow transition
      setTimeout(() => {
        isVisible.value = true
      }, 10)
    })

    const close = (value: any) => {
      isVisible.value = false
      setTimeout(() => {
        props.options.onResolve(value)
        props.options.onClose()
      }, 300) // matching transition duration
    }

    const handleConfirm = () => {
      if (props.options.type === 'prompt') {
        close(inputValue.value)
      } else {
        close(true)
      }
    }

    const handleCancel = () => {
      if (props.options.type === 'alert') {
        close(undefined)
      } else {
        close(false) // confirm returns false, prompt can return null/false
      }
    }

    return () => (
      <div
        class={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-300 ${
          isVisible.value ? 'opacity-100 backdrop-blur-sm bg-slate-900/40' : 'opacity-0 bg-transparent'
        }`}
      >
        <div
          class={`bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-sm w-full mx-4 overflow-hidden transform transition-all duration-300 ${
            isVisible.value ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
          }`}
        >
          <div class="p-6">
            {props.options.title && (
              <h3 class="text-xl font-black text-slate-900 mb-2">
                {props.options.title}
              </h3>
            )}
            <p class="text-slate-600 text-sm font-medium mb-6">
              {props.options.message}
            </p>

            {props.options.type === 'prompt' && (
              <div class="mb-6">
                <input
                  type="text"
                  value={inputValue.value}
                  onInput={(e) => (inputValue.value = (e.target as HTMLInputElement).value)}
                  class="w-full text-base font-medium p-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-xl outline-none text-slate-900 transition"
                  autofocus
                  onKeydown={(e) => {
                    if (e.key === 'Enter') handleConfirm()
                    if (e.key === 'Escape') handleCancel()
                  }}
                />
              </div>
            )}

            <div class="flex items-center justify-end gap-3 mt-2">
              {props.options.type !== 'alert' && (
                <button
                  onClick={handleCancel}
                  class="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
              )}
              <BaseButton
                variant={['confirm', 'alert'].includes(props.options.type) ? 'primary' : 'primary'}
                onClick={handleConfirm}
                class="px-6 py-2.5 shadow-lg shadow-indigo-500/20"
              >
                {props.options.type === 'alert' ? 'OK' : 'Confirm'}
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    )
  },
})

export const appAlert = (message: string, title?: string): Promise<void> => {
  return new Promise((resolve) => {
    mountDialog({ type: 'alert', message, title, onResolve: resolve })
  })
}

export const appConfirm = (message: string, title?: string): Promise<boolean> => {
  return new Promise((resolve) => {
    mountDialog({ type: 'confirm', message, title, onResolve: resolve })
  })
}

export const appPrompt = (message: string, defaultValue?: string, title?: string): Promise<string | false> => {
  return new Promise((resolve) => {
    mountDialog({ type: 'prompt', message, defaultValue, title, onResolve: resolve })
  })
}

function mountDialog(options: Omit<DialogOptions, 'onClose'>) {
  const div = document.createElement('div')
  document.body.appendChild(div)

  const onClose = () => {
    render(null, div)
    div.remove()
  }

  const vnode = createVNode(DialogComponent, {
    options: {
      ...options,
      onClose,
    },
  })

  // Inherit context if needed, but not strictly required for this self-contained ui
  render(vnode, div)
}
