/**
 * VERITY+ Unified Type Definitions
 * Single source of truth for all data models across the application.
 */

export interface Author {
  id: string
  name: string
  avatar: string
  bioId: string
  bioEn: string
  bioZh: string
  role?: string
}

export interface Category {
  id: string
  nameId: string
  nameEn: string
  nameZh: string
  slug: string
  color: string
  bgColor: string
  borderColor: string
}

export interface Article {
  id: number
  slug: string
  titleId: string
  titleEn: string
  titleZh: string
  excerptId: string
  excerptEn: string
  excerptZh: string
  contentId: string
  contentEn: string
  contentZh: string
  coverImage: string
  coverImageCaptionId: string
  coverImageCaptionEn: string
  coverImageCaptionZh: string
  category: Category
  author: Author
  tagsId: string
  tagsEn: string
  tagsZh: string
  publishedAt: string
  readTimeMinutes: number
  status: ArticleStatus
}

export type AdSize = 'banner' | 'sidebar' | 'leaderboard' | 'inline'

/** Article publication status */
export type ArticleStatus = 'draft' | 'published' | 'archived' | 'featured'

export const ARTICLE_STATUS_LABELS: AppRecord<ArticleStatus, string> = {
  draft: 'Draft',
  published: 'Published',
  archived: 'Archived',
  featured: 'Featured',
}

export interface CMSUser {
  id: string
  username: string
  email: string
  password?: string
  role: 'admin' | 'editor'
}

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
  | 'category'
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

export const AD_SIZE_PRESETS: AppRecord<AdSize, { height: string; label: string }> = {
  leaderboard: { height: 'h-24', label: 'Leaderboard (728x90)' },
  banner: { height: 'h-32', label: 'Banner (468x60)' },
  sidebar: { height: 'h-64', label: 'Sidebar (300x250)' },
  inline: { height: 'h-40', label: 'Inline (Responsive)' },
}

export const CMS_ROLE_LABELS: AppRecord<CMSUser['role'], string> = {
  admin: 'Administrator',
  editor: 'Editor',
}
