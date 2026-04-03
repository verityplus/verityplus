import { defineComponent, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useArticleStore } from '../store/article.store'
import { ArticleCard } from './ArticleCard'
import type { Article } from '@/shared/types'

/**
 * Feature Component: ArticleGrid
 * Responsive grid of articles with category filtering capability.
 */
export const ArticleGrid = defineComponent({
  name: 'ArticleGrid',
  setup() {
    const router = useRouter()
    const store = useArticleStore()
    const activeCategory = ref('all')

    const nonFeaturedArticles = computed(() =>
      store.articles.filter((a: Article) => a.status !== 'featured'),
    )

    const displayedArticles = computed(() => {
      return activeCategory.value === 'all'
        ? nonFeaturedArticles.value
        : store.articles.filter((a: Article) => a.category.slug === activeCategory.value)
    })

    const categories = computed(() => [
      { id: 'all', name: 'Semua', slug: 'all' },
      ...store.categories,
    ])

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
            {displayedArticles.value.map((article: Article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          {/* Empty State */}
          {displayedArticles.value.length === 0 && (
            <div class="text-center py-20 bg-surface rounded-xl border border-border">
              <i class="bi bi-journal-x text-4xl text-text-muted mb-4 block"></i>
              <p class="text-text-muted">Tidak ada artikel dalam kategori ini.</p>
            </div>
          )}

          {/* Lihat Selengkapnya Button */}
          {displayedArticles.value.length > 0 && (
            <div class="flex items-center justify-center mt-12">
              <button
                onClick={() => {
                  const target =
                    activeCategory.value === 'all'
                      ? '/articles'
                      : `/categories/${activeCategory.value}`
                  router.push(target)
                }}
                class="px-8 py-3 rounded-xl text-base font-bold text-text-inverse bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 cursor-pointer"
              >
                Lihat Selengkapnya <i class="bi bi-arrow-right ml-2"></i>
              </button>
            </div>
          )}
        </div>
      </section>
    )
  },
})
