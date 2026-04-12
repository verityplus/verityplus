import { createUnhead } from '@unhead/vue'
import { watch, type Ref, type ComputedRef, isRef } from 'vue'

/**
 * Global head instance for the application.
 * Triggering HMR reload.
 */
export const head = createUnhead()

type MaybeRef<T> = T | Ref<T> | ComputedRef<T>

function unwrap<T>(val: MaybeRef<T>): T {
  return isRef(val) ? val.value : val
}

/**
 * Reactive document head management.
 * Watches reactive inputs and updates document head accordingly.
 */
export function useHead(input: Record<string, MaybeRef<unknown> | MaybeRef<unknown>[]>) {
  const setTitle = () => {
    const title = input.title
    if (title !== undefined) {
      document.title = String(unwrap(title as MaybeRef<string>))
    }
  }

  const setMeta = () => {
    const meta = input.meta
    if (Array.isArray(meta)) {
      for (const m of meta) {
        const obj = unwrap(m as MaybeRef<Record<string, string>>)
        if (obj.name) {
          let el = document.querySelector(`meta[name="${obj.name}"]`)
          if (!el) {
            el = document.createElement('meta')
            el.setAttribute('name', obj.name)
            document.head.appendChild(el)
          }
          el.setAttribute('content', obj.content || '')
        }
        if (obj.property) {
          let el = document.querySelector(`meta[property="${obj.property}"]`)
          if (!el) {
            el = document.createElement('meta')
            el.setAttribute('property', obj.property)
            document.head.appendChild(el)
          }
          el.setAttribute('content', obj.content || '')
        }
      }
    }
  }

  const refsToWatch: (Ref<unknown> | ComputedRef<unknown>)[] = []

  // Collect refs to watch (existing logic)
  if (isRef(input.title)) {
    refsToWatch.push(input.title as Ref<unknown> | ComputedRef<unknown>)
  }
  
  if (Array.isArray(input.meta)) {
    for (const m of input.meta) {
      if (isRef(m)) {
        refsToWatch.push(m as Ref<unknown> | ComputedRef<unknown>)
      } else if (typeof m === 'object' && m !== null) {
        for (const key of Object.keys(m)) {
          const v = (m as Record<string, unknown>)[key]
          if (isRef(v)) {
            refsToWatch.push(v as Ref<unknown> | ComputedRef<unknown>)
          }
        }
      }
    }
  }

  setTitle()
  setMeta()

  if (refsToWatch.length > 0) {
    watch(refsToWatch, () => {
      setTitle()
      setMeta()
    })
  }
}
