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
    const { data, error } = await apiClient.GET('/articles', {
      params: {
        query: {
          search: args.search,
          take: args.take?.toString(),
          skip: args.skip?.toString(),
          categoryId: args.categoryId,
          authorId: args.authorId,
        } as any, // Cast due to internal Zod pollution in OpenAPI spec causing type mismatch
      },
    })

    if (error) {
      console.error('Error fetching articles:', error)
      return []
    }
    return (data as any) || []
  },

  async getArticleById(id: string): Promise<Article | undefined> {
    const { data, error } = await apiClient.GET('/articles/{id}', {
      params: {
        path: { id },
      },
    })

    if (error) {
      console.error(`Error fetching article ${id}:`, error)
      return undefined
    }
    return data as any
  },

  async searchArticles(query: string): Promise<Article[]> {
    return this.getArticles({ search: query })
  },

  async getAllCategories(): Promise<Category[]> {
    const { data, error } = await apiClient.GET('/categories')
    if (error) {
      console.error('Error fetching categories:', error)
      return []
    }
    return (data as any) || []
  },

  async getAllAuthors(): Promise<Author[]> {
    const { data, error } = await apiClient.GET('/authors')
    if (error) {
      console.error('Error fetching authors:', error)
      return []
    }
    return (data as any) || []
  },

  async createArticle(dataInput: CreateArticleInput): Promise<Article> {
    const { data, error } = await apiClient.POST('/articles', {
      body: dataInput as any,
    })

    if (error) {
      console.error('Error creating article:', error)
      throw error
    }
    return data as any
  },

  async updateArticle(dataInput: UpdateArticleInput): Promise<Article> {
    const { id, ...input } = dataInput
    const { data, error } = await apiClient.PUT('/articles/{id}', {
      params: {
        path: { id },
      },
      body: input as any,
    })

    if (error) {
      console.error(`Error updating article ${id}:`, error)
      throw error
    }
    return data as any
  },

  async deleteArticle(id: string): Promise<void> {
    const { error } = await apiClient.DELETE('/articles/{id}', {
      params: {
        path: { id },
      },
    })

    if (error) {
      console.error(`Error deleting article ${id}:`, error)
      throw error
    }
  },

  async createCategory(dataInput: CreateCategoryInput): Promise<Category> {
    const { data, error } = await apiClient.POST('/categories', {
      body: dataInput as any,
    })

    if (error) {
      throw error
    }
    return data as any
  },

  async updateCategory(dataInput: UpdateCategoryInput): Promise<Category> {
    const { id, ...input } = dataInput
    const { data, error } = await apiClient.PUT('/categories/{id}', {
      params: {
        path: { id },
      },
      body: input as any,
    })

    if (error) {
      throw error
    }
    return data as any
  },

  async deleteCategory(id: string): Promise<void> {
    const { error } = await apiClient.DELETE('/categories/{id}', {
      params: {
        path: { id },
      },
    })

    if (error) {
      throw error
    }
  },

  async createAuthor(dataInput: CreateAuthorInput): Promise<Author> {
    const { data, error } = await apiClient.POST('/authors', {
      body: dataInput as any,
    })

    if (error) {
      throw error
    }
    return data as any
  },

  async updateAuthor(dataInput: UpdateAuthorInput): Promise<Author> {
    const { id, ...input } = dataInput
    const { data, error } = await apiClient.PUT('/authors/{id}', {
      params: {
        path: { id },
      },
      body: input as any,
    })

    if (error) {
      throw error
    }
    return data as any
  },

  async deleteAuthor(id: string): Promise<void> {
    const { error } = await apiClient.DELETE('/authors/{id}', {
      params: {
        path: { id },
      },
    })

    if (error) {
      throw error
    }
  },
}
