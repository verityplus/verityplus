import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { ArticleService } from '../services/article.service'
import type { Article, Category, Author } from '@/shared/types'

const LATEST_PER_PAGE = 4
const GRID_PER_PAGE = 8

/**
 * ArticleStore: Centralized State Management for Read Operations
 * Integrated with Tanstack Vue Query for efficient data fetching and caching.
 */
export const useArticleStore = defineStore('articles', () => {
  const cmsPage = ref(1)
  const cmsLimit = ref(100)
  const cmsSearch = ref('')

  const {
    data: articlesData,
    isLoading: articlesLoading,
    refetch: refetchArticles,
  } = useQuery({
    queryKey: ['articles', cmsPage, cmsLimit, cmsSearch],
    queryFn: () =>
      ArticleService.getArticles({
        page: cmsPage.value,
        limit: cmsLimit.value,
        search: cmsSearch.value,
      }),
    placeholderData: (previousData) => previousData,
  })

  // We should also have a query for all articles (or at least a larger batch)
  // if the public site still relies on client-side logic for featured/latest/etc.
  // For now, let's keep the main articles query and adjust it.
  const articles = computed(() => articlesData.value?.items || [])
  const totalArticles = computed(() => articlesData.value?.total || 0)

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => ArticleService.getAllCategories(),
    initialData: [],
  })

  const { data: authorsData } = useQuery({
    queryKey: ['authors'],
    queryFn: () => ArticleService.getAllAuthors(),
    initialData: [],
  })

  const categories = computed(() => categoriesData.value || [])
  const authors = computed(() => authorsData.value || [])
  const isLoading = computed(() => articlesLoading.value)

  const latestPage = ref(1)
  const gridPage = ref(1)

  const featured = computed(() => articles.value.filter((a) => a.status === 'featured'))

  const nonFeaturedArticles = computed(() => articles.value.filter((a) => a.status !== 'featured' && a.status !== 'popular'))

  const latest = computed(() => {
    const start = (latestPage.value - 1) * LATEST_PER_PAGE
    return nonFeaturedArticles.value.slice(start, start + LATEST_PER_PAGE)
  })

  const latestTotalPages = computed(() =>
    Math.ceil(nonFeaturedArticles.value.length / LATEST_PER_PAGE),
  )

  const popular = computed(() => articles.value.filter((a) => a.status === 'popular'))

  const paginatedGridArticles = computed(() => {
    const start = (gridPage.value - 1) * GRID_PER_PAGE
    return nonFeaturedArticles.value.slice(start, start + GRID_PER_PAGE)
  })

  const gridTotalPages = computed(() => Math.ceil(nonFeaturedArticles.value.length / GRID_PER_PAGE))

  const gridArticles = computed(() => nonFeaturedArticles.value.slice(0, GRID_PER_PAGE))

  const findById = async (id: string): Promise<Article | undefined> => {
    return ArticleService.getArticleById(id)
  }

  const search = async (query: string): Promise<Article[]> => {
    return ArticleService.searchArticles(query)
  }

  const findAuthorById = (id: string): Author | undefined => {
    return authors.value.find((a) => a.id === id)
  }

  const findArticlesByAuthor = (id: string): Article[] => {
    return articles.value.filter((a) => a.author?.id === id)
  }

  const findCategoryById = (id: string): Category | undefined => {
    return categories.value.find((c) => c.id === id)
  }

  const findArticlesByCategoryId = (id: string): Article[] => {
    return articles.value.filter((a) => a.category?.id === id)
  }

  const latestNextPage = () => {
    if (latestPage.value < latestTotalPages.value) latestPage.value++
  }

  const latestPrevPage = () => {
    if (latestPage.value > 1) latestPage.value--
  }

  const gridNextPage = () => {
    if (gridPage.value < gridTotalPages.value) gridPage.value++
  }

  const gridPrevPage = () => {
    if (gridPage.value > 1) gridPage.value--
  }

  const resetPagination = () => {
    latestPage.value = 1
    gridPage.value = 1
  }

  return {
    articles,
    totalArticles,
    categories,
    authors,
    isLoading,
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
    findById,
    search,
    findAuthorById,
    findArticlesByAuthor,
    findCategoryById,
    findArticlesByCategoryId,
    refetchArticles,
    cmsPage,
    cmsLimit,
    cmsSearch,
  }
})
