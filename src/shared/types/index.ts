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
}

export interface Article {
  id: string
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


export type AppPartial<T> = {
  [P in keyof T]?: T[P]
}


export type AppRequired<T> = {
  [P in keyof T]-?: T[P]
}


export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }


export type WithOptional<T, K extends keyof T> = Omit<T, K> & AppPartial<Pick<T, K>>


export type ExtractType<T, K extends keyof T> = T[K]


export type Maybe<T> = T | undefined


export type Nullable<T> = T | null


export type MaybeNull<T> = T | null | undefined


export type AppReturnType<T extends (...args: never[]) => unknown> = T extends (
  ...args: never[]
) => infer R
  ? R
  : never


export type AppParameters<T extends (...args: never[]) => unknown> = T extends (
  ...args: infer P
) => unknown
  ? P
  : never


export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}


export type AppReadonly<T> = {
  readonly [P in keyof T]: T[P]
}


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



export interface CreateArticleInput {
  titleId: string
  titleEn: string
  titleZh: string
  contentId: string
  contentEn: string
  contentZh: string
  coverImage?: string
  coverImageCaptionId?: string
  coverImageCaptionEn?: string
  coverImageCaptionZh?: string
  publishedAt?: string
  categoryId: string
  authorId: string
  status: string
  tagsId?: string
  tagsEn?: string
  tagsZh?: string
}

export interface UpdateArticleInput extends CreateArticleInput {
  id: string
}

export interface CreateCategoryInput {
  nameId: string
  nameEn: string
  nameZh: string
}

export interface UpdateCategoryInput extends CreateCategoryInput {
  id: string
}

export interface CreateAuthorInput {
  name: string
  avatar: string
  role?: string
  bioId: string
  bioEn: string
  bioZh: string
}

export interface UpdateAuthorInput extends CreateAuthorInput {
  id: string
}
