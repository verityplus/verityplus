import { defineComponent, ref, computed, watchEffect } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useHead } from '@/composables/useHead'
import { useArticleStore } from '@/features/article/store/article.store'
import { AdDisplay } from '@/features/ads/components/AdDisplay'
import { BaseBadge } from '@/components/ui/Badge'
import { BaseButton } from '@/components/ui/Button'
import { useLocalizedField } from '@/composables/useLocalizedField'
import { BaseImage } from '@/components/ui/Image'
import type { Article } from '@/shared/types'

import { SearchInput } from '../components/SearchInput'

/**
 * Page View: SearchView
 * Dynamic search results with category overview.
 */
export default defineComponent({
  name: 'SearchView',
  setup() {
    const route = useRoute()
    const store = useArticleStore()
    const { t } = useI18n()
    const { getLocalizedField } = useLocalizedField()

    const query = ref((route.query.q as string) || '')
    const results = ref<Article[]>([])

    const search = async () => {
      results.value = await store.search(query.value)
    }

    watchEffect(() => {
      query.value = (route.query.q as string) || ''
      search()
    })

    useHead({
      title: computed(() =>
        query.value
          ? t('common.searchTitleQuery', { query: query.value })
          : t('common.searchTitle'),
      ),
      meta: [
        {
          name: 'description',
          content: computed(() => t('common.searchDesc', { query: query.value })),
        },
      ],
    })

    const categoriesWithCount = computed(() => store.getCategoryWithCount)

    return () => (
      <section class="bg-background min-h-screen py-12">
        <div class="container-page">
          {/* Search Header Area */}
          <div class="mb-12 border-b border-border pb-10">
            <h1 class="text-3xl sm:text-4xl font-extrabold text-text-primary mb-4">
              {t('search.heading')}
            </h1>
            {(query.value && (
              <p class="text-lg text-text-secondary mb-6">
                {t('search.showingResults')}{' '}
                <span class="font-bold text-primary">"{query.value}"</span>
              </p>
            )) || <p class="text-lg text-text-secondary mb-6">{t('search.enterQuery')}</p>}

            <div class="max-w-2xl relative">
              <SearchInput />
            </div>
          </div>

          <div class="flex flex-col lg:flex-row gap-12">
            {/* Main Result Area */}
            <div class="flex-grow space-y-6">
              {results.value.map((article: Article) => (
                <article key={article.id} class="group">
                  <RouterLink
                    to={{ name: 'read', params: { slug: article.slug } }}
                    class="flex flex-col md:flex-row gap-6 p-4 rounded-xl hover:bg-surface-hover transition duration-300 border border-transparent hover:border-border"
                  >
                    <div class="w-full md:w-64 h-44 shrink-0 overflow-hidden rounded-lg bg-surface-muted">
                      <BaseImage
                        src={article.coverImage}
                        alt={getLocalizedField(article, 'title')}
                        class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />

                    </div>

                    <div class="flex flex-col justify-center flex-1">
                      <div class="flex items-center gap-3 mb-2 text-sm">
                        <RouterLink
                          to={{ name: 'category', params: { slug: article.category.slug } }}
                          class="no-underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <BaseBadge>
                            {getLocalizedField(article.category, 'name')}
                          </BaseBadge>
                        </RouterLink>
                        <span class="text-text-muted">{article.publishedAt}</span>
                      </div>
                      <h2 class="text-xl font-bold text-text-primary mb-2 group-hover:text-primary transition leading-tight">
                        {getLocalizedField(article, 'title')}
                      </h2>
                      <p class="text-text-secondary line-clamp-2 mb-4 text-sm leading-relaxed">
                        {getLocalizedField(article, 'excerpt')}
                      </p>
                      <div class="flex items-center gap-2 text-xs font-bold text-text-primary uppercase tracking-wide group/link">
                        {t('common.readMore')}
                        <i class="bi bi-arrow-right group-hover/link:translate-x-1 transition-transform"></i>
                      </div>
                    </div>
                  </RouterLink>
                </article>
              ))}

              {results.value.length === 0 && (
                <div class="text-center py-24 bg-surface rounded-xl border border-border shadow-sm">
                  <i class="bi bi-search text-5xl text-text-muted mb-4 block"></i>
                  <p class="text-text-muted text-xl font-bold">{t('search.noResults')}</p>
                  <p class="text-text-muted text-sm mt-1">{t('search.noResultsDesc')}</p>
                </div>
              )}
            </div>

            {/* Sidebar Overview Area */}
            <aside class="w-full lg:w-80 space-y-8">
              {/* Category Count Overview */}
              <div>
                <div class="section-header">
                  <span class="section-header-title">{t('common.popularCategories')}</span>
                </div>
                <ul class="space-y-1">
                  {categoriesWithCount.value.map((catInfo) => (
                    <li
                      key={catInfo.category.id}
                      class="flex justify-between items-center p-3 rounded-lg hover:bg-surface-hover transition group"
                    >
                      <RouterLink
                        to={{ name: 'category', params: { slug: catInfo.category.slug } }}
                        class="no-underline w-full flex justify-between items-center"
                      >
                        <span class="text-text-secondary font-medium group-hover:text-primary transition">
                          {getLocalizedField(catInfo.category, 'name')}
                        </span>
                        <span class="text-xs font-bold bg-surface-muted px-2.5 py-1 rounded-md text-text-muted">
                          {catInfo.count}
                        </span>
                      </RouterLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter Call-to-Action */}
              <div class="bg-text-primary p-8 rounded-xl text-text-inverse relative overflow-hidden">
                <div class="relative z-10">
                  <h3 class="text-xl font-bold mb-3 leading-tight">
                    {t('common.subscribeNewsletter')}
                  </h3>
                  <p class="text-white/50 text-sm mb-6 leading-relaxed">
                    {t('common.subscribeNewsletterDesc')}
                  </p>
                  <input
                    type="email"
                    placeholder={t('common.emailYour')}
                    class="w-full px-4 py-3 rounded-lg bg-white/10 border-none text-white focus:ring-2 focus:ring-primary mb-3 outline-none transition placeholder-white/40 text-sm"
                  />
                  <BaseButton fullWidth variant="primary">
                    {t('common.joinNow')}
                  </BaseButton>
                </div>
                <div class="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
              </div>

              <AdDisplay size="sidebar" label={t('ads.sidePromo')} />
            </aside>
          </div>
        </div>
      </section>
    )
  },
})
