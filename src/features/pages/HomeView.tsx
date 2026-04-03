import { defineComponent, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useHead } from '@/composables/useHead'
import { AdDisplay } from '@/features/ads/components/AdDisplay'
import { HeadlineCarousel } from '@/features/article/components/HeadlineCarousel'
import { ArticleCard } from '@/features/article/components/ArticleCard'
import { ArticleGrid } from '@/features/article/components/ArticleGrid'
import { InstagramEmbed } from '@/features/social/components/InstagramEmbed'
import { useArticleStore } from '@/features/article/store/article.store'
import type { Article } from '@/shared/types'

/**
 * Page View: HomeView
 * Main entry point for the blog portal.
 */
export default defineComponent({
  name: 'HomeView',
  setup() {
    const router = useRouter()
    const store = useArticleStore()

    useHead({
      title: 'Verity+ — Portal Artikel Terkini',
      meta: [
        {
          name: 'description',
          content: 'Artikel terkini seputar teknologi, bisnis, gaya hidup, dan olahraga.',
        },
      ],
    })

    onMounted(async () => {
      if (store.articles.length === 0) {
        await store.initStore()
      }
    })

    return () => (
      <main class="bg-background">
        {/* Top Hero Section */}
        <div class="container-page py-6">
          <div class="flex flex-col xl:flex-row gap-8">
            {/* Main Area */}
            <section class="xl:w-2/3 w-full flex flex-col gap-6">
              <div class="hero-height">
                <HeadlineCarousel />
              </div>

              <div class="border border-border rounded-[var(--radius-xl)] p-6 bg-surface">
                <div class="section-header border-b border-border pb-3 mb-6">
                  <span class="section-header-title">Artikel Terbaru</span>
                </div>

                <div class="space-y-8">
                  {store.latest.map((item) => (
                    <ArticleCard key={item.id} article={item} layout="horizontal" />
                  ))}
                </div>

                {/* Lihat Semua Button */}
                <div class="flex items-center justify-center mt-8 pt-6 border-t border-border">
                  <button
                    onClick={() => router.push('/articles')}
                    class="px-8 py-3 rounded-xl text-base font-bold text-text-inverse bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 cursor-pointer"
                  >
                    Lihat Semua <i class="bi bi-arrow-right ml-2"></i>
                  </button>
                </div>
              </div>
            </section>

            {/* Sidebar View Area */}
            <aside class="xl:w-1/3 w-full">
              <div class="flex flex-col gap-4 sticky top-20">
                <AdDisplay size="banner" label="Iklan Header" />

                {/* Popular Articles Widget */}
                <div class="rounded-[var(--radius-xl)] bg-surface border border-border p-5">
                  <div class="section-header">
                    <span class="section-header-title">Bacaan Populer</span>
                  </div>
                  <div class="space-y-5">
                    {store.popular.map((item, index) => (
                      <router-link
                        to={{ name: 'read', params: { slug: item.slug } }}
                        key={item.id}
                        class="flex gap-4 group"
                      >
                        <span class="text-3xl font-black text-surface-muted group-hover:text-primary transition leading-none tabular-nums">
                          {(index + 1).toString().padStart(2, '0')}
                        </span>
                        <div class="flex-1 min-w-0">
                          <h4 class="text-sm font-bold leading-snug text-text-primary group-hover:text-primary transition line-clamp-2">
                            {item.title}
                          </h4>
                          <span class="text-xs text-text-muted mt-1 block">
                            {item.readTimeMinutes} min baca
                          </span>
                        </div>
                      </router-link>
                    ))}
                  </div>
                </div>

                <AdDisplay size="sidebar" label="Iklan Tengah" />
                <div class="ad-skyscraper-height">
                  <InstagramEmbed />
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Dynamic Grid Section */}
        <ArticleGrid />

        {/* Footer Ad Placement */}
        <div class="container-page py-10">
          <AdDisplay size="leaderboard" label="Iklan Penutup" />
        </div>
      </main>
    )
  },
})
