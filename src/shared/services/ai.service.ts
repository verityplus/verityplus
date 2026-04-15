import { apiClient } from './apiClient'

/**
 * Frontend Service: AIService
 * Communicates with the backend AI endpoints.
 */
export const AIService = {
  async translate(text: string, targetLang: 'en' | 'zh' | 'id') {
    const { data, error } = await apiClient.POST('/api/v1/ai/translate', {
      body: { text, targetLang },
    })

    if (error) throw error
    return data
  },

  async generateExcerpt(content: string) {
    const { data, error } = await apiClient.POST('/api/v1/ai/excerpt', {
      body: { content },
    })

    if (error) throw error
    return data
  },

  async draft(options: {
    topic: string
    tone?: string
    audience?: string
    keyPoints?: string
    goals?: string
    keywords?: string
  }) {
    const { data, error } = await apiClient.POST('/api/v1/ai/draft', {
      body: options,
    })

    if (error) throw error
    return data
  },

  async generateSlug(title: string) {
    const { data, error } = await apiClient.POST('/api/v1/ai/slug', {
      body: { title },
    })

    if (error) throw error
    return data
  },
}
