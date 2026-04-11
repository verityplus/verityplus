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


  const {
    data: articlesData,
    isLoading: articlesLoading,
    refetch: refetchArticles,
  } = useQuery({
    queryKey: ['articles'],
    queryFn: () => ArticleService.getArticles({ take: 50 }),
    initialData: [],
  })

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



  const articles = computed(() => articlesData.value || [])
  const categories = computed(() => categoriesData.value || [])
  const authors = computed(() => authorsData.value || [])
  const isLoading = computed(() => articlesLoading.value)

  const latestPage = ref(1)
  const gridPage = ref(1)


  const featured = computed(() => articles.value.filter((a) => a.status === 'featured'))


  const nonFeaturedArticles = computed(() => articles.value.filter((a) => a.status !== 'featured'))


  const latest = computed(() => {
    const start = (latestPage.value - 1) * LATEST_PER_PAGE
    return nonFeaturedArticles.value.slice(start, start + LATEST_PER_PAGE)
  })


  const latestTotalPages = computed(() =>
    Math.ceil(nonFeaturedArticles.value.length / LATEST_PER_PAGE),
  )


  const popular = computed(() => articles.value.filter((a) => a.status === 'featured').slice(0, 5))


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


  const getCategoryWithCount = computed(() => {
    return categories.value
      .map((c) => ({
        category: c,
        count: articles.value.filter((a) => a.category.id === c.id).length,
      }))
      .filter((c) => c.count > 0)
  })


  const findAuthorById = (id: string): Author | undefined => {
    return authors.value.find((a) => a.id === id)
  }


  const findArticlesByAuthor = (id: string): Article[] => {
    return articles.value.filter((a) => a.author.id === id)
  }


  const findCategoryById = (id: string): Category | undefined => {
    return categories.value.find((c) => c.id === id)
  }


  const findArticlesByCategoryId = (id: string): Article[] => {
    return articles.value.filter((a) => a.category.id === id)
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
    getCategoryWithCount,
    findAuthorById,
    findArticlesByAuthor,
    findCategoryById,
    findArticlesByCategoryId,
    refetchArticles,
  }
})
