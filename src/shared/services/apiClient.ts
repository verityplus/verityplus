import createClient from 'openapi-fetch'
import type { paths } from '../types/openapi'

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1'
export const API_BASE_ORIGIN = API_BASE_URL.replace('/api/v1', '')

// Create the type-safe client
const client = createClient<paths>({ 
  baseUrl: API_BASE_ORIGIN,
  credentials: 'include'
})

// apiClient is now configured to use httpOnly cookies via credentials: 'include'.
export const apiClient = client

