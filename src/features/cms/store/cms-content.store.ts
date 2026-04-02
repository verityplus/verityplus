import { defineStore } from 'pinia'
import { useArticleStore } from '@/features/article/store/article.store'
import type { Article, Category, Author } from '@/shared/types'

/**
 * CMSContentStore: Dedicated store for CMS content mutations.
 * Delegates all mutations to ArticleStore to ensure state consistency.
 * This prevents disconnected state between CMS operations and article display.
 */
export const useCMSContentStore = defineStore('cms-content', () => {
  // Delegate to ArticleStore for shared state consistency
  const articleStore = useArticleStore()

  // --- Article Mutations (delegated to ArticleStore) ---

  const addArticle = (article: Article) => {
    articleStore.articles.unshift(article)
  }

  const updateArticle = (article: Article) => {
    const idx = articleStore.articles.findIndex((a) => a.id === article.id)
    if (idx !== -1) articleStore.articles[idx] = article
  }

  const deleteArticle = (id: number) => {
    articleStore.articles = articleStore.articles.filter((a) => a.id !== id)
  }

  // --- Category Mutations (delegated to ArticleStore) ---

  const addCategory = (category: Category) => {
    articleStore.categories.push(category)
  }

  const updateCategory = (category: Category) => {
    const idx = articleStore.categories.findIndex((c) => c.id === category.id)
    if (idx !== -1) articleStore.categories[idx] = category
  }

  const deleteCategory = (id: string) => {
    articleStore.categories = articleStore.categories.filter((c) => c.id !== id)
  }

  // --- Author Mutations (delegated to ArticleStore) ---

  const addAuthor = (author: Author) => {
    articleStore.authors.push(author)
  }

  const updateAuthor = (author: Author) => {
    const idx = articleStore.authors.findIndex((a) => a.id === author.id)
    if (idx !== -1) articleStore.authors[idx] = author
  }

  const deleteAuthor = (id: string) => {
    articleStore.authors = articleStore.authors.filter((a) => a.id !== id)
  }

  return {
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
