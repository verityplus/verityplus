import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { apiClient } from '@/shared/services/apiClient'

export function useAuthors() {
  const queryClient = useQueryClient()

  const listQuery = useQuery({
    queryKey: ['authors'],
    queryFn: async () => {
      const { data, error } = await apiClient.get('/api/v1/authors/', {})
      if (error) throw error
      return data
    }
  })

  const createMutation = useMutation({
    mutationFn: async (input: any) => {
      const { data, error } = await apiClient.post('/api/v1/authors/', {
        body: input
      })
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authors'] })
    }
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...input }: { id: string } & any) => {
      const { data, error } = await apiClient.put('/api/v1/authors/{id}', {
        params: {
          path: { id }
        },
        body: input
      })
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authors'] })
    }
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await apiClient.delete('/api/v1/authors/{id}', {
        params: {
          path: { id }
        }
      })
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authors'] })
    }
  })

  return {
    authors: listQuery.data,
    isLoading: listQuery.isLoading,
    error: listQuery.error,
    createAuthor: createMutation.mutateAsync,
    updateAuthor: updateMutation.mutateAsync,
    deleteAuthor: deleteMutation.mutateAsync,
  }
}
