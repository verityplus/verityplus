/**
 * Verity+ Unified Type Definitions
 * Single source of truth for all data models across the application.
 */

// --- Core Models ---

export interface Author {
  id: string
  name: string
  avatar: string
  bio?: string
  role?: string // Optional role description (e.g., 'Editor', 'Tech Writer')
}

export interface Category {
  id: string
  name: string
  slug: string
  color: string // Tailwind text color class e.g. 'text-blue-600'
  bgColor: string // Tailwind bg color class e.g. 'bg-blue-100'
  borderColor: string // Tailwind border color class e.g. 'border-blue-500'
}

export interface Article {
  id: number
  slug: string
  title: string
  excerpt: string
  content?: string // Markdown body (only loaded on read page)
  coverImage: string
  coverImageCaption?: string
  category: Category
  author: Author
  tags: string[]
  publishedAt: string // ISO date string for display
  readTimeMinutes: number
  isFeatured?: boolean
  isPopular?: boolean
}

// --- Ad Models ---

export type AdSize = 'banner' | 'sidebar' | 'leaderboard' | 'inline'

// --- CMS Models ---

export interface CMSUser {
  id: string
  username: string
  email: string
  password?: string
  role: 'admin' | 'editor'
}

// --- Utility Types ---

/** Makes all properties of T optional */
export type AppPartial<T> = {
  [P in keyof T]?: T[P]
}

/** Makes all properties of T required */
export type AppRequired<T> = {
  [P in keyof T]-?: T[P]
}

/** Makes specified keys of T required */
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

/** Makes specified keys of T optional */
export type WithOptional<T, K extends keyof T> = Omit<T, K> & AppPartial<Pick<T, K>>

/** Extracts the type of a property from an object type */
export type ExtractType<T, K extends keyof T> = T[K]

/** Creates a type that is either T or undefined */
export type Maybe<T> = T | undefined

/** Creates a type that is either T or null */
export type Nullable<T> = T | null

/** Creates a type that is either T or null or undefined */
export type MaybeNull<T> = T | null | undefined

/** Extracts the return type of a function, or never if not a function */
export type AppReturnType<T extends (...args: never[]) => unknown> = T extends (
  ...args: never[]
) => infer R
  ? R
  : never

/** Extracts the parameter types of a function */
export type AppParameters<T extends (...args: never[]) => unknown> = T extends (
  ...args: infer P
) => unknown
  ? P
  : never

/** Deep partial type for nested objects */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/** Readonly version of all properties */
export type AppReadonly<T> = {
  readonly [P in keyof T]: T[P]
}

/** Record type with string keys and T values */
export type AppRecord<K extends string, T> = {
  [P in K]: T
}

// --- Route Names ---

export type RouteName =
  | 'home'
  | 'about-us'
  | 'contact'
  | 'advertise'
  | 'privacy-policy'
  | 'terms-and-conditions'
  | 'search'
  | 'read'
  | 'author'
  | 'cms-dashboard'
  | 'cms-articles'
  | 'cms-articles-new'
  | 'cms-articles-edit'
  | 'cms-characters'
  | 'cms-characters-new'
  | 'cms-characters-edit'
  | 'cms-categories'
  | 'cms-categories-new'
  | 'cms-categories-edit'
  | 'cms-users'
  | 'cms-users-new'
  | 'cms-users-edit'

// --- Ad Size Presets ---

export const AD_SIZE_PRESETS: AppRecord<AdSize, { height: string; label: string }> = {
  leaderboard: { height: 'h-24', label: 'Leaderboard (728x90)' },
  banner: { height: 'h-32', label: 'Banner (468x60)' },
  sidebar: { height: 'h-64', label: 'Sidebar (300x250)' },
  inline: { height: 'h-40', label: 'Inline (Responsive)' },
}

// --- CMS Role Labels ---

export const CMS_ROLE_LABELS: AppRecord<CMSUser['role'], string> = {
  admin: 'Administrator',
  editor: 'Editor',
}
