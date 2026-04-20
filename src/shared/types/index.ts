import type { paths } from './openapi'

export type Article = paths['/api/v1/articles/']['get']['responses']['200']['content']['application/json']['items'][number]
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



export type AppRecord<K extends string, T> = {
  [P in K]: T
}





export type CreateArticleInput = NonNullable<paths['/api/v1/articles/']['post']['requestBody']>['content']['application/json']
export type UpdateArticleInput = NonNullable<paths['/api/v1/articles/{id}']['put']['requestBody']>['content']['application/json'] & {
  id: string
}

export type CreateCategoryInput = NonNullable<paths['/api/v1/categories/']['post']['requestBody']>['content']['application/json']
export type UpdateCategoryInput = CreateCategoryInput & {
  id: string
}

export type CreateAuthorInput = NonNullable<paths['/api/v1/authors/']['post']['requestBody']>['content']['application/json']
export type UpdateAuthorInput = CreateAuthorInput & {
  id: string
}
