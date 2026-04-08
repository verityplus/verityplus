import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CMSUser } from '@/shared/types'
import { useCMSStore } from './cms.store'

/**
 * AuthStore: Manages authentication state for CMS access.
 */
export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const currentUser = ref<CMSUser | null>(null)

  const cmsStore = useCMSStore()

  const login = (username: string, password: string): boolean => {
    const user = cmsStore.users.find((u) => u.username === username && u.password === password)
    if (user) {
      isAuthenticated.value = true
      currentUser.value = user
      return true
    }
    return false
  }

  const logout = () => {
    isAuthenticated.value = false
    currentUser.value = null
  }

  return {
    isAuthenticated,
    currentUser,
    login,
    logout,
  }
})
