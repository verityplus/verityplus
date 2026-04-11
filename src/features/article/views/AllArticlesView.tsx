import { defineComponent, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useHead } from '@/composables/useHead'
import { useArticleStore } from '@/features/article/store/article.store'
import { ArticleCard } from '@/features/article/components/ArticleCard'
import { AdDisplay } from '@/features/ads/components/AdDisplay'
import { AD_SLOTS } from '@/features/ads/services/ad.service'
import type { Article } from '@/shared/types'

const ARTICLES_PER_PAGE = 9

export default defineComponent({
  name: 'AllArticlesView',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useArticleStore()
    const { t } = useI18n()

    const currentPage = computed(() => {
      const page = parseInt(route.query.page as string, 10)
      return page > 0 ? page : 1
    })

    const nonFeaturedArticles = computed(() =>
      store.articles.filter((a: Article) => a.status !== 'featured'),
    )

    const totalPages = computed(() =>
      Math.max(1, Math.ceil(nonFeaturedArticles.value.length / ARTICLES_PER_PAGE)),
    )

    const paginatedArticles = computed(() => {
      const start = (currentPage.value - 1) * ARTICLES_PER_PAGE
      return nonFeaturedArticles.value.slice(start, start + ARTICLES_PER_PAGE)
    })

    const navigateToPage = (page: number) => {
      router.push({ query: { page: String(page) } })
    }

    useHead({
      title: t('common.allArticlesTitle'),
      meta: [
        {
          name: 'description',
          content: t('common.allArticlesDesc'),
        },
      ],
    })

    return () => (
      <main class="bg-background min-h-screen py-12">
        <div class="container-page">
          <div class="bg-surface rounded-2xl border border-border p-8 sm:p-12 mb-12 shadow-card">
            <div>
              <h1 class="text-3xl sm:text-4xl font-extrabold text-text-primary">
                {t('common.allArticles')}
              </h1>
              <p class="mt-3 text-lg text-text-muted">{t('common.allArticlesDesc')}</p>
            </div>
          </div>

          <div class="mb-12">
            <AdDisplay size="leaderboard" slot={AD_SLOTS.CATEGORY_TOP} label={t('ads.sponsor')} />
          </div>

          {paginatedArticles.value.length > 0 ? (
            <>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {paginatedArticles.value.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>

              {totalPages.value > 1 && (
                <div class="flex items-center justify-between py-4 border-t border-border/50">
                  <button
                    onClick={() => navigateToPage(currentPage.value - 1)}
                    disabled={currentPage.value === 1}
                    class={[
                      'px-5 py-2.5 rounded-xl text-sm font-bold transition border border-border',
                      currentPage.value === 1
                        ? 'opacity-50 cursor-not-allowed text-text-muted bg-surface-muted'
                        : 'text-text-primary bg-surface hover:bg-surface-hover hover:border-primary/30 cursor-pointer',
                    ]}
                  >
                    <i class="bi bi-chevron-left mr-1"></i> {t('common.previous')}
                  </button>

                  <button
                    onClick={() => navigateToPage(currentPage.value + 1)}
                    disabled={currentPage.value >= totalPages.value}
                    class={[
                      'px-5 py-2.5 rounded-xl text-sm font-bold transition border border-border',
                      currentPage.value >= totalPages.value
                        ? 'opacity-50 cursor-not-allowed text-text-muted bg-surface-muted'
                        : 'text-text-primary bg-surface hover:bg-surface-hover hover:border-primary/30 cursor-pointer',
                    ]}
                  >
                    {t('common.next')} <i class="bi bi-chevron-right ml-1"></i>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div class="text-center py-16 mb-16">
              <i class="bi bi-journal-x text-5xl text-text-muted mb-4 block"></i>
              <h3 class="text-xl font-bold text-text-primary mb-2">{t('common.noArticles')}</h3>
              <p class="text-text-muted">{t('common.noArticlesDesc')}</p>
            </div>
          )}

          <div class="pt-8 border-t border-border">
            <AdDisplay size="leaderboard" slot={AD_SLOTS.HOME_FOOTER} label={t('ads.exclusivePromo')} />
          </div>
        </div>
      </main>
    )
  },
})
