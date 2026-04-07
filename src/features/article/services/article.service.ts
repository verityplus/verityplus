import type { Article, Category, Author } from '@/shared/types'
import { ARTICLES, CATEGORIES, AUTHORS } from '@/data/mock'

/**
 * Simulates a network delay for async operations.
 * @param ms - Milliseconds to delay (default: 100ms)
 */
const simulateNetworkDelay = (ms: number = 100): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

/**
 * ArticleService: Unified Data Access Layer
 * Handles all article-related operations with full type safety.
 * Note: Currently uses mock data. Replace with API calls when backend is ready.
 */
export const ArticleService = {
  /**
   * Fetches all articles.
   * @returns Promise resolving to array of articles
   */
  async getArticles(): Promise<Article[]> {
    await simulateNetworkDelay()
    return ARTICLES
  },

  /**
   * Fetches an article by its unique slug.
   * @param slug - The article's unique URL slug
   * @returns Promise resolving to the article or undefined if not found
   */
  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    await simulateNetworkDelay()
    return ARTICLES.find((a) => a.slug === slug)
  },

  /**
   * Searches for articles based on a query string.
   * Searches across title, excerpt, tags, and category name.
   * @param query - The search query string
   * @returns Promise resolving to array of matching articles
   */
  async searchArticles(query: string): Promise<Article[]> {
    await simulateNetworkDelay()
    const q = query.toLowerCase().trim()
    if (!q) return []
    return ARTICLES.filter(
      (a) =>
        [a.titleId, a.titleEn, a.titleZh].some((title) => title && title.toLowerCase().includes(q)) ||
        [a.excerptId, a.excerptEn, a.excerptZh].some((excerpt) => excerpt && excerpt.toLowerCase().includes(q)) ||
        [...(a.tagsId || []), ...(a.tagsEn || []), ...(a.tagsZh || [])].some((t) =>
          t.toLowerCase().includes(q),
        ) ||
        [a.category.nameId, a.category.nameEn, a.category.nameZh].some(
          (name) => name && name.toLowerCase().includes(q)
        ),
    )
  },

  /**
   * Fetches all available categories.
   * @returns Promise resolving to array of categories
   */
  async getAllCategories(): Promise<Category[]> {
    await simulateNetworkDelay()
    return CATEGORIES
  },

  /**
   * Fetches all authors.
   * @returns Promise resolving to array of authors
   */
  async getAllAuthors(): Promise<Author[]> {
    await simulateNetworkDelay()
    return AUTHORS
  },
}
