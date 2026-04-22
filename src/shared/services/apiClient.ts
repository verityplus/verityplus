import createClient from 'openapi-fetch'
import type { paths } from '../types/openapi'

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:54321/functions/v1/api'
export const API_BASE_ORIGIN = new URL(API_BASE_URL).origin

// Create the type-safe client
const client = createClient<paths>({ 
  baseUrl: API_BASE_URL,
  credentials: 'include'
})

// apiClient is now configured to use httpOnly cookies via credentials: 'include'.
export const apiClient = client

