import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useArticleStore } from '@/features/article/store/article.store'
import { AdDisplay } from '@/features/ads/components/AdDisplay'

/**
 * BrowseTopBar: Top bar visible on all pages except Home
 * Shows a megamenu with Featured, Latest, Popular, and Categories columns
 */
export const BrowseTopBar = defineComponent({
  name: 'BrowseTopBar',
  setup() {
    const store = useArticleStore()
    const router = useRouter()
    const { t, te } = useI18n()
    const isOpen = ref(false)
    const megamenuRef = ref<HTMLElement | null>(null)

    const toggleMegamenu = () => {
      isOpen.value = !isOpen.value
    }

    const closeMegamenu = () => {
      isOpen.value = false
    }

    const navigateToArticle = (slug: string) => {
      router.push({ name: 'read', params: { slug } })
      closeMegamenu()
    }

    const navigateToCategory = (slug: string) => {
      router.push({ name: 'category', params: { slug } })
      closeMegamenu()
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('[data-article-topbar]')) {
        closeMegamenu()
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    const articleItemClass =
      'flex items-start gap-3 p-3 rounded-lg hover:bg-surface-muted transition cursor-pointer group'

    return () => (
      <div data-article-topbar class="border-t border-border" ref={megamenuRef}>
        <div class="container-page">
          <div class="flex items-center gap-2 h-12">
            {/* Browse Megamenu Trigger */}
            <div class="relative">
              <button
                onClick={toggleMegamenu}
                class={[
                  'flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-text-primary hover:text-primary transition rounded-lg hover:bg-surface-muted cursor-pointer border border-transparent',
                  isOpen.value ? 'bg-surface-muted border-border text-primary' : '',
                ]}
              >
                <i class="bi bi-grid-3x3-gap-fill text-base" />
                <span>{t('topbar.browse')}</span>
                <i
                  class={[
                    'bi text-xs transition-transform',
                    isOpen.value ? 'bi-chevron-up' : 'bi-chevron-down',
                  ]}
                />
              </button>

              {/* Megamenu Panel */}
              {isOpen.value && (
                <div class="fixed inset-x-0 top-12 md:absolute md:inset-x-auto md:top-full md:left-0 md:mt-2 w-full md:w-[min(90vw,960px)] bg-surface border border-border rounded-none md:rounded-xl shadow-elevated z-50 overflow-hidden max-h-[calc(100vh-4rem)] md:max-h-80">
                  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 divide-y sm:divide-y-0 md:divide-x divide-border overflow-y-auto max-h-[calc(100vh-4rem)] md:max-h-80">
                    {/* Ad Slot */}
                    <div class="p-4">
                      <AdDisplay class="md:h-full h-32 w-full" label="Browse TopBar Ad" />
                    </div>

                    {/* Featured Column */}
                    <div class="p-4">
                      <div class="flex items-center gap-2 mb-3">
                        <i class="bi bi-star-fill text-yellow-500 text-sm" />
                        <h3 class="text-sm font-semibold text-text-primary uppercase tracking-wide">
                          {t('topbar.featured')}
                        </h3>
                      </div>
                      <div class="space-y-1">
                        {store.featured.length > 0 ? (
                          store.featured.slice(0, 5).map((article) => (
                            <div
                              onClick={() => navigateToArticle(article.slug)}
                              class={articleItemClass}
                            >
                              <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-text-primary group-hover:text-primary truncate transition-colors">
                                  {article.title}
                                </p>
                                <p class="text-xs text-text-muted mt-0.5">
                                  {article.author.name} &middot; {article.readTimeMinutes}{' '}
                                  {te('common.minRead') ? t('common.minRead') : 'min read'}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p class="text-sm text-text-muted py-2">{t('common.noArticles')}</p>
                        )}
                      </div>
                    </div>

                    {/* Latest Column */}
                    <div class="p-4">
                      <div class="flex items-center gap-2 mb-3">
                        <i class="bi bi-clock-fill text-blue-500 text-sm" />
                        <h3 class="text-sm font-semibold text-text-primary uppercase tracking-wide">
                          {t('topbar.latest')}
                        </h3>
                      </div>
                      <div class="space-y-1">
                        {store.latest.length > 0 ? (
                          store.latest.slice(0, 3).map((article) => (
                            <div
                              onClick={() => navigateToArticle(article.slug)}
                              class={articleItemClass}
                            >
                              <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-text-primary group-hover:text-primary truncate transition-colors">
                                  {article.title}
                                </p>
                                <p class="text-xs text-text-muted mt-0.5">
                                  {article.author.name} &middot; {article.readTimeMinutes}{' '}
                                  {te('common.minRead') ? t('common.minRead') : 'min read'}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p class="text-sm text-text-muted py-2">{t('common.noArticles')}</p>
                        )}
                      </div>
                    </div>

                    {/* Popular Column */}
                    <div class="p-4">
                      <div class="flex items-center gap-2 mb-3">
                        <i class="bi bi-fire text-orange-500 text-sm" />
                        <h3 class="text-sm font-semibold text-text-primary uppercase tracking-wide">
                          {t('topbar.popular')}
                        </h3>
                      </div>
                      <div class="space-y-1">
                        {store.popular.length > 0 ? (
                          store.popular.slice(0, 5).map((article) => (
                            <div
                              onClick={() => navigateToArticle(article.slug)}
                              class={articleItemClass}
                            >
                              <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-text-primary group-hover:text-primary truncate transition-colors">
                                  {article.title}
                                </p>
                                <p class="text-xs text-text-muted mt-0.5">
                                  {article.author.name} &middot; {article.readTimeMinutes}{' '}
                                  {te('common.minRead') ? t('common.minRead') : 'min read'}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p class="text-sm text-text-muted py-2">{t('common.noArticles')}</p>
                        )}
                      </div>
                    </div>

                    {/* Categories Column */}
                    <div class="p-4">
                      <div class="flex items-center gap-2 mb-2">
                        <i class="bi bi-folder-fill text-green-500 text-sm" />
                        <h3 class="text-sm font-semibold text-text-primary uppercase tracking-wide">
                          {t('topbar.categories')}
                        </h3>
                      </div>
                      <div class="space-y-0">
                        {store.getCategoryWithCount.length > 0 ? (
                          store.getCategoryWithCount.map(({ category }) => (
                            <div
                              onClick={() => navigateToCategory(category.slug)}
                              class="px-2 py-1.5 rounded-md hover:bg-surface-active hover:text-text-primary transition cursor-pointer text-text-secondary text-xs truncate"
                            >
                              {category.name}
                            </div>
                          ))
                        ) : (
                          <p class="text-xs text-text-muted py-1">{t('common.noResults')}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  },
})
