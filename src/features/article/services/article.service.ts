import type { Article, Category, Author } from '@/shared/types'
import { apolloClient } from '@/shared/services/apollo'
import { gql } from '@apollo/client/core'

const GET_ARTICLES = gql`
  query GetArticles {
    articles {
      id
      slug
      titleId
      titleEn
      titleZh
      excerptId
      excerptEn
      excerptZh
      coverImage
      publishedAt
      readTimeMinutes
      status
      category {
        id
        nameId
        nameEn
        nameZh
        slug
        color
        bgColor
        borderColor
      }
      author {
        id
        name
        avatar
      }
    }
  }
`

const GET_ARTICLE_BY_SLUG = gql`
  query GetArticleBySlug($slug: String!) {
    article(slug: $slug) {
      id
      slug
      titleId
      titleEn
      titleZh
      excerptId
      excerptEn
      excerptZh
      contentId
      contentEn
      contentZh
      coverImage
      coverImageCaptionId
      coverImageCaptionEn
      coverImageCaptionZh
      publishedAt
      readTimeMinutes
      status
      tagsId
      tagsEn
      tagsZh
      category {
        id
        nameId
        nameEn
        nameZh
        slug
        color
      }
      author {
        id
        name
        avatar
        bioId
        bioEn
        bioZh
      }
    }
  }
`

const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      nameId
      nameEn
      nameZh
      slug
      color
      bgColor
      borderColor
    }
  }
`

const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      id
      name
      avatar
      role
      bioId
      bioEn
      bioZh
    }
  }
`

const CREATE_CATEGORY = gql`
  mutation CreateCategory($nameId: String!, $nameEn: String!, $nameZh: String!, $slug: String!, $color: String!, $bgColor: String!, $borderColor: String!) {
    createCategory(nameId: $nameId, nameEn: $nameEn, nameZh: $nameZh, slug: $slug, color: $color, bgColor: $bgColor, borderColor: $borderColor) {
      id
      slug
    }
  }
`

const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: String!, $nameId: String!, $nameEn: String!, $nameZh: String!, $slug: String!, $color: String!, $bgColor: String!, $borderColor: String!) {
    updateCategory(id: $id, nameId: $nameId, nameEn: $nameEn, nameZh: $nameZh, slug: $slug, color: $color, bgColor: $bgColor, borderColor: $borderColor) {
      id
      slug
    }
  }
`

const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: String!) {
    deleteCategory(id: $id) {
      id
    }
  }
`

const CREATE_AUTHOR = gql`
  mutation CreateAuthor($name: String!, $avatar: String!, $role: String, $bioId: String!, $bioEn: String!, $bioZh: String!) {
    createAuthor(name: $name, avatar: $avatar, role: $role, bioId: $bioId, bioEn: $bioEn, bioZh: $bioZh) {
      id
      name
    }
  }
`

const UPDATE_AUTHOR = gql`
  mutation UpdateAuthor($id: String!, $name: String!, $avatar: String!, $role: String, $bioId: String!, $bioEn: String!, $bioZh: String!) {
    updateAuthor(id: $id, name: $name, avatar: $avatar, role: $role, bioId: $bioId, bioEn: $bioEn, bioZh: $bioZh) {
      id
      name
    }
  }
`

const DELETE_AUTHOR = gql`
  mutation DeleteAuthor($id: String!) {
    deleteAuthor(id: $id) {
      id
    }
  }
`

const CREATE_ARTICLE = gql`
  mutation CreateArticle(
    $titleId: String!, $titleEn: String!, $titleZh: String!,
    $slug: String!, $contentId: String!, $contentEn: String!, $contentZh: String!,
    $categoryId: String!, $authorId: String!, $status: String!
  ) {
    createArticle(
      titleId: $titleId, titleEn: $titleEn, titleZh: $titleZh,
      slug: $slug, contentId: $contentId, contentEn: $contentEn, contentZh: $contentZh,
      categoryId: $categoryId, authorId: $authorId, status: $status
    ) {
      id
      slug
    }
  }
`

