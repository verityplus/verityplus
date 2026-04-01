/**
 * Verity+ Article Store
 * Centralized Pinia store — single source of truth for all article data.
 */
import { defineStore } from 'pinia'
import { computed } from 'vue'
import {
  ARTICLES,
  CATEGORIES,
  AUTHORS,
  getFeaturedArticles,
  getLatestArticles,
  getPopularArticles,
  getArticleBySlug,
  getGridArticles,
  getCategoryArticleCount,
} from '@/data/mock'
import type { Article, Category } from '@/types'

export const useArticleStore = defineStore('articles', () => {
  // --- State (all reactive via computed from mock data) ---
  const articles = computed(() => ARTICLES)
  const categories = computed(() => CATEGORIES)
  const authors = computed(() => AUTHORS)

  // --- Getters ---
  const featured = computed(() => getFeaturedArticles())
  const latest = computed(() => getLatestArticles(4))
  const popular = computed(() => getPopularArticles(5))
  const gridArticles = computed(() => getGridArticles(8))

  // --- Actions ---
  function findBySlug(slug: string): Article | undefined {
    return getArticleBySlug(slug)
  }

  function filterByCategory(categorySlug: string): Article[] {
    return ARTICLES.filter((a) => a.category.slug === categorySlug)
  }

  function search(query: string): Article[] {
    const q = query.toLowerCase().trim()
    if (!q) return []
    return ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q)) ||
        a.category.name.toLowerCase().includes(q),
    )
  }

  function getCategoryWithCount(): { category: Category; count: number }[] {
    return CATEGORIES.map((c) => ({
      category: c,
      count: getCategoryArticleCount(c.slug),
    })).filter((c) => c.count > 0)
  }

  return {
    articles,
    categories,
    authors,
    featured,
    latest,
    popular,
    gridArticles,
    findBySlug,
    filterByCategory,
    search,
    getCategoryWithCount,
  }
})
