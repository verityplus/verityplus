import { useHead as useUnhead } from '@unhead/vue'
import { createHead } from '@unhead/vue/client'
import type { UseHeadInput } from '@unhead/vue'

/**
 * Global head instance for the application.
 */
export const head = createHead()

/**
 * Reactive document head management.
 * Leverages @unhead/vue for robust meta tag and title management.
 */
export function useHead<T extends object>(input: UseHeadInput<T>) {
  return useUnhead(input)
}
