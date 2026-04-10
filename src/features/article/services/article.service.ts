import type {
  Article,
  Category,
  Author,
  CreateArticleInput,
  UpdateArticleInput,
  CreateCategoryInput,
  UpdateCategoryInput,
  CreateAuthorInput,
  UpdateAuthorInput,
} from '@/shared/types'
import { apolloClient } from '@/shared/services/apollo'
import { gql } from '@apollo/client/core'

const GET_ARTICLES = gql`
  query GetArticles(
    $search: String
    $take: Int
    $skip: Int
    $categoryId: String
    $authorId: String
  ) {
    articles(
      search: $search
      take: $take
      skip: $skip
      categoryId: $categoryId
      authorId: $authorId
    ) {
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
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
      slug
    }
  }
`

const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($input: CreateCategoryInput!, $id: String!) {
    updateCategory(id: $id, input: $input) {
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
  mutation CreateAuthor($input: CreateAuthorInput!) {
    createAuthor(input: $input) {
      id
      name
    }
  }
`

const UPDATE_AUTHOR = gql`
  mutation UpdateAuthor($input: CreateAuthorInput!, $id: String!) {
    updateAuthor(id: $id, input: $input) {
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
  mutation CreateArticle($input: CreateArticleInput!) {
    createArticle(input: $input) {
      id
      slug
    }
  }
`

const UPDATE_ARTICLE = gql`
  mutation UpdateArticle($input: UpdateArticleInput!) {
    updateArticle(input: $input) {
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
  async getArticles(
    args: {
      search?: string
      take?: number
      skip?: number
      categoryId?: string
      authorId?: string
    } = {},
  ): Promise<Article[]> {
    const result = await apolloClient.query<{ articles: Article[] }>({
      query: GET_ARTICLES,
      variables: args,
    })
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
    return this.getArticles({ search: query })
  },

  async getAllCategories(): Promise<Category[]> {
    const result = await apolloClient.query<{ categories: Category[] }>({ query: GET_CATEGORIES })
    return result.data?.categories || []
  },

  async getAllAuthors(): Promise<Author[]> {
    const result = await apolloClient.query<{ authors: Author[] }>({ query: GET_AUTHORS })
    return result.data?.authors || []
  },

  async createArticle(data: CreateArticleInput): Promise<Article> {
    // Explicitly destructure to remove any unwanted fields
    const {
      titleId,
      titleEn,
      titleZh,
      slug,
      contentId,
      contentEn,
      contentZh,
      excerptId,
      excerptEn,
      excerptZh,
      coverImage,
      coverImageCaptionId,
      coverImageCaptionEn,
      coverImageCaptionZh,
      publishedAt,
      readTimeMinutes,
      categoryId,
      authorId,
      status,
      tagsId,
      tagsEn,
      tagsZh,
    } = data

    const input = {
      titleId,
      titleEn,
      titleZh,
      slug,
      contentId,
      contentEn,
      contentZh,
      excerptId,
      excerptEn,
      excerptZh,
      coverImage,
      coverImageCaptionId,
      coverImageCaptionEn,
      coverImageCaptionZh,
      publishedAt,
      readTimeMinutes,
      categoryId,
      authorId,
      status,
      tagsId,
      tagsEn,
      tagsZh,
    }

    console.log('Creating article with input:', input)
    const result = await apolloClient.mutate<{ createArticle: Article }>({
      mutation: CREATE_ARTICLE,
      variables: { input },
    })
    return result.data!.createArticle
  },

  async updateArticle(data: UpdateArticleInput): Promise<Article> {
    // Explicitly destructure to remove __typename and relations
    const {
      id,
      titleId,
      titleEn,
      titleZh,
      slug,
      contentId,
      contentEn,
      contentZh,
      excerptId,
      excerptEn,
      excerptZh,
      coverImage,
      coverImageCaptionId,
      coverImageCaptionEn,
      coverImageCaptionZh,
      publishedAt,
      readTimeMinutes,
      categoryId,
      authorId,
      status,
      tagsId,
      tagsEn,
      tagsZh,
    } = data

    const input = {
      id,
      titleId,
      titleEn,
      titleZh,
      slug,
      contentId,
      contentEn,
      contentZh,
      excerptId,
      excerptEn,
      excerptZh,
      coverImage,
      coverImageCaptionId,
      coverImageCaptionEn,
      coverImageCaptionZh,
      publishedAt,
      readTimeMinutes,
      categoryId,
      authorId,
      status,
      tagsId,
      tagsEn,
      tagsZh,
    }

    const result = await apolloClient.mutate<{ updateArticle: Article }>({
      mutation: UPDATE_ARTICLE,
      variables: { input },
    })
    return result.data!.updateArticle
  },

  async deleteArticle(id: number): Promise<void> {
    await apolloClient.mutate({
      mutation: DELETE_ARTICLE,
      variables: { id },
    })
  },

  async createCategory(data: CreateCategoryInput): Promise<Category> {
    const { nameId, nameEn, nameZh, slug } = data
    const input = { nameId, nameEn, nameZh, slug }

    const result = await apolloClient.mutate<{ createCategory: Category }>({
      mutation: CREATE_CATEGORY,
      variables: { input },
    })
    return result.data!.createCategory
  },

  async updateCategory(data: UpdateCategoryInput): Promise<Category> {
    const { id, nameId, nameEn, nameZh, slug } = data
    const input = { nameId, nameEn, nameZh, slug }

    const result = await apolloClient.mutate<{ updateCategory: Category }>({
      mutation: UPDATE_CATEGORY,
      variables: { id, input },
    })
    return result.data!.updateCategory
  },

  async deleteCategory(id: string): Promise<void> {
    await apolloClient.mutate({
      mutation: DELETE_CATEGORY,
      variables: { id },
    })
  },

  async createAuthor(data: CreateAuthorInput): Promise<Author> {
    const { name, avatar, role, bioId, bioEn, bioZh } = data
    const input = { name, avatar, role, bioId, bioEn, bioZh }

    const result = await apolloClient.mutate<{ createAuthor: Author }>({
      mutation: CREATE_AUTHOR,
      variables: { input },
    })
    return result.data!.createAuthor
  },

  async updateAuthor(data: UpdateAuthorInput): Promise<Author> {
    const { id, name, avatar, role, bioId, bioEn, bioZh } = data
    const input = { name, avatar, role, bioId, bioEn, bioZh }

    const result = await apolloClient.mutate<{ updateAuthor: Author }>({
      mutation: UPDATE_AUTHOR,
      variables: { id, input },
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
