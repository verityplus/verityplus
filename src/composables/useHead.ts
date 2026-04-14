import { createHead, useHead as useUnhead } from '@unhead/vue'
import type { UseHeadInput } from '@unhead/vue'

/**
 * Global head instance for the application.
 */
export const head = createHead()

/**
 * Reactive document head management.
 * Leverages @unhead/vue for robust meta tag and title management.
 */
export function useHead(input: UseHeadInput<any>) {
  return useUnhead(input)
}
