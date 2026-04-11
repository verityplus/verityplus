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
      const result = await apiClient.get<CMSUser[]>('/users')
      return result || []
    },
    initialData: [],
  })

  const users = computed(() => usersData.value || [])

  const addUser = async (user: CMSUser) => {
    const { id: _id, ...input } = user
    await apiClient.post('/users', input)
    queryClient.invalidateQueries({ queryKey: ['cms_users'] })
  }

  const updateUser = async (user: CMSUser) => {
    const { id, username, email, role } = user
    await apiClient.put(`/users/${id}`, { username, email, role })
    queryClient.invalidateQueries({ queryKey: ['cms_users'] })
  }

  const deleteUser = async (id: string) => {
    await apiClient.delete(`/users/${id}`)
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
