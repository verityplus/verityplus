import { defineStore } from 'pinia'
import { ArticleService } from '@/features/article/services/article.service'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type {
  CreateArticleInput,
  UpdateArticleInput,
  CreateCategoryInput,
  UpdateCategoryInput,
  CreateAuthorInput,
  UpdateAuthorInput,
} from '@/shared/types'

/**
 * CMSContentStore: Dedicated store for CMS content mutations.
 * Integrated with GraphQL mutations and Vue Query invalidation.
 */
export const useCMSContentStore = defineStore('cms-content', () => {
  const queryClient = useQueryClient()

  // --- Article Mutations ---
  const createArticleMutation = useMutation({
    mutationFn: (data: CreateArticleInput) => ArticleService.createArticle(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['articles'] }),
  })

  const updateArticleMutation = useMutation({
    mutationFn: (data: UpdateArticleInput) => ArticleService.updateArticle(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['articles'] }),
  })

  const deleteArticleMutation = useMutation({
    mutationFn: (id: number) => ArticleService.deleteArticle(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['articles'] }),
  })

  // --- Category Mutations ---
  const createCategoryMutation = useMutation({
    mutationFn: (data: CreateCategoryInput) => ArticleService.createCategory(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
  })

  const updateCategoryMutation = useMutation({
    mutationFn: (data: UpdateCategoryInput) => ArticleService.updateCategory(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
  })

  const deleteCategoryMutation = useMutation({
    mutationFn: (id: string) => ArticleService.deleteCategory(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
  })

  // --- Author Mutations ---
  const createAuthorMutation = useMutation({
    mutationFn: (data: CreateAuthorInput) => ArticleService.createAuthor(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['authors'] }),
  })

  const updateAuthorMutation = useMutation({
    mutationFn: (data: UpdateAuthorInput) => ArticleService.updateAuthor(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['authors'] }),
  })

  const deleteAuthorMutation = useMutation({
    mutationFn: (id: string) => ArticleService.deleteAuthor(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['authors'] }),
  })

  return {
    // Articles
    addArticle: (data: CreateArticleInput) => createArticleMutation.mutateAsync(data),
    updateArticle: (data: UpdateArticleInput) => updateArticleMutation.mutateAsync(data),
    deleteArticle: (id: number) => deleteArticleMutation.mutateAsync(id),

    // Categories
    addCategory: (data: CreateCategoryInput) => createCategoryMutation.mutateAsync(data),
    updateCategory: (data: UpdateCategoryInput) => updateCategoryMutation.mutateAsync(data),
    deleteCategory: (id: string) => deleteCategoryMutation.mutateAsync(id),

    // Authors
    addAuthor: (data: CreateAuthorInput) => createAuthorMutation.mutateAsync(data),
    updateAuthor: (data: UpdateAuthorInput) => updateAuthorMutation.mutateAsync(data),
    deleteAuthor: (id: string) => deleteAuthorMutation.mutateAsync(id),
  }
})
