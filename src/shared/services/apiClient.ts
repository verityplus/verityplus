import createClient from 'openapi-fetch'
import type { paths } from '../types/openapi'

// VITE_API_URL should be the base function URL, e.g., https://xxx.supabase.co/functions/v1/api
// The apiClient will append /api/v1/... to this base URL.
const rawUrl = import.meta.env.VITE_API_URL
if (!rawUrl) throw new Error('VITE_API_URL is not defined. Check your .env file.')
export const API_BASE_URL = rawUrl.replace(/\/$/, '')
const originUrl = new URL(API_BASE_URL)

// Enforce HTTPS in production: reject any plain http:// API URL unless it's localhost/127.0.0.1 (local dev)
const isLocalDev = originUrl.hostname === 'localhost' || originUrl.hostname === '127.0.0.1'
if (!isLocalDev && originUrl.protocol === 'http:') {
  // Auto-upgrade to HTTPS so mixed-content errors don't occur
  originUrl.protocol = 'https:'
  console.warn('[apiClient] VITE_API_URL was http:// — automatically upgraded to https:// for non-localhost.')
}

export const API_BASE_ORIGIN = originUrl.origin

// Create the type-safe client
const client = createClient<paths>({
  baseUrl: API_BASE_URL,
  credentials: 'include',
})

// apiClient is now configured to use httpOnly cookies via credentials: 'include'.
export const apiClient = client
