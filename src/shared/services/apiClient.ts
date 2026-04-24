import createClient from 'openapi-fetch'
import type { paths } from '../types/openapi'

// VITE_API_URL should be the base function URL, e.g., https://xxx.supabase.co/functions/v1/api
// The apiClient will append /api/v1/... to this base URL.
export const API_BASE_URL = import.meta.env.VITE_API_URL.replace(/\/$/, '')
export const API_BASE_ORIGIN = new URL(API_BASE_URL).origin

// Create the type-safe client
const client = createClient<paths>({
  baseUrl: API_BASE_URL,
  credentials: 'include',
})

// apiClient is now configured to use httpOnly cookies via credentials: 'include'.
export const apiClient = client
