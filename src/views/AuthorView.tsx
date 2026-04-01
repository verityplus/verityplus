import { defineComponent, ref, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useArticleStore } from '@/features/article/store/article.store'
import { ArticleCard } from '@/features/article/components/ArticleCard'
import { AdDisplay } from '@/features/ads/components/AdDisplay'
import type { Article, Author } from '@/shared/types'

/**
 * Page View: AuthorView
 * Displays details about an author and their published articles.
 */
export default defineComponent({
  name: 'AuthorView',
  setup() {
    const route = useRoute()
    const store = useArticleStore()
    
    const author = ref<Author | null>(null)
    const authorArticles = ref<Article[]>([])

    const loadAuthorData = () => {
      const id = route.params.id as string
      author.value = store.findAuthorById(id) || null
      authorArticles.value = store.findArticlesByAuthor(id)
    }

    watchEffect(() => {
      loadAuthorData()
    })

    return () => {
      if (!author.value) {
        return (
          <div class="min-h-screen flex items-center justify-center bg-background">
            <div class="text-center">
              <i class="bi bi-person-x text-6xl text-text-muted mb-4 block"></i>
              <h2 class="text-2xl font-bold text-text-primary">Penulis Tidak Ditemukan</h2>
              <router-link to="/" class="btn-primary mt-6">Kembali ke Beranda</router-link>
            </div>
          </div>
        )
      }

      return (
        <main class="bg-background min-h-screen py-12">
          <div class="container-page">
            
            {/* Author Profile Header */}
            <div class="bg-surface rounded-2xl border border-border p-8 sm:p-12 mb-12 shadow-card">
              <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div class="w-32 h-32 shrink-0 overflow-hidden rounded-full border-4 border-primary/10 shadow-lg">
                  <img 
                    src={author.value.avatar} 
                    alt={author.value.name} 
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="flex-grow text-center md:text-left">
                  <h1 class="text-3xl sm:text-4xl font-extrabold text-text-primary mb-3">
                    {author.value.name}
                  </h1>
                  <p class="text-text-muted font-medium mb-6">
                    {author.value.role || 'Content Creator & Tech Enthusiast'}
                  </p>
                  
                  <div class="flex flex-wrap justify-center md:justify-start gap-4">
                    <div class="bg-background px-4 py-2 rounded-lg border border-border">
                      <span class="block text-xl font-black text-text-primary tabular-nums">{authorArticles.value.length}</span>
                      <span class="text-[10px] text-text-muted uppercase font-bold tracking-tighter">Total Artikel</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Intermediate Ad Placement */}
            <div class="mb-12">
              <AdDisplay size="leaderboard" label="Sponsor Penulis" />
            </div>

            {/* Articles by Author */}
            <div class="section-header mb-8">
              <span class="section-header-title">Artikel Oleh {author.value.name}</span>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {authorArticles.value.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {/* Bottom Ad Placement */}
            <div class="pt-8 border-t border-border">
              <AdDisplay size="leaderboard" label="Promo Eksklusif" />
            </div>
          </div>
        </main>
      )
    }
  },
})
