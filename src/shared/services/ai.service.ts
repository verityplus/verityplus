import { apiClient } from './apiClient'

/**
 * Frontend Service: AIService
 * Communicates with the backend AI endpoints.
 */
export const AIService = {
  async translate(text: string, targetLang: 'en' | 'zh' | 'id') {
    const { data, error } = await apiClient.POST('/api/v1/ai/translate', {
      body: { text, targetLang },
    } as any)

    if (error) throw error
    return data as { translated: string }
  },

  async generateExcerpt(content: string) {
    const { data, error } = await apiClient.POST('/api/v1/ai/excerpt', {
      body: { content },
    } as any)

    if (error) throw error
    return data as { excerpt: string }
  },

  async draft(topic: string) {
    const { data, error } = await apiClient.POST('/api/v1/ai/draft', {
      body: { topic },
    } as any)

    if (error) throw error
    return data as {
      title: string
      content: string
      excerpt: string
      tags: string
    }
  },
}
