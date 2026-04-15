import { createVNode, render } from 'vue'
import { AIDraftModal, type AIDraftOptions } from '../components/AIDraftModal'

/**
 * Specialized dialog for AI Drafting.
 * Mounts the AIDraftModal imperatively to the document body.
 */
export const appAIDraftPrompt = (): Promise<AIDraftOptions | false> => {
  return new Promise((resolve) => {
    const div = document.createElement('div')
    document.body.appendChild(div)

    const onClose = () => {
      render(null, div)
      div.remove()
    }

    const onConfirm = (options: AIDraftOptions) => {
      resolve(options)
      onClose()
    }

    const onCancel = () => {
      resolve(false)
      onClose()
    }

    const vnode = createVNode(AIDraftModal, {
      onConfirm,
      onCancel,
    })

    render(vnode, div)
  })
}