const UPDATE_ARTICLE = gql`
  mutation UpdateArticle(
    $id: Int!, $titleId: String!, $titleEn: String!, $titleZh: String!,
    $slug: String!, $contentId: String!, $contentEn: String!, $contentZh: String!,
    $categoryId: String!, $authorId: String!, $status: String!
  ) {
    updateArticle(
      id: $id, titleId: $titleId, titleEn: $titleEn, titleZh: $titleZh,
      slug: $slug, contentId: $contentId, contentEn: $contentEn, contentZh: $contentZh,
      categoryId: $categoryId, authorId: $authorId, status: $status
    ) {
      id
      slug
    }
  }
`

const DELETE_ARTICLE = gql`
  mutation DeleteArticle($id: Int!) {
    deleteArticle(id: $id) {
      id
    }
  }
`

/**
 * ArticleService: Unified Data Access Layer
 * Refactored to use GraphQL via Apollo Client.
 */
export const ArticleService = {
  async getArticles(): Promise<Article[]> {
    const result = await apolloClient.query<{ articles: Article[] }>({ query: GET_ARTICLES })
    return result.data?.articles || []
  },

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    const result = await apolloClient.query<{ article: Article | null }>({
      query: GET_ARTICLE_BY_SLUG,
      variables: { slug },
    })
    return result.data?.article || undefined
  },

  async searchArticles(query: string): Promise<Article[]> {
    const articles = await this.getArticles()
    const q = query.toLowerCase().trim()
    if (!q) return []
    return articles.filter(
      (a) =>
        [a.titleId, a.titleEn, a.titleZh].some((title) => title && title.toLowerCase().includes(q)) ||
        [a.excerptId, a.excerptEn, a.excerptZh].some((excerpt) => excerpt && excerpt.toLowerCase().includes(q)) ||
        [a.category.nameId, a.category.nameEn, a.category.nameZh].some(
          (name) => name && name.toLowerCase().includes(q)
        ),
    )
  },

  async getAllCategories(): Promise<Category[]> {
    const result = await apolloClient.query<{ categories: Category[] }>({ query: GET_CATEGORIES })
    return result.data?.categories || []
  },

  async getAllAuthors(): Promise<Author[]> {
    const result = await apolloClient.query<{ authors: Author[] }>({ query: GET_AUTHORS })
    return result.data?.authors || []
  },

  async createArticle(data: any): Promise<Article> {
    const result = await apolloClient.mutate<{ createArticle: Article }>({
      mutation: CREATE_ARTICLE,
      variables: data,
    })
    return result.data!.createArticle
  },

  async updateArticle(data: any): Promise<Article> {
    const result = await apolloClient.mutate<{ updateArticle: Article }>({
      mutation: UPDATE_ARTICLE,
      variables: data,
    })
    return result.data!.updateArticle
  },

  async deleteArticle(id: number): Promise<void> {
    await apolloClient.mutate({
      mutation: DELETE_ARTICLE,
      variables: { id },
    })
  },

  async createCategory(data: any): Promise<Category> {
    const result = await apolloClient.mutate<{ createCategory: Category }>({
      mutation: CREATE_CATEGORY,
      variables: data,
    })
    return result.data!.createCategory
  },

  async updateCategory(data: any): Promise<Category> {
    const result = await apolloClient.mutate<{ updateCategory: Category }>({
      mutation: UPDATE_CATEGORY,
      variables: data,
    })
    return result.data!.updateCategory
  },

  async deleteCategory(id: string): Promise<void> {
    await apolloClient.mutate({
      mutation: DELETE_CATEGORY,
      variables: { id },
    })
  },

  async createAuthor(data: any): Promise<Author> {
    const result = await apolloClient.mutate<{ createAuthor: Author }>({
      mutation: CREATE_AUTHOR,
      variables: data,
    })
    return result.data!.createAuthor
  },

  async updateAuthor(data: any): Promise<Author> {
    const result = await apolloClient.mutate<{ updateAuthor: Author }>({
      mutation: UPDATE_AUTHOR,
      variables: data,
    })
    return result.data!.updateAuthor
  },

  async deleteAuthor(id: string): Promise<void> {
    await apolloClient.mutate({
      mutation: DELETE_AUTHOR,
      variables: { id },
    })
  },
}
