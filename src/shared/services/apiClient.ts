import createClient from 'openapi-fetch'
import type { paths } from '../types/openapi'

// VITE_API_URL should be the base function URL, e.g., https://xxx.supabase.co/functions/v1/api
// The apiClient will append /api/v1/... to this base URL.
const rawUrl = import.meta.env.VITE_API_URL
if (!rawUrl) throw new Error('VITE_API_URL is not defined. Check your .env file.')
export const API_BASE_URL = rawUrl.replace(/\/$/, '')
const originUrl = new URL(API_BASE_URL)

// If we are on HTTPS, try to use HTTPS for API to avoid mixed content
if (typeof window !== 'undefined' && window.location.protocol === 'https:' && originUrl.protocol === 'http:') {
  originUrl.protocol = 'https:'
}

export const API_BASE_ORIGIN = originUrl.origin

// Create the type-safe client
const client = createClient<paths>({
  baseUrl: API_BASE_URL,
  credentials: 'include',
})

// apiClient is now configured to use httpOnly cookies via credentials: 'include'.
export const apiClient = client
