import { useQuery, type UseQueryOptions } from '@tanstack/vue-query'
import type { DocumentNode } from 'graphql'
import { apolloClient } from '@/shared/services/apollo'

/**
 * useGqlQuery: Wraps Apollo Client calls with Tanstack Vue Query.
 * Provides advanced caching, refetching, and state management.
 */
export function useGqlQuery<TWork, TVars = Record<string, unknown>>(
  key: unknown[],
  query: DocumentNode,
  variables?: TVars,
  options?: Omit<UseQueryOptions<TWork, Error>, 'queryKey' | 'queryFn'>,
) {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const result = await apolloClient.query<TWork>({
        query,
        variables: variables as Record<string, unknown>,
      })
      if (result.error) {
        throw new Error(result.error.message)
      }
      return result.data
    },
    ...options,
  })
}
