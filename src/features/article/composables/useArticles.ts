import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { apiClient } from '@/shared/services/apiClient'

export function useArticles(filters: { categoryId?: string; authorId?: string; take?: number; skip?: number } = {}) {
  const queryClient = useQueryClient()

  const listQuery = useQuery({
    queryKey: ['articles', filters],
    queryFn: async () => {
      const { data, error } = await apiClient.get('/api/v1/articles/', {
        params: {
          query: {
            categoryId: filters.categoryId,
            authorId: filters.authorId,
            take: filters.take?.toString(),
            skip: filters.skip?.toString(),
          }
        }
      })
      if (error) throw error
      return data
    }
  })

  const getArticle = (id: string) => useQuery({
    queryKey: ['articles', id],
    queryFn: async () => {
      const { data, error } = await apiClient.get('/api/v1/articles/{id}', {
        params: {
          path: { id }
        }
      })
      if (error) throw error
      return data
    },
    enabled: !!id
  })

  const createMutation = useMutation({
    mutationFn: async (input: any) => {
      const { data, error } = await apiClient.post('/api/v1/articles/', {
        body: input
      })
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    }
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...input }: { id: string } & any) => {
      const { data, error } = await apiClient.put('/api/v1/articles/{id}', {
        params: {
          path: { id }
        },
        body: input
      })
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    }
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await apiClient.delete('/api/v1/articles/{id}', {
        params: {
          path: { id }
        }
      })
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    }
  })

  return {
    articles: listQuery.data,
    isLoading: listQuery.isLoading,
    error: listQuery.error,
    refetch: listQuery.refetch,
    getArticle,
    createArticle: createMutation.mutateAsync,
    updateArticle: updateMutation.mutateAsync,
    deleteArticle: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}
