import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ArticleService } from '../services/article.service'
import type { Article, Category, Author } from '@/shared/types'

/**
 * ArticleStore: Centralized State Management
 * Calls ArticleService for data fetching and provides typed state access.
 */
export const useArticleStore = defineStore('articles', () => {
  // --- Reactive State ---
  const articles = ref<Article[]>([])
  const categories = ref<Category[]>([])
  const authors = ref<Author[]>([])
  const isLoading = ref(false)

  // --- Actions ---
  
  /**
   * Initializes the store by fetching all foundational data.
   */
  const initStore = async () => {
    isLoading.value = true
    try {
      const [artList, catList, authList] = await Promise.all([
        ArticleService.getArticles(),
        ArticleService.getAllCategories(),
        ArticleService.getAllAuthors()
      ])
      articles.value = artList
      categories.value = catList
      authors.value = authList
    } finally {
      isLoading.value = false
    }
  }

  // --- Computed Getters ---

  const featured = computed(() => articles.value.filter((a) => a.isFeatured))
  const latest = computed(() => articles.value.filter((a) => !a.isFeatured).slice(0, 4))
  const popular = computed(() => articles.value.filter((a) => a.isPopular || a.isFeatured).slice(0, 5))
  const gridArticles = computed(() => articles.value.filter((a) => !a.isFeatured).slice(0, 8))

  // --- Custom Methods ---

  const findBySlug = async (slug: string): Promise<Article | undefined> => {
    return ArticleService.getArticleBySlug(slug)
  }

  const search = async (query: string): Promise<Article[]> => {
    return ArticleService.searchArticles(query)
  }

  const getCategoryWithCount = computed(() => {
    return categories.value.map((c) => ({
      category: c,
      count: articles.value.filter((a) => a.category.slug === c.slug).length,
    })).filter((c) => c.count > 0)
  })

  // --- CMS Mutation Actions (Local Session Persistence) ---

  const addArticle = (article: Article) => {
    articles.value.unshift(article)
  }

  const updateArticle = (article: Article) => {
    const idx = articles.value.findIndex(a => a.id === article.id)
    if (idx !== -1) articles.value[idx] = article
  }

  const deleteArticle = (id: number) => {
    articles.value = articles.value.filter(a => a.id !== id)
  }

  const addCategory = (category: Category) => {
    categories.value.push(category)
  }

  const updateCategory = (category: Category) => {
    const idx = categories.value.findIndex(c => c.id === category.id)
    if (idx !== -1) categories.value[idx] = category
  }

  const deleteCategory = (id: string) => {
    categories.value = categories.value.filter(c => c.id !== id)
  }

  const addAuthor = (author: Author) => {
    authors.value.push(author)
  }

  const updateAuthor = (author: Author) => {
    const idx = authors.value.findIndex(a => a.id === author.id)
    if (idx !== -1) authors.value[idx] = author
  }

  const deleteAuthor = (id: string) => {
    authors.value = authors.value.filter(a => a.id !== id)
  }

  return {
    articles,
    categories,
    authors,
    isLoading,
    initStore,
    featured,
    latest,
    popular,
    gridArticles,
    findBySlug,
    search,
    getCategoryWithCount,
    findAuthorById: (id: string) => authors.value.find((a) => a.id === id),
    findArticlesByAuthor: (id: string) => articles.value.filter((a) => a.author.id === id),
    addArticle,
    updateArticle,
    deleteArticle,
    addCategory,
    updateCategory,
    deleteCategory,
    addAuthor,
    updateAuthor,
    deleteAuthor,
  }
})
