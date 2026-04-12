import { defineStore } from 'pinia'
import { computed } from 'vue'
import type { CMSUser } from '@/shared/types'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { apiClient } from '@/shared/services/apiClient'

/**
 * CMSStore: Specialized management for administrative actions.
 */
export const useCMSStore = defineStore('cms', () => {
  const queryClient = useQueryClient()

  const {
    data: usersData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['cms_users'],
    queryFn: async () => {
      const { data } = await apiClient.GET('/api/v1/auth/users')
      return (data as any as CMSUser[]) || []
    },
    initialData: [],
  })

  const users = computed(() => usersData.value || [])

  const addUser = async (user: CMSUser) => {
    const { id: _id, ...input } = user
    await apiClient.POST('/api/v1/auth/users', {
      body: input as any
    })
    queryClient.invalidateQueries({ queryKey: ['cms_users'] })
  }

  const updateUser = async (user: CMSUser) => {
    const { id, username, email } = user
    await (apiClient as any).PUT('/api/v1/auth/users/{id}', {
      params: { path: { id } },
      body: { username, email }
    })
    queryClient.invalidateQueries({ queryKey: ['cms_users'] })
  }

  const deleteUser = async (id: string) => {
    await apiClient.DELETE('/api/v1/auth/users/{id}', {
      params: {
        path: { id }
      }
    })
    queryClient.invalidateQueries({ queryKey: ['cms_users'] })
  }

  return {
    users,
    isLoading,
    addUser,
    updateUser,
    deleteUser,
    refetch,
  }
})
