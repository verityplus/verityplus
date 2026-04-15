import { defineComponent, ref, onMounted, onUnmounted, Teleport } from 'vue'
import { useI18n } from 'vue-i18n'
import { useClickOutside } from '@/composables/useClickOutside'
import { useArticleStore } from '@/features/article/store/article.store'
import { AdDisplay } from '@/features/ads/components/AdDisplay'
import { AD_SLOTS } from '@/features/ads/services/ad.service'
import { useLocalizedField } from '@/composables/useLocalizedField'
import type { Article } from '@/shared/types'
import { calculateReadTime } from '@/utils/readTime'

/**
 * BrowseTopBar: Top bar visible on all pages except Home
 * Shows a megamenu with Featured, Latest, Popular, and Categories columns
 */
export const BrowseTopBar = defineComponent({
  name: 'BrowseTopBar',
  setup() {
    const store = useArticleStore()
    const { t, te } = useI18n()
    const { getLocalizedField } = useLocalizedField()
    const isOpen = ref(false)
    const triggerRef = ref<HTMLElement | null>(null)
    const panelRef = ref<HTMLElement | null>(null)
    const menuLeft = ref(0)
    const menuTop = ref(0)
    const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)

    const updateMenuPosition = () => {
      if (triggerRef.value) {
        const rect = triggerRef.value.getBoundingClientRect()
        menuLeft.value = rect.left
        menuTop.value = rect.bottom + 8
      }
    }

    const toggleMegamenu = () => {
      if (!isOpen.value) {
        updateMenuPosition()
      }
      isOpen.value = !isOpen.value
    }

    const closeMegamenu = () => {
      isOpen.value = false
    }

    useClickOutside([triggerRef, panelRef], () => {
      closeMegamenu()
    })

    const handleResize = () => {
      windowWidth.value = window.innerWidth
      if (isOpen.value) {
        updateMenuPosition()
      }
    }

    const handleScroll = () => {
      if (isOpen.value) {
        updateMenuPosition()
      }
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll, { passive: true })
      window.addEventListener('resize', handleResize, { passive: true })
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    })

    const articleItemClass =
      'flex items-start gap-3 p-3 rounded-lg hover:bg-surface-muted transition cursor-pointer group'

    return () => (
      <div class="w-full border-t border-border">
        <div class="container-page">
          <div class="flex items-center gap-2 h-12">
            <div class="relative">
              <button
                ref={triggerRef}
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

              <Teleport to="body">
                {isOpen.value && (
                  <div
                    ref={panelRef}
                    class="fixed inset-x-0 top-28 md:inset-x-auto md:top-auto w-full md:w-[min(90vw,960px)] border border-border rounded-none md:rounded-xl shadow-elevated z-9999 overflow-hidden max-h-[calc(100vh-6rem)] md:max-h-80 bg-surface/80 backdrop-blur-md"
                    style={
                      windowWidth.value >= 768
                        ? {
                            top: `${menuTop.value}px`,
                            left: `${menuLeft.value}px`,
                          }
                        : {}
                    }
                  >
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 divide-y sm:divide-y-0 md:divide-x divide-border overflow-y-auto max-h-[calc(100vh-6rem)] md:max-h-80">
                      <div class="p-4">
                        <AdDisplay class="md:h-full h-32 w-full" slot={AD_SLOTS.HOME_HEADER} label="Browse TopBar Ad" />
                      </div>
                      <div class="p-4">
                        <div class="flex items-center gap-2 mb-3">
                          <i class="bi bi-star-fill text-yellow-500 text-sm" />
                          <h3 class="text-sm font-semibold text-text-primary uppercase tracking-wide">
                            {t('topbar.featured')}
                          </h3>
                        </div>
                        <div class="space-y-1">
                          {store.featured.length > 0 ? (
                            store.featured.slice(0, 5).map((article: Article) => (
                              <router-link
                                to={{ name: 'read', params: { slug: article.slug || article.id } }}
                                class={articleItemClass}
                                onClick={closeMegamenu}
                              >
                                <div class="flex-1 min-w-0">
                                  <p class="text-sm font-medium text-text-primary group-hover:text-primary truncate transition-colors">
                                    {getLocalizedField(article, 'title')}
                                  </p>
                                  <p class="text-xs text-text-muted mt-0.5">
                                    {article.author?.name} &middot;{' '}
                                    {calculateReadTime(getLocalizedField(article, 'content'), t('common.locale') === 'zh')}{' '}
                                    {te('common.minRead') ? t('common.minRead') : 'min read'}
                                  </p>

                                </div>
                              </router-link>
                            ))
                          ) : (
                            <p class="text-sm text-text-muted py-2">{t('common.noArticles')}</p>
                          )}
                        </div>
                      </div>

                      <div class="p-4">
                        <div class="flex items-center gap-2 mb-3">
                          <i class="bi bi-clock-fill text-blue-500 text-sm" />
                          <h3 class="text-sm font-semibold text-text-primary uppercase tracking-wide">
                            {t('topbar.latest')}
                          </h3>
                        </div>
                        <div class="space-y-1">
                          {store.latest.length > 0 ? (
                            store.latest.slice(0, 3).map((article: Article) => (
                              <router-link
                                to={{ name: 'read', params: { slug: article.slug || article.id } }}
                                class={articleItemClass}
                                onClick={closeMegamenu}
                              >
                                <div class="flex-1 min-w-0">
                                  <p class="text-sm font-medium text-text-primary group-hover:text-primary truncate transition-colors">
                                    {getLocalizedField(article, 'title')}
                                  </p>
                                  <p class="text-xs text-text-muted mt-0.5">
                                    {article.author?.name} &middot;{' '}
                                    {calculateReadTime(getLocalizedField(article, 'content'), t('common.locale') === 'zh')}{' '}
                                    {te('common.minRead') ? t('common.minRead') : 'min read'}
                                  </p>

                                </div>
                              </router-link>
                            ))
                          ) : (
                            <p class="text-sm text-text-muted py-2">{t('common.noArticles')}</p>
                          )}
                        </div>
                      </div>

                      <div class="p-4">
                        <div class="flex items-center gap-2 mb-3">
                          <i class="bi bi-fire text-orange-500 text-sm" />
                          <h3 class="text-sm font-semibold text-text-primary uppercase tracking-wide">
                            {t('topbar.popular')}
                          </h3>
                        </div>
                        <div class="space-y-1">
                          {store.popular.length > 0 ? (
                            store.popular.slice(0, 5).map((article: Article) => (
                              <router-link
                                to={{ name: 'read', params: { slug: article.slug || article.id } }}
                                class={articleItemClass}
                                onClick={closeMegamenu}
                              >
                                <div class="flex-1 min-w-0">
                                  <p class="text-sm font-medium text-text-primary group-hover:text-primary truncate transition-colors">
                                    {getLocalizedField(article, 'title')}
                                  </p>
                                  <p class="text-xs text-text-muted mt-0.5">
                                    {article.author?.name} &middot;{' '}
                                    {calculateReadTime(getLocalizedField(article, 'content'), t('common.locale') === 'zh')}{' '}
                                    {te('common.minRead') ? t('common.minRead') : 'min read'}
                                  </p>

                                </div>
                              </router-link>
                            ))
                          ) : (
                            <p class="text-sm text-text-muted py-2">{t('common.noArticles')}</p>
                          )}
                        </div>
                      </div>

                      <div class="p-4">
                        <div class="flex items-center gap-2 mb-2">
                          <i class="bi bi-folder-fill text-green-500 text-sm" />
                          <h3 class="text-sm font-semibold text-text-primary uppercase tracking-wide">
                            {t('topbar.categories')}
                          </h3>
                        </div>
                        <div class="space-y-0 flex flex-col">
                          {store.categories.length > 0 ? (
                            store.categories.map(
                              (category) => (
                                <router-link
                                  to={{ name: 'category', params: { slug: category.slug || category.id } }}
                                  class="px-2 py-1.5 rounded-md hover:bg-surface-active hover:text-text-primary transition cursor-pointer text-text-secondary text-xs truncate"
                                  onClick={closeMegamenu}
                                >
                                  {getLocalizedField(category, 'name')}
                                </router-link>
                              ),
                            )
                          ) : (
                            <p class="text-xs text-text-muted py-1">{t('common.noResults')}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Teleport>
            </div>
          </div>
        </div>
      </div>
    )
  },
})
