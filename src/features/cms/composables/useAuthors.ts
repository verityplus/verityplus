import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { apiClient } from '@/shared/services/apiClient'
import type { CreateAuthorInput, UpdateAuthorInput } from '@/shared/types'

export function useAuthors() {
  const queryClient = useQueryClient()

  const listQuery = useQuery({
    queryKey: ['authors'],
    queryFn: async () => {
      const { data, error } = await apiClient.GET('/api/v1/authors/', {})
      if (error) throw error
      return data
    }
  })

  const createMutation = useMutation({
    mutationFn: async (input: CreateAuthorInput) => {
      const { data, error } = await apiClient.POST('/api/v1/authors/', {
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
    mutationFn: async ({ id, ...input }: UpdateAuthorInput) => {
      const { data, error } = await apiClient.PUT('/api/v1/authors/{id}', {
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
      const { error } = await apiClient.DELETE('/api/v1/authors/{id}', {
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
