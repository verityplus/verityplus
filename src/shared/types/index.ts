import type { paths } from './openapi'

export type Article = paths['/api/v1/articles/']['get']['responses']['200']['content']['application/json'][number]
export type Author = paths['/api/v1/authors/']['get']['responses']['200']['content']['application/json'][number]
export type Category = paths['/api/v1/categories/']['get']['responses']['200']['content']['application/json'][number]
export type CMSUser = paths['/api/v1/auth/users']['get']['responses']['200']['content']['application/json'][number] & {
  password?: string
}

export type ArticleStatus = 'draft' | 'published' | 'archived' | 'featured'

export const ARTICLE_STATUS_LABELS: AppRecord<ArticleStatus, string> = {
  draft: 'Draft',
  published: 'Published',
  archived: 'Archived',
  featured: 'Featured',
}

export type AdSize = 'leaderboard' | 'banner' | 'sidebar' | 'inline'


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




export type CreateArticleInput = paths['/api/v1/articles/']['post']['requestBody']['content']['application/json']
export type UpdateArticleInput = paths['/api/v1/articles/{id}']['put']['requestBody']['content']['application/json'] & {
  id: string
}

export type CreateCategoryInput = paths['/api/v1/categories/']['post']['requestBody']['content']['application/json']
export type UpdateCategoryInput = CreateCategoryInput & {
  id: string
}

export type CreateAuthorInput = paths['/api/v1/authors/']['post']['requestBody']['content']['application/json']
export type UpdateAuthorInput = CreateAuthorInput & {
  id: string
}
