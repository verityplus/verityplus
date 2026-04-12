import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { apiClient } from '@/shared/services/apiClient'
import type { CreateCategoryInput, UpdateCategoryInput } from '@/shared/types'

export function useCategories() {
  const queryClient = useQueryClient()

  const listQuery = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await apiClient.GET('/api/v1/categories/', {})
      if (error) throw error
      return data
    }
  })

  const createMutation = useMutation({
    mutationFn: async (input: CreateCategoryInput) => {
      const { data, error } = await apiClient.POST('/api/v1/categories/', {
        body: input
      })
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    }
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...input }: UpdateCategoryInput) => {
      const { data, error } = await apiClient.PUT('/api/v1/categories/{id}', {
        params: {
          path: { id }
        },
        body: input
      })
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    }
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await apiClient.DELETE('/api/v1/categories/{id}', {
        params: {
          path: { id }
        }
      })
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    }
  })

  return {
    categories: listQuery.data,
    isLoading: listQuery.isLoading,
    error: listQuery.error,
    createCategory: createMutation.mutateAsync,
    updateCategory: updateMutation.mutateAsync,
    deleteCategory: deleteMutation.mutateAsync,
  }
}
