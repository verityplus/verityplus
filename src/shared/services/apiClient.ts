import createClient from 'openapi-fetch'
import type { paths } from '../types/openapi'

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1'
export const API_BASE_ORIGIN = API_BASE_URL.replace('/api/v1', '')

// Create the type-safe client
const client = createClient<paths>({ 
  baseUrl: API_BASE_URL 
})

// Add Auth middleware/interceptor
client.use({
  async onRequest({ request }) {
    const token = localStorage.getItem('verity_token')
    if (token) {
      request.headers.set('Authorization', `Bearer ${token}`)
    }
    return request
  },
})

export const apiClient = {
  get: client.GET,
  post: client.POST,
  put: client.PUT,
  patch: client.PATCH,
  delete: client.DELETE,
}
