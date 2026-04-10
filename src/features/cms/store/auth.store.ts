import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CMSUser } from '@/shared/types'
import { apolloClient } from '@/shared/services/apollo'
import { gql } from '@apollo/client/core'
import { appAlert } from '@/utils/dialog'

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
        email
        role
      }
    }
  }
`

/**
 * AuthStore: Manages authentication state for CMS access.
 * Refactored to use GraphQL JWT-based authentication.
 */
export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(!!localStorage.getItem('verity_token'))
  const currentUser = ref<CMSUser | null>(null)

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const result = await apolloClient.mutate<{ login: { token: string; user: CMSUser } }>({
        mutation: LOGIN_MUTATION,
        variables: { username, password },
      })

      if (result.data?.login) {
        const { token, user } = result.data.login
        localStorage.setItem('verity_token', token)
        isAuthenticated.value = true
        currentUser.value = user
        return true
      }
      return false
    } catch (err) {
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
