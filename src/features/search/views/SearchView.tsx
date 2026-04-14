import { defineComponent, ref, computed, watchEffect } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useHead } from '@/composables/useHead'
import { useArticleStore } from '@/features/article/store/article.store'
import { AdDisplay } from '@/features/ads/components/AdDisplay'
import { AD_SLOTS } from '@/features/ads/services/ad.service'
import { BaseBadge } from '@/components/ui/Badge'
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
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    const search = async () => {
      if (!query.value) {
        results.value = []
        return
      }

      isLoading.value = true
      error.value = null
      try {
        results.value = await store.search(query.value)
      } catch (err) {
        console.error('Search failed:', err)
        error.value = t('common.errorLoading')
        results.value = []
      } finally {
        isLoading.value = false
      }
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

            <div class="flex-grow space-y-6">
              {isLoading.value && (
                <div class="flex flex-col items-center justify-center py-24">
                  <div class="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                  <p class="mt-4 text-text-muted font-medium animate-pulse">{t('common.loading')}</p>
                </div>
              )}

              {!isLoading.value && error.value && (
                <div class="text-center py-24 bg-red-50/10 rounded-xl border border-red-200/20">
                  <i class="bi bi-exclamation-triangle text-4xl text-red-500 mb-4 block"></i>
                  <p class="text-red-500 font-bold">{error.value}</p>
                  <button
                    onClick={() => search()}
                    class="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    {t('common.retry')}
                  </button>
                </div>
              )}

              {!isLoading.value && !error.value && results.value.map((article: Article) => (
                <article key={article.id} class="group">
                  <RouterLink
                    to={{ name: 'read', params: { id: article.id } }}
                    class="flex flex-col md:flex-row gap-6 p-4 rounded-xl hover:bg-surface-hover transition duration-300 border border-transparent hover:border-border"
                  >
                    <div class="w-full md:w-64 h-44 shrink-0 overflow-hidden rounded-lg bg-surface-muted">
                      <BaseImage
                        src={article.coverImage ?? undefined}
                        alt={getLocalizedField(article, 'title')}
                        class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />

                    </div>

                    <div class="flex flex-col justify-center flex-1">
                      <div class="flex items-center gap-3 mb-2 text-sm">
                        <RouterLink
                          to={{ name: 'category', params: { id: article.category?.id || '' } }}
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

              {!isLoading.value && !error.value && results.value.length === 0 && (
                <div class="text-center py-24 bg-surface rounded-xl border border-border shadow-sm">
                  <i class="bi bi-search text-5xl text-text-muted mb-4 block"></i>
                  <p class="text-text-muted text-xl font-bold">{t('search.noResults')}</p>
                  <p class="text-text-muted text-sm mt-1">{t('search.noResultsDesc')}</p>
                </div>
              )}
            </div>


            <aside class="w-full lg:w-80 space-y-8">

              <div>
                <div class="section-header">
                  <span class="section-header-title">{t('common.popularCategories')}</span>
                </div>
                <ul class="space-y-1">
                  {categoriesWithCount.value.map((catInfo) => (
                    <li
                      key={catInfo.category.id}
                      class="flex items-center p-3 rounded-lg hover:bg-surface-hover transition group"
                    >
                      <RouterLink
                        to={{ name: 'category', params: { id: catInfo.category.id } }}
                        class="no-underline w-full flex items-center"
                      >
                        <span class="text-text-secondary font-medium group-hover:text-primary transition">
                          {getLocalizedField(catInfo.category, 'name')}
                        </span>
                      </RouterLink>
                    </li>
                  ))}
                </ul>
              </div>


              <AdDisplay size="sidebar" slot={AD_SLOTS.SEARCH_RESULTS} label={t('ads.sidePromo')} />
            </aside>
          </div>
        </div>
      </section>
    )
  },
})
