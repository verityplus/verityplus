import { defineComponent, ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useHead } from '@/composables/useHead'
import { useLocaleRoute } from '@/composables/useLocaleRoute'
import { marked } from 'marked'
import { useArticleStore } from '@/features/article/store/article.store'
import { trackEvent } from '@/composables/useAnalytics'
import { AdDisplay } from '@/features/ads/components/AdDisplay'
import { AD_SLOTS } from '@/features/ads/services/ad.service'
import { BaseBadge } from '@/components/ui/Badge'
import { ArticleCard } from '@/features/article/components/ArticleCard'
import { useLocalizedField } from '@/composables/useLocalizedField'
import { BaseImage } from '@/components/ui/Image'
import { formatDate } from '@/utils/date'
import type { Article } from '@/shared/types'
import { StructuredData } from '@/components/seo/StructuredData'
import { calculateReadTime } from '@/utils/readTime'


/**
 * Page View: ReadView
 * Renders the detailed view of a single article with markdown support.
 */
export default defineComponent({
  name: 'ReadView',
  setup() {
    const route = useRoute()
    const store = useArticleStore()
    const { t, locale } = useI18n()
    const { getLocalizedField } = useLocalizedField()
    const { replace } = useLocaleRoute()

    const article = ref<Article | null>(null)
    const isLoading = ref(true)
    const fontSize = ref(18)
    const readingProgress = ref(0)
    const isSpeaking = ref(false)
    const markdownRef = ref<HTMLElement | null>(null)
    const recommendedArticles = ref<Article[]>([])

    watch(
      () => route.params.slug,
      async (slug) => {
        if (slug) {
          isLoading.value = true
          const found = await store.findById(slug as string)
          article.value = found || null
          
          if (!article.value) {
            replace({ name: 'not-found-localized' })
            return
          }

          const categoryId = article.value.category?.id
          if (categoryId) {
            const sameCategory = store.findArticlesByCategoryId(categoryId)
            recommendedArticles.value = sameCategory
              .filter((a) => a.id !== article.value!.id)
              .slice(0, 3)
          }
          
          trackEvent('view_item', {
            item_id: article.value.id,
            item_name: getLocalizedField(article.value, 'title'),
            item_category: article.value.category ? getLocalizedField(article.value.category, 'name') : undefined,
            author: article.value.author?.name
          })
          
          isLoading.value = false
        }
      },
      { immediate: true },
    )

    useHead({
      title: computed(() =>
        article.value
          ? `${getLocalizedField(article.value, 'title')} — VERITY+`
          : t('common.articleLoading'),
      ),
      meta: computed(() => {
        if (!article.value) return []
        const title = getLocalizedField(article.value, 'title')
        const excerpt = getLocalizedField(article.value, 'excerpt') || ''
        const image = article.value.coverImage || ''
        
        let tags: string[] = []
        try {
          const tagsRaw = getLocalizedField(article.value, 'tags')
          tags = Array.isArray(tagsRaw) ? tagsRaw as string[] : []
        } catch { /* ignore */ }

        return [
          { name: 'description', content: excerpt },
          { name: 'keywords', content: tags.join(', ') },
          // OpenGraph
          { property: 'og:title', content: title },
          { property: 'og:description', content: excerpt },
          { property: 'og:image', content: image },
          { property: 'og:type', content: 'article' },
          { property: 'article:published_time', content: String(article.value.publishedAt) },
          { property: 'article:author', content: article.value.author?.name || '' },
          ...tags.map(tag => ({ property: 'article:tag', content: tag })),
          // Twitter
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: title },
          { name: 'twitter:description', content: excerpt },
          { name: 'twitter:image', content: image },
        ]
      }),
      link: computed(() => [
        { rel: 'canonical', href: window.location.href }
      ])
    })

    const structuredData = computed(() => {
      if (!article.value) return null
      return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: getLocalizedField(article.value, 'title'),
        description: getLocalizedField(article.value, 'excerpt'),
        image: article.value.coverImage,
        datePublished: article.value.publishedAt,
        author: {
          '@type': 'Person',
          name: article.value.author?.name,
        },
        publisher: {
          '@type': 'Organization',
          name: 'VERITY+',
          logo: {
            '@type': 'ImageObject',
            url: window.location.origin + '/logo.png',
          },
        },
      }
    })

    const outputHtml = computed(() => {
      if (!article.value) return ''
      return marked.parse(
        getLocalizedField(article.value, 'content') || getLocalizedField(article.value, 'excerpt'),
      )
    })

    const toggleSpeech = () => {
      if (isSpeaking.value) {
        window.speechSynthesis.cancel()
        isSpeaking.value = false
        return
      }

      const rawText = markdownRef.value?.innerText
      if (!rawText || !article.value) return

      const utterance = new SpeechSynthesisUtterance(
        `${getLocalizedField(article.value, 'title')}. ${rawText}`,
      )
      utterance.lang = 'id-ID'
      utterance.onend = () => {
        isSpeaking.value = false
      }
      window.speechSynthesis.speak(utterance)
      isSpeaking.value = true

      trackEvent('use_tts', {
        article_id: article.value.id,
        article_title: getLocalizedField(article.value, 'title'),
        language: utterance.lang
      })
    }

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = totalHeight ? (window.scrollY / totalHeight) * 100 : 0
      readingProgress.value = progress

      // Track 90% scroll as "article_finished"
      if (progress > 90 && !(article.value as any)?.trackedFinished) {
        if (article.value) {
          ;(article.value as Article & { trackedFinished?: boolean }).trackedFinished = true
          trackEvent('article_finished', {
            article_id: article.value.id,
            article_title: getLocalizedField(article.value, 'title')
          })
        }
      }
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
      window.speechSynthesis.cancel()
    })

    return () => {
      if (isLoading.value || !article.value) {
        return <div class="bg-background min-h-screen"></div> // Loading state
      }

      return (
        <article class="bg-background min-h-screen">
          {structuredData.value && <StructuredData data={structuredData.value} />}
          <div class="fixed top-28 left-0 w-full h-2 bg-border/20 z-10">
            <div
              class="h-full bg-primary transition-all duration-150"
              style={{ width: `${readingProgress.value}%` }}
            />
          </div>

          <div class="fixed bottom-8 right-8 flex flex-col gap-3 z-40">
            <button
              onClick={toggleSpeech}
              class={[
                'w-14 h-14 rounded-full text-text-inverse shadow-xl flex items-center justify-center hover:scale-110 transition cursor-pointer',
                isSpeaking.value ? 'bg-red-500 shadow-red-200' : 'bg-primary shadow-primary-200',
              ]}
              title={isSpeaking.value ? t('common.stop') : t('common.readArticle')}
            >
              <i
                class={['text-xl', isSpeaking.value ? 'bi bi-stop-fill' : 'bi bi-volume-up-fill']}
              />
            </button>

            <div class="bg-surface border border-border rounded-full shadow-card p-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  fontSize.value += 2
                }}
                class="w-10 h-10 rounded-full hover:bg-surface-hover font-bold text-text-secondary text-lg cursor-pointer transition border-none"
                title={t('common.fontSizeIncrease')}
                aria-label={t('common.fontSizeIncrease')}
              >
                A+
              </button>
              <button
                onClick={() => {
                  fontSize.value -= 2
                }}
                class="w-10 h-10 rounded-full hover:bg-surface-hover font-bold text-text-secondary text-sm cursor-pointer transition border-none"
                title={t('common.fontSizeDecrease')}
                aria-label={t('common.fontSizeDecrease')}
              >
                A-
              </button>
            </div>
          </div>

          <div class="mx-auto px-4 sm:px-6 lg:px-8 flex flex-col xl:flex-row gap-8 pt-8 pb-24">
            <aside class="w-full xl:w-48 shrink-0 order-1">
              <div class="sticky top-24">
                <AdDisplay
                  size="inline"
                  slot={AD_SLOTS.ARTICLE_SIDEBAR_LEFT}
                  label={t('article.mainPromo')}
                  class="xl:h-[calc(100vh-8rem)] h-40"
                />
              </div>
            </aside>

            <main id="main-content" class="flex-1 w-full max-w-4xl mx-auto order-2">
              <header class="pb-10 mb-10 border-b border-border">
                <div class="max-w-3xl mx-auto text-center">
                  <div class="flex items-center justify-center gap-3 mb-6">
                    {article.value.category && (
                      <RouterLink
                        to={{ name: 'category', params: { slug: article.value.category.slug || article.value.category.id } }}
                        class="no-underline"
                      >
                        <BaseBadge>
                          {getLocalizedField(article.value.category, 'name')}
                        </BaseBadge>
                      </RouterLink>
                    )}

                    <span class="text-text-muted text-sm">
                      {calculateReadTime(
                        getLocalizedField(article.value, 'content'),
                        locale.value === 'zh'
                      )} {t('article.minutesRead')}
                    </span>
                  </div>

                  <h1 class="text-4xl sm:text-5xl font-extrabold text-text-primary leading-tight mb-8">
                    {getLocalizedField(article.value, 'title')}
                  </h1>

                  {article.value.author && (
                    <RouterLink
                      to={{ name: 'author', params: { slug: article.value.author.slug || article.value.author.id } }}
                      class="flex items-center justify-center gap-4 pt-4 max-w-sm mx-auto group/author hover:opacity-80 transition"
                    >
                      <BaseImage
                        src={article.value.author.avatar ?? undefined}
                        alt={article.value.author.name ?? 'Author'}
                        isProfile
                        class="w-12 h-12 rounded-full border-2 border-primary/20 shadow-sm object-cover group-hover/author:border-primary transition-colors"
                      />


                      <div class="text-left">
                        <p class="text-text-primary font-bold leading-none mb-1 group-hover/author:text-primary transition-colors">
                          {article.value.author.name}
                        </p>
                        <p class="text-text-muted text-sm">{formatDate(article.value.publishedAt as string, locale.value)}</p>

                      </div>
                    </RouterLink>
                  )}
                </div>
              </header>


              <div class="mb-12">
                <div class="aspect-video rounded-2xl overflow-hidden shadow-elevated bg-surface-muted">
                  <BaseImage
                    src={article.value.coverImage ?? undefined}
                    alt={getLocalizedField(article.value, 'title')}
                    class="w-full h-full object-cover"
                  />

                </div>
                {getLocalizedField(article.value, 'coverImageCaption') && (
                  <p class="text-center text-sm text-text-muted mt-4 italic">
                    {getLocalizedField(article.value, 'coverImageCaption')}
                  </p>
                )}
              </div>


              <div class="max-w-3xl mx-auto relative">
                <div
                  ref={markdownRef}
                  class="markdown-body prose prose-blue max-w-none text-text-secondary transition-all duration-200"
                  style={{ fontSize: `${fontSize.value}px` }}
                  v-html={outputHtml.value}
                />


                <div class="mt-16 pt-8 border-t border-border">
                  <div class="flex flex-wrap gap-2">
                    {(() => {
                      try {
                        const tagsRaw = getLocalizedField(article.value, 'tags')
                        const tags = Array.isArray(tagsRaw) ? tagsRaw as string[] : []
                        return Array.isArray(tags)
                          ? tags.map((tag: string) => (
                              <span
                                key={tag}
                                class="px-3 py-1 bg-surface-muted text-text-secondary text-sm rounded-lg hover:bg-surface-active cursor-pointer transition"
                              >
                                #{tag}
                              </span>
                            ))
                          : null
                      } catch (e) {
                        console.error('Error parsing tags:', e)
                        return null
                      }
                    })()}
                  </div>
                </div>
              </div>


              {recommendedArticles.value.length > 0 && (
                <div class="mt-16 pt-12 border-t border-border">
                  <h2 class="text-2xl font-bold text-text-primary mb-8">
                    {t('article.recommended')}
                  </h2>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {recommendedArticles.value.map((recArticle: Article) => (
                      <ArticleCard key={recArticle.id} article={recArticle} />
                    ))}
                  </div>
                </div>
              )}
            </main>


            <aside class="w-full xl:w-48 shrink-0 order-3">
              <div class="sticky top-24 flex flex-col gap-6">
                <AdDisplay
                  size="inline"
                  slot={AD_SLOTS.ARTICLE_SIDEBAR_RIGHT}
                  label={t('article.mainPromo')}
                  class="h-40 xl:h-[calc(100vh-8rem)]"
                />
              </div>
            </aside>
          </div>
        </article>
      )
    }
  },
})
