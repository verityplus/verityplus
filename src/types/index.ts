/**
 * Verity+ Unified Type Definitions
 * Single source of truth for all data models across the application.
 */

// --- Core Models ---

export interface Author {
  id: string
  name: string
  avatar: string
  role?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  color: string        // Tailwind text color class e.g. 'text-blue-600'
  bgColor: string      // Tailwind bg color class e.g. 'bg-blue-100'
  borderColor: string   // Tailwind border color class e.g. 'border-blue-500'
}

export interface Article {
  id: number
  slug: string
  title: string
  excerpt: string
  content?: string          // Markdown body (only loaded on read page)
  coverImage: string
  coverImageCaption?: string
  category: Category
  author: Author
  tags: string[]
  publishedAt: string       // ISO date string for display
  readTimeMinutes: number
  isFeatured?: boolean
  isPopular?: boolean
}

// --- Ad Models ---

export type AdSize = 'banner' | 'sidebar' | 'leaderboard' | 'inline'

export interface AdSlot {
  id: string
  size: AdSize
  label?: string
}

// --- Navigation ---

export interface NavCategory {
  id: string
  name: string
  slug: string
  color: string
  bgColor: string
  borderColor: string
}

// --- Newsletter ---

export interface NewsletterSubscription {
  email: string
  subscribedAt?: string
}
