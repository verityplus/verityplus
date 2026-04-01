import type { Article, Category, Author } from '@/shared/types'
import { ARTICLES, CATEGORIES, AUTHORS } from '@/data/mock'

/**
 * ArticleService: Unified Data Access Layer
 * Handles all article-related operations with full type safety.
 */
export const ArticleService = {
  /**
   * Fetches all articles.
   */
  async getArticles(): Promise<Article[]> {
    return ARTICLES
  },

  /**
   * Fetches featured articles for the headline carousel.
   */
  async getFeaturedArticles(): Promise<Article[]> {
    return ARTICLES.filter((a) => a.isFeatured)
  },

  /**
   * Fetches latest articles excluding featured ones.
   */
  async getLatestArticles(limit: number = 4): Promise<Article[]> {
    return ARTICLES.filter((a) => !a.isFeatured).slice(0, limit)
  },

  /**
   * Fetches popular articles.
   */
  async getPopularArticles(limit: number = 3): Promise<Article[]> {
    return ARTICLES.filter((a) => a.isPopular || a.isFeatured).slice(0, limit)
  },

  /**
   * Fetches an article by its unique slug.
   */
  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    return ARTICLES.find((a) => a.slug === slug)
  },

  /**
   * Searches for articles based on a query string.
   */
  async searchArticles(query: string): Promise<Article[]> {
    const q = query.toLowerCase().trim()
    if (!q) return []
    return ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q)) ||
        a.category.name.toLowerCase().includes(q)
    )
  },

  /**
   * Fetches all article categories with their article counts.
   */
  async getCategoriesWithCount(): Promise<{ category: Category; count: number }[]> {
    return CATEGORIES.map((c) => ({
      category: c,
      count: ARTICLES.filter((a) => a.category.slug === c.slug).length,
    })).filter((c) => c.count > 0)
  },

  /**
   * Fetches all available categories.
   */
  async getAllCategories(): Promise<Category[]> {
    return CATEGORIES
  },

  /**
   * Fetches all authors.
   */
  async getAllAuthors(): Promise<Author[]> {
    return AUTHORS
  },

  /**
   * Fetches an author by their unique ID.
   */
  async getAuthorById(id: string): Promise<Author | undefined> {
    return AUTHORS.find((a) => a.id === id)
  },

  /**
   * Fetches articles written by a specific author.
   */
  async getArticlesByAuthorId(id: string): Promise<Article[]> {
    return ARTICLES.filter((a) => a.author.id === id)
  }
}
