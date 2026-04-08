import { defineStore } from 'pinia'
import { ArticleService } from '@/features/article/services/article.service'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

/**
 * CMSContentStore: Dedicated store for CMS content mutations.
 * Integrated with GraphQL mutations and Vue Query invalidation.
 */
export const useCMSContentStore = defineStore('cms-content', () => {
  const queryClient = useQueryClient()

  // --- Article Mutations ---
  const createArticleMutation = useMutation({
    mutationFn: (data: any) => ArticleService.createArticle(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['articles'] }),
  })

  const updateArticleMutation = useMutation({
    mutationFn: (data: any) => ArticleService.updateArticle(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['articles'] }),
  })

  const deleteArticleMutation = useMutation({
    mutationFn: (id: number) => ArticleService.deleteArticle(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['articles'] }),
  })

  // --- Category Mutations ---
  const createCategoryMutation = useMutation({
    mutationFn: (data: any) => ArticleService.createCategory(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
  })

  const updateCategoryMutation = useMutation({
    mutationFn: (data: any) => ArticleService.updateCategory(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
  })

  const deleteCategoryMutation = useMutation({
    mutationFn: (id: string) => ArticleService.deleteCategory(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
  })

  // --- Author Mutations ---
  const createAuthorMutation = useMutation({
    mutationFn: (data: any) => ArticleService.createAuthor(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['authors'] }),
  })

  const updateAuthorMutation = useMutation({
    mutationFn: (data: any) => ArticleService.updateAuthor(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['authors'] }),
  })

  const deleteAuthorMutation = useMutation({
    mutationFn: (id: string) => ArticleService.deleteAuthor(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['authors'] }),
  })

  return {
    // Articles
    addArticle: (data: any) => createArticleMutation.mutateAsync(data),
    updateArticle: (data: any) => updateArticleMutation.mutateAsync(data),
    deleteArticle: (id: number) => deleteArticleMutation.mutateAsync(id),

    // Categories
    addCategory: (data: any) => createCategoryMutation.mutateAsync(data),
    updateCategory: (data: any) => updateCategoryMutation.mutateAsync(data),
    deleteCategory: (id: string) => deleteCategoryMutation.mutateAsync(id),

    // Authors
    addAuthor: (data: any) => createAuthorMutation.mutateAsync(data),
    updateAuthor: (data: any) => updateAuthorMutation.mutateAsync(data),
    deleteAuthor: (id: string) => deleteAuthorMutation.mutateAsync(id),
  }
})
