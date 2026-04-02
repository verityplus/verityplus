import { defineComponent, computed, ref, watch } from 'vue'
import { useArticleStore } from '../store/article.store'
import { ArticleCard } from './ArticleCard'
import type { Article } from '@/shared/types'

/**
 * Feature Component: ArticleGrid
 * Responsive grid of articles with category filtering capability and pagination.
 */
export const ArticleGrid = defineComponent({
  name: 'ArticleGrid',
  setup() {
    const store = useArticleStore()
    const activeCategory = ref('all')

    const nonFeaturedArticles = computed(() => store.articles.filter((a: Article) => !a.isFeatured))

    const filteredArticles = computed(() => {
      const articles =
        activeCategory.value === 'all'
          ? nonFeaturedArticles.value
          : store.articles.filter((a: Article) => a.category.slug === activeCategory.value)
      const start = (store.gridPage - 1) * 8
      return articles.slice(start, start + 8)
    })

    const totalFilteredArticles = computed(() => {
      return activeCategory.value === 'all'
        ? nonFeaturedArticles.value.length
        : store.articles.filter((a: Article) => a.category.slug === activeCategory.value).length
    })

    const totalPages = computed(() => Math.ceil(totalFilteredArticles.value / 8))

    const categories = computed(() => [
      { id: 'all', name: 'Semua', slug: 'all' },
      ...store.categories,
    ])

    // Reset to page 1 when category changes
    watch(activeCategory, () => {
      store.gridPage = 1
    })

    return () => (
      <section class="bg-background-alt py-12">
        <div class="container-page">
          {/* Section Header */}
          <div class="mb-10 text-center">
            <h2 class="text-3xl font-extrabold text-text-primary sm:text-4xl">Jelajahi Artikel</h2>
            <p class="mt-3 text-lg text-text-muted">
              Wawasan terbaru seputar teknologi, bisnis, dan gaya hidup.
            </p>
          </div>

          {/* Category Filter */}
          <div class="flex items-center justify-center h-10 overflow-x-auto no-scrollbar gap-2 mb-10">
            {categories.value.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  activeCategory.value = cat.slug
                }}
                class={[
                  'h-full px-5 text-sm font-bold transition-all duration-300 rounded-full cursor-pointer whitespace-nowrap border-2',
                  activeCategory.value === cat.slug
                    ? 'bg-primary text-text-inverse border-primary shadow-lg shadow-primary/20 scale-105'
                    : 'bg-surface text-text-muted border-transparent hover:border-border hover:text-text-primary',
                ]}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Article Grid */}
          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredArticles.value.map((article: Article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          {/* Empty State */}
          {filteredArticles.value.length === 0 && (
            <div class="text-center py-20 bg-surface rounded-xl border border-border">
              <i class="bi bi-journal-x text-4xl text-text-muted mb-4 block"></i>
              <p class="text-text-muted">Tidak ada artikel dalam kategori ini.</p>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages.value > 1 && (
            <div class="flex items-center justify-center mt-12 pt-8 border-t border-border/50">
              <button
                onClick={() => {
                  store.gridPrevPage()
                }}
                disabled={store.gridPage === 1}
                class={[
                  'px-5 py-2.5 rounded-xl text-sm font-bold transition cursor-pointer border border-border',
                  store.gridPage === 1
                    ? 'opacity-50 cursor-not-allowed text-text-muted bg-surface-muted'
                    : 'text-text-primary bg-surface hover:bg-surface-hover hover:border-primary/30',
                ]}
              >
                <i class="bi bi-chevron-left mr-1"></i> Sebelumnya
              </button>
              <button
                onClick={() => {
                  store.gridNextPage()
                }}
                disabled={store.gridPage === totalPages.value}
                class={[
                  'px-5 py-2.5 rounded-xl text-sm font-bold transition cursor-pointer border border-border',
                  store.gridPage === totalPages.value
                    ? 'opacity-50 cursor-not-allowed text-text-muted bg-surface-muted'
                    : 'text-text-primary bg-surface hover:bg-surface-hover hover:border-primary/30',
                ]}
              >
                Selanjutnya <i class="bi bi-chevron-right ml-1"></i>
              </button>
            </div>
          )}
        </div>
      </section>
    )
  },
})
