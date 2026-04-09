import { defineStore } from 'pinia'
import { computed } from 'vue'
import type { CMSUser } from '@/shared/types'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { apolloClient } from '@/shared/services/apollo'
import { gql } from '@apollo/client/core'

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      username
      email
      role
    }
  }
`

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      username
    }
  }
`

const UPDATE_USER = gql`
  mutation UpdateUser($id: String!, $username: String!, $email: String!, $role: String!) {
    updateUser(id: $id, username: $username, email: $email, role: $role) {
      id
      username
    }
  }
`

const DELETE_USER = gql`
  mutation DeleteUser($id: String!) {
    deleteUser(id: $id) {
      id
    }
  }
`

/**
 * CMSStore: Specialized management for administrative actions.
 */
export const useCMSStore = defineStore('cms', () => {
  const queryClient = useQueryClient()

  const { data: usersData, isLoading, refetch } = useQuery({
    queryKey: ['cms_users'],
    queryFn: async () => {
      const result = await apolloClient.query<{ users: CMSUser[] }>({ query: GET_USERS })
      return result.data?.users || []
    },
    initialData: [],
  })

  const users = computed(() => usersData.value || [])

  const addUser = async (user: CMSUser) => {
    const { id, ...input } = user
    await apolloClient.mutate({
      mutation: CREATE_USER,
      variables: { input },
    })
    queryClient.invalidateQueries({ queryKey: ['cms_users'] })
  }

  const updateUser = async (user: CMSUser) => {
    const { id, username, email, role } = user
    await apolloClient.mutate({
      mutation: UPDATE_USER,
      variables: { id, username, email, role },
    })
    queryClient.invalidateQueries({ queryKey: ['cms_users'] })
  }

  const deleteUser = async (id: string) => {
    await apolloClient.mutate({
      mutation: DELETE_USER,
      variables: { id },
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
