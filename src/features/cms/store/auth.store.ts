import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CMSUser } from '@/shared/types'
import { apiClient } from '@/shared/services/apiClient'
import { appAlert } from '@/utils/dialog'

/**
 * AuthStore: Manages authentication state for CMS access.
 * Refactored to use standard REST JWT-based authentication.
 */
export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(!!localStorage.getItem('verity_token'))
  const currentUser = ref<CMSUser | null>(null)

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const result = await apiClient.post<{ token: string; user: CMSUser }>('/auth/login', {
        username,
        password,
      });

      if (result) {
        const { token, user } = result
        localStorage.setItem('verity_token', token)
        isAuthenticated.value = true
        currentUser.value = user
        return true
      }
      return false
    } catch (err: any) {
      await appAlert(err.message || 'The user credentials provided are invalid.', 'Authentication Failure')
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('verity_token')
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
