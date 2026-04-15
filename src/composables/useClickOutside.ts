import { onMounted, onUnmounted, type Ref } from 'vue'

/**
 * Composable to detect clicks outside of specific elements.
 * @param elRefs - The template ref(s) of the element(s) to watch/ignore.
 * @param callback - Function to call when a click occurs outside.
 */
export function useClickOutside(
  elRefs: Ref<HTMLElement | null> | Ref<HTMLElement | null>[],
  callback: () => void
) {
  const handleClickOutside = (event: MouseEvent) => {
    const refs = Array.isArray(elRefs) ? elRefs : [elRefs]
    const isOutside = refs.every((ref) => {
      return ref.value && !ref.value.contains(event.target as Node)
    })

    if (isOutside) {
      callback()
    }
  }

  onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('mousedown', handleClickOutside)
  })
}
