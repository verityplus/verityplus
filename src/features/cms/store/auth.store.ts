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
  const isInitialized = ref(false)

  const checkSession = async () => {
    try {
      const { data, error } = await apiClient.GET('/api/v1/auth/me')
      if (data) {
        currentUser.value = data as unknown as CMSUser
        isAuthenticated.value = true
      } else {
        throw error
      }
    } catch (err) {
      isAuthenticated.value = false
      currentUser.value = null
    } finally {
      isInitialized.value = true
    }
  }

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await apiClient.POST('/api/v1/auth/login', {
        body: { username, password }
      });

      if (data) {
        const { user } = data
        isAuthenticated.value = true
        currentUser.value = user as unknown as CMSUser
        return true
      }
      if (error) throw error
      return false
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'The user credentials provided are invalid.'
      await appAlert(msg, 'Authentication Failure')
      return false
    }
  }

  const logout = async () => {
    try {
      await apiClient.POST('/api/v1/auth/logout')
    } catch (e) {
      console.error('Logout error:', e)
    } finally {
      isAuthenticated.value = false
      currentUser.value = null
    }
  }

  return {
    isAuthenticated,
    currentUser,
    isInitialized,
    checkSession,
    login,
    logout,
  }
})
