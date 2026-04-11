import type {
  Article,
  Category,
  Author,
  CreateArticleInput,
  UpdateArticleInput,
  CreateCategoryInput,
  UpdateCategoryInput,
  CreateAuthorInput,
  UpdateAuthorInput,
} from '@/shared/types'
import { apiClient } from '@/shared/services/apiClient'

/**
 * ArticleService: Unified Data Access Layer
 * Refactored to use standard REST API via apiClient.
 */
export const ArticleService = {
  async getArticles(
    args: {
      search?: string
      take?: number
      skip?: number
      categoryId?: string
      authorId?: string
    } = {},
  ): Promise<Article[]> {
    const params = new URLSearchParams()
    if (args.search) params.append('search', args.search)
    if (args.take) params.append('take', args.take.toString())
    if (args.skip) params.append('skip', args.skip.toString())
    if (args.categoryId) params.append('categoryId', args.categoryId)
    if (args.authorId) params.append('authorId', args.authorId)

    const queryStr = params.toString()
    const endpoint = `/articles${queryStr ? '?' + queryStr : ''}`
    
    const result = await apiClient.get<Article[]>(endpoint)
    return result || []
  },

  async getArticleById(id: string): Promise<Article | undefined> {
    const result = await apiClient.get<Article>(`/articles/${id}`)
    return result || undefined
  },

  async searchArticles(query: string): Promise<Article[]> {
    return this.getArticles({ search: query })
  },

  async getAllCategories(): Promise<Category[]> {
    const result = await apiClient.get<Category[]>('/categories')
    return result || []
  },

  async getAllAuthors(): Promise<Author[]> {
    const result = await apiClient.get<Author[]>('/authors')
    return result || []
  },

  async createArticle(data: CreateArticleInput): Promise<Article> {
    console.log('Creating article with input:', data)
    const result = await apiClient.post<Article>('/articles', data)
    return result
  },

  async updateArticle(data: UpdateArticleInput): Promise<Article> {
    const { id, ...input } = data
    const result = await apiClient.put<Article>(`/articles/${id}`, input)
    return result
  },

  async deleteArticle(id: string): Promise<void> {
    await apiClient.delete(`/articles/${id}`)
  },

  async createCategory(data: CreateCategoryInput): Promise<Category> {
    const result = await apiClient.post<Category>('/categories', data)
    return result
  },

  async updateCategory(data: UpdateCategoryInput): Promise<Category> {
    const { id, ...input } = data
    const result = await apiClient.put<Category>(`/categories/${id}`, input)
    return result
  },

  async deleteCategory(id: string): Promise<void> {
    await apiClient.delete(`/categories/${id}`)
  },

  async createAuthor(data: CreateAuthorInput): Promise<Author> {
    const result = await apiClient.post<Author>('/authors', data)
    return result
  },

  async updateAuthor(data: UpdateAuthorInput): Promise<Author> {
    const { id, ...input } = data
    const result = await apiClient.put<Author>(`/authors/${id}`, input)
    return result
  },

  async deleteAuthor(id: string): Promise<void> {
    await apiClient.delete(`/authors/${id}`)
  },
}
