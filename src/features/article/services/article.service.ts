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
      page?: number
      limit?: number
      categoryId?: string
      authorId?: string
    } = {},
  ): Promise<{ items: Article[]; total: number }> {
    const { data, error } = await apiClient.GET('/api/v1/articles/', {
      params: {
        query: {
          search: args.search,
          skip: args.page && args.limit ? ((args.page - 1) * args.limit).toString() : undefined,
          take: args.limit?.toString(),
          categoryId: args.categoryId,
          authorId: args.authorId,
        },
      },
    })

    if (error) {
      console.error('Error fetching articles:', error)
      return { items: [], total: 0 }
    }
    
    // The backend now returns { items, total }
    return data as { items: Article[]; total: number }
  },

  async getArticleById(id: string): Promise<Article | undefined> {
    const { data, error } = await apiClient.GET('/api/v1/articles/{id}', {
      params: {
        path: { id },
      },
    })

    if (error) {
      console.error(`Error fetching article ${id}:`, error)
      return undefined
    }
    return data as Article
  },

  async searchArticles(query: string): Promise<Article[]> {
    const result = await this.getArticles({ search: query })
    return result.items
  },

  async getAllCategories(): Promise<Category[]> {
    const { data, error } = await apiClient.GET('/api/v1/categories/')
    if (error) {
      console.error('Error fetching categories:', error)
      return []
    }
    return data || []
  },

  async getAllAuthors(): Promise<Author[]> {
    const { data, error } = await apiClient.GET('/api/v1/authors/')
    if (error) {
      console.error('Error fetching authors:', error)
      return []
    }
    return data || []
  },

  async getCategory(idOrSlug: string): Promise<Category | undefined> {
    const { data, error } = await apiClient.GET('/api/v1/categories/{id}', {
      params: { path: { id: idOrSlug } }
    })
    if (error) {
      console.error(`Error fetching category ${idOrSlug}:`, error)
      return undefined
    }
    return data as Category
  },

  async getAuthor(idOrSlug: string): Promise<Author | undefined> {
    const { data, error } = await apiClient.GET('/api/v1/authors/{id}', {
      params: { path: { id: idOrSlug } }
    })
    if (error) {
      console.error(`Error fetching author ${idOrSlug}:`, error)
      return undefined
    }
    return data as Author
  },

  async createArticle(dataInput: CreateArticleInput): Promise<Article> {
    const { data, error } = await apiClient.POST('/api/v1/articles/', {
      body: dataInput,
    })

    if (error) {
      console.error('Error creating article:', error)
      throw error
    }
    return data as Article
  },

  async updateArticle(dataInput: UpdateArticleInput): Promise<Article> {
    const { id, ...input } = dataInput
    const { data, error } = await apiClient.PUT('/api/v1/articles/{id}', {
      params: {
        path: { id },
      },
      body: input,
    })

    if (error) {
      console.error(`Error updating article ${id}:`, error)
      throw error
    }
    return data as Article
  },

  async deleteArticle(id: string): Promise<void> {
    const { error } = await apiClient.DELETE('/api/v1/articles/{id}', {
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
    const { data, error } = await apiClient.POST('/api/v1/categories/', {
      body: dataInput,
    })

    if (error) {
      throw error
    }
    return data as Category
  },

  async updateCategory(dataInput: UpdateCategoryInput): Promise<Category> {
    const { id, ...input } = dataInput
    const { data, error } = await apiClient.PUT('/api/v1/categories/{id}', {
      params: {
        path: { id },
      },
      body: input,
    })

    if (error) {
      throw error
    }
    return data as Category
  },

  async deleteCategory(id: string): Promise<void> {
    const { error } = await apiClient.DELETE('/api/v1/categories/{id}', {
      params: {
        path: { id },
      },
    })

    if (error) {
      throw error
    }
  },

  async createAuthor(dataInput: CreateAuthorInput): Promise<Author> {
    const { data, error } = await apiClient.POST('/api/v1/authors/', {
      body: dataInput,
    })

    if (error) {
      throw error
    }
    return data as Author
  },

  async updateAuthor(dataInput: UpdateAuthorInput): Promise<Author> {
    const { id, ...input } = dataInput
    const { data, error } = await apiClient.PUT('/api/v1/authors/{id}', {
      params: {
        path: { id },
      },
      body: input,
    })

    if (error) {
      throw error
    }
    return data as Author
  },

  async deleteAuthor(id: string): Promise<void> {
    const { error } = await apiClient.DELETE('/api/v1/authors/{id}', {
      params: {
        path: { id },
      },
    })

    if (error) {
      throw error
    }
  },
}
