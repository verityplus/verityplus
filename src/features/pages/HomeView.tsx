import { defineComponent, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@/composables/useHead'
import { AdDisplay } from '@/features/ads/components/AdDisplay'
import { AD_SLOTS } from '@/features/ads/services/ad.service'
import { HeadlineCarousel } from '@/features/article/components/HeadlineCarousel'
import { ArticleCard } from '@/features/article/components/ArticleCard'
import { ArticleGrid } from '@/features/article/components/ArticleGrid'
import { InstagramEmbed } from '@/features/social/components/InstagramEmbed'
import { useArticleStore } from '@/features/article/store/article.store'
import { useLocaleRoute } from '@/composables/useLocaleRoute'
import { useLocalizedField } from '@/composables/useLocalizedField'

/**
 * Page View: HomeView
 * Main entry point for the blog portal.
 */
export default defineComponent({
  name: 'HomeView',
  setup() {
    const { t } = useI18n()
    const { push } = useLocaleRoute()
    const store = useArticleStore()
    const { getLocalizedField } = useLocalizedField()

    useHead({
      title: t('common.homeTitle'),
      meta: [
        {
          name: 'description',
          content: t('common.homeDesc'),
        },
      ],
    })

    onMounted(async () => {

    })

    return () => (
      <main class="bg-background">

        <div class="container-page py-6">
          <div class="flex flex-col xl:flex-row gap-8">

            <section class="xl:w-2/3 w-full flex flex-col gap-6">
              <div class="hero-height">
                <HeadlineCarousel />
              </div>

              <div class="border border-border rounded-[var(--radius-xl)] p-6 bg-surface">
                <div class="section-header border-b border-border pb-3 mb-6">
                  <span class="section-header-title">{t('home.latestArticles')}</span>
                </div>

                <div class="space-y-8">
                  {store.latest.map((item) => (
                    <ArticleCard key={item.id} article={item} layout="horizontal" />
                  ))}
                </div>


                <div class="flex items-center justify-end mt-8 pt-6 border-t border-border">
                  <button
                    onClick={() => push('/articles')}
                    class="px-8 py-3 rounded-xl text-base font-bold text-text-inverse bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 cursor-pointer"
                  >
                    {t('common.seeAll')} <i class="bi bi-arrow-right ml-2"></i>
                  </button>
                </div>
              </div>
            </section>


            <aside class="xl:w-1/3 w-full">
              <div class="flex flex-col gap-4 sticky top-20">
                <AdDisplay size="banner" slot={AD_SLOTS.HOME_HEADER} label={t('ads.header')} />


                <div class="rounded-[var(--radius-xl)] bg-surface border border-border p-5">
                  <div class="section-header">
                    <span class="section-header-title">{t('home.popularArticles')}</span>
                  </div>
                  <div class="space-y-5">
                    {store.popular.map((item, index) => (
                      <router-link
                        to={{ name: 'read', params: { id: item.id } }}
                        key={item.id}
                        class="flex gap-4 group"
                      >
                        <span class="text-3xl font-black text-surface-muted group-hover:text-primary transition leading-none tabular-nums">
                          {(index + 1).toString().padStart(2, '0')}
                        </span>
                        <div class="flex-1 min-w-0">
                          <h4 class="text-sm font-bold leading-snug text-text-primary group-hover:text-primary transition line-clamp-2">
                            {getLocalizedField(item, 'title')}
                          </h4>
                          <span class="text-xs text-text-muted mt-1 block">
                            {item.readTimeMinutes} {t('common.minRead')}
                          </span>
                        </div>
                      </router-link>
                    ))}
                  </div>
                </div>

                <AdDisplay size="sidebar" slot={AD_SLOTS.HOME_SIDEBAR} label={t('ads.middle')} />
                <div class="ad-skyscraper-height">
                  <InstagramEmbed />
                </div>
              </div>
            </aside>
          </div>
        </div>


        <ArticleGrid />


        <div class="container-page py-10">
          <AdDisplay size="leaderboard" slot={AD_SLOTS.HOME_FOOTER} label={t('ads.footer')} />
        </div>
      </main>
    )
  },
})
