import { useQuery, type UseQueryOptions } from '@tanstack/vue-query'
import type { DocumentNode } from 'graphql'
import { apolloClient } from '@/shared/services/apollo'

/**
 * useGqlQuery: Wraps Apollo Client calls with Tanstack Vue Query.
 * Provides advanced caching, refetching, and state management.
 */
export function useGqlQuery<TWork, TVars = any>(
  key: any[],
  query: DocumentNode,
  variables?: TVars,
  options?: Omit<UseQueryOptions<TWork, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const result = await apolloClient.query<TWork>({
        query,
        variables: variables as any,
      })
      if (result.errors) {
        throw new Error(result.errors[0].message)
      }
      return result.data
    },
    ...options,
  })
}
