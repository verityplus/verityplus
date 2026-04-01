import { defineComponent, computed, ref } from 'vue'
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
    const store = useArticleStore()
    const activeCategory = ref('all')

    const filteredArticles = computed(() => {
      if (activeCategory.value === 'all') return store.gridArticles
      return store.articles.filter((a: Article) => a.category.slug === activeCategory.value).slice(0, 8)
    })

    const categories = computed(() => [
      { id: 'all', name: 'Semua', slug: 'all' },
      ...store.categories
    ])

    return () => (
      <section class="bg-background-alt py-12">
        <div class="container-page">
          {/* Section Header */}
          <div class="mb-10 text-center">
            <h2 class="text-3xl font-extrabold text-text-primary sm:text-4xl">Jelajahi Artikel</h2>
            <p class="mt-3 text-lg text-text-muted">Wawasan terbaru seputar teknologi, bisnis, dan gaya hidup.</p>
          </div>

          {/* Category Filter */}
          <div class="flex items-center justify-center h-10 overflow-x-auto no-scrollbar gap-2 mb-10">
            {categories.value.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { activeCategory.value = cat.slug }}
                class={[
                  'h-full px-5 text-sm font-bold transition-all duration-300 rounded-full cursor-pointer whitespace-nowrap border-2',
                  activeCategory.value === cat.slug
                    ? 'bg-primary text-text-inverse border-primary shadow-lg shadow-primary/20 scale-105'
                    : 'bg-surface text-text-muted border-transparent hover:border-border hover:text-text-primary'
                ]}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Article Grid */}
          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredArticles.value.map((article: Article) => (
              <ArticleCard 
                key={article.id} 
                article={article} 
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredArticles.value.length === 0 && (
            <div class="text-center py-20 bg-surface rounded-xl border border-border">
              <i class="bi bi-journal-x text-4xl text-text-muted mb-4 block"></i>
              <p class="text-text-muted">Tidak ada artikel dalam kategori ini.</p>
            </div>
          )}
        </div>
      </section>
    )
  },
})
