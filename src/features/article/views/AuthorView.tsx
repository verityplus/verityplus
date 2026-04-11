import { defineComponent, ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useHead } from '@/composables/useHead'
import { useArticleStore } from '@/features/article/store/article.store'
import { ArticleCard } from '@/features/article/components/ArticleCard'
import { AdDisplay } from '@/features/ads/components/AdDisplay'
import { AD_SLOTS } from '@/features/ads/services/ad.service'
import { useLocalizedField } from '@/composables/useLocalizedField'
import { BaseImage } from '@/components/ui/Image'
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
    const { t } = useI18n()
    const { getLocalizedField } = useLocalizedField()

    const author = ref<Author | null>(null)
    const authorArticles = ref<Article[]>([])

    watch(
      () => route.params.id,
      (id) => {
        if (id) {
          author.value = store.findAuthorById(id as string) || null
          authorArticles.value = store.findArticlesByAuthor(id as string)
        }
      },
      { immediate: true },
    )

    useHead({
      title: computed(() =>
        author.value
          ? t('common.authorTitle', { name: author.value.name })
          : t('common.authorTitle', { name: '' }),
      ),
      meta: computed(() => [
        {
          name: 'description',
          content: author.value
            ? getLocalizedField(author.value, 'bio')
            : t('common.authorDesc', { name: '' }),
        },
      ]),
    })

    return () => {
      if (!author.value) {
        return (
          <div class="min-h-screen flex items-center justify-center bg-background">
            <div class="text-center">
              <i class="bi bi-person-x text-6xl text-text-muted mb-4 block"></i>
              <h2 class="text-2xl font-bold text-text-primary">{t('common.authorNotFound')}</h2>
              <router-link to="/" class="btn-primary mt-6">
                {t('common.backToHome')}
              </router-link>
            </div>
          </div>
        )
      }

      return (
        <main class="bg-background min-h-screen py-12">
          <div class="container-page">
            <div class="bg-surface rounded-2xl border border-border p-8 sm:p-12 mb-12 shadow-card">
              <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div class="w-32 h-32 shrink-0 overflow-hidden rounded-full border-4 border-primary/10 shadow-lg">
                  <BaseImage
                    src={author.value.avatar}
                    alt={author.value.name}
                    isProfile
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
                      <span class="block text-xl font-black text-text-primary tabular-nums">
                        {authorArticles.value.length}
                      </span>
                      <span class="text-[10px] text-text-muted uppercase font-bold tracking-tighter">
                        {t('common.totalArticles')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-12">
              <AdDisplay size="leaderboard" slot={AD_SLOTS.CATEGORY_TOP} label={t('ads.authorSponsor')} />
            </div>

            <div class="section-header mb-8">
              <span class="section-header-title">
                {t('article.articlesBy')} {author.value.name}
              </span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {authorArticles.value.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            <div class="pt-8 border-t border-border">
              <AdDisplay size="leaderboard" slot={AD_SLOTS.HOME_FOOTER} label={t('ads.exclusivePromo')} />
            </div>
          </div>
        </main>
      )
    }
  },
})
