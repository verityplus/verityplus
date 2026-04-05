import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ArticleService } from '../services/article.service'
import type { Article, Category, Author } from '@/shared/types'

const LATEST_PER_PAGE = 4
const GRID_PER_PAGE = 8

/**
 * ArticleStore: Centralized State Management for Read Operations
 * Calls ArticleService for data fetching and provides typed state access.
 * CMS mutations are handled by CMSContentStore.
 */
export const useArticleStore = defineStore('articles', () => {
  const articles = ref<Article[]>([])
  const categories = ref<Category[]>([])
  const authors = ref<Author[]>([])
  const isLoading = ref(false)

  const latestPage = ref(1)
  const gridPage = ref(1)

  /**
   * Initializes the store by fetching all foundational data.
   */
  const initStore = async () => {
    isLoading.value = true
    try {
      const [artList, catList, authList] = await Promise.all([
        ArticleService.getArticles(),
        ArticleService.getAllCategories(),
        ArticleService.getAllAuthors(),
      ])
      articles.value = artList
      categories.value = catList
      authors.value = authList
    } finally {
      isLoading.value = false
    }
  }

  /** Featured articles for the headline carousel */
  const featured = computed(() => articles.value.filter((a) => a.status === 'featured'))

  /** Non-featured articles for pagination */
  const nonFeaturedArticles = computed(() => articles.value.filter((a) => a.status !== 'featured'))

  /** Paginated latest articles excluding featured ones */
  const latest = computed(() => {
    const start = (latestPage.value - 1) * LATEST_PER_PAGE
    return nonFeaturedArticles.value.slice(start, start + LATEST_PER_PAGE)
  })

  /** Total pages for latest articles */
  const latestTotalPages = computed(() =>
    Math.ceil(nonFeaturedArticles.value.length / LATEST_PER_PAGE),
  )

  /** Popular articles (featured or marked as popular) */
  const popular = computed(() => articles.value.filter((a) => a.status === 'featured').slice(0, 5))

  /** Paginated articles for grid display, excluding featured */
  const paginatedGridArticles = computed(() => {
    const start = (gridPage.value - 1) * GRID_PER_PAGE
    return nonFeaturedArticles.value.slice(start, start + GRID_PER_PAGE)
  })

  /** Total pages for grid articles */
  const gridTotalPages = computed(() => Math.ceil(nonFeaturedArticles.value.length / GRID_PER_PAGE))

  const gridArticles = computed(() => nonFeaturedArticles.value.slice(0, GRID_PER_PAGE))

  /** Find an article by its unique slug */
  const findBySlug = async (slug: string): Promise<Article | undefined> => {
    return ArticleService.getArticleBySlug(slug)
  }

  /** Search articles by query string */
  const search = async (query: string): Promise<Article[]> => {
    return ArticleService.searchArticles(query)
  }

  /** Get categories with their article counts */
  const getCategoryWithCount = computed(() => {
    return categories.value
      .map((c) => ({
        category: c,
        count: articles.value.filter((a) => a.category.slug === c.slug).length,
      }))
      .filter((c) => c.count > 0)
  })

  /** Find an author by their ID */
  const findAuthorById = (id: string): Author | undefined => {
    return authors.value.find((a) => a.id === id)
  }

  /** Find all articles written by a specific author */
  const findArticlesByAuthor = (id: string): Article[] => {
    return articles.value.filter((a) => a.author.id === id)
  }

  /** Find a category by its slug */
  const findCategoryBySlug = (slug: string): Category | undefined => {
    return categories.value.find((c) => c.slug === slug)
  }

  /** Find all articles in a specific category */
  const findArticlesByCategory = (slug: string): Article[] => {
    return articles.value.filter((a) => a.category.slug === slug)
  }

  /** Go to next page of latest articles */
  const latestNextPage = () => {
    if (latestPage.value < latestTotalPages.value) {
      latestPage.value++
    }
  }

  /** Go to previous page of latest articles */
  const latestPrevPage = () => {
    if (latestPage.value > 1) {
      latestPage.value--
    }
  }

  /** Go to next page of grid articles */
  const gridNextPage = () => {
    if (gridPage.value < gridTotalPages.value) {
      gridPage.value++
    }
  }

  /** Go to previous page of grid articles */
  const gridPrevPage = () => {
    if (gridPage.value > 1) {
      gridPage.value--
    }
  }

  /** Reset pagination to page 1 */
  const resetPagination = () => {
    latestPage.value = 1
    gridPage.value = 1
  }

  return {
    articles,
    categories,
    authors,
    isLoading,
    initStore,
    featured,
    nonFeaturedArticles,
    latest,
    latestPage,
    latestTotalPages,
    latestNextPage,
    latestPrevPage,
    popular,
    gridArticles,
    paginatedGridArticles,
    gridPage,
    gridTotalPages,
    gridNextPage,
    gridPrevPage,
    resetPagination,
    findBySlug,
    search,
    getCategoryWithCount,
    findAuthorById,
    findArticlesByAuthor,
    findCategoryBySlug,
    findArticlesByCategory,
  }
})
