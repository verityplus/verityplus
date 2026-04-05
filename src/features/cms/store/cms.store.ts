import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CMSUser } from '@/shared/types'

/**
 * CMSStore: Specialized management for administrative actions.
 */
export const useCMSStore = defineStore('cms', () => {
  const currentUser = ref<CMSUser | null>({
    id: 'u-1',
    username: 'admin_verity',
    email: 'admin@verityplus.com',
    password: 'password123',
    role: 'admin',
  })

  const users = ref<CMSUser[]>([
    {
      id: 'u-1',
      username: 'admin_verity',
      email: 'admin@verityplus.com',
      password: 'password123',
      role: 'admin',
    },
    {
      id: 'u-2',
      username: 'editor_jane',
      email: 'jane@verityplus.com',
      password: 'password123',
      role: 'admin',
    },
  ])

  const addUser = (user: CMSUser) => {
    users.value.push({ ...user, role: 'admin' })
  }

  const updateUser = (user: CMSUser) => {
    const idx = users.value.findIndex((u) => u.id === user.id)
    if (idx !== -1) users.value[idx] = user
  }

  const updatePassword = (id: string, newPassword: string) => {
    const user = users.value.find((u) => u.id === id)
    if (user) user.password = newPassword
  }

  const deleteUser = (id: string) => {
    users.value = users.value.filter((u) => u.id !== id)
  }

  return {
    currentUser,
    users,
    addUser,
    updateUser,
    updatePassword,
    deleteUser,
  }
})
