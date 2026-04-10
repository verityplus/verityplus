import { defineComponent, ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useHead } from '@/composables/useHead'
import { marked } from 'marked'
import { useArticleStore } from '@/features/article/store/article.store'
import { AdDisplay } from '@/features/ads/components/AdDisplay'
import { BaseBadge } from '@/components/ui/Badge'
import { ArticleCard } from '@/features/article/components/ArticleCard'
import { useLocalizedField } from '@/composables/useLocalizedField'
import { BaseImage } from '@/components/ui/Image'
import type { Article } from '@/shared/types'


/**
 * Page View: ReadView
 * Renders the detailed view of a single article with markdown support.
 */
export default defineComponent({
  name: 'ReadView',
  setup() {
    const route = useRoute()
    const store = useArticleStore()
    const { t } = useI18n()
    const { getLocalizedField } = useLocalizedField()

    const article = ref<Article | null>(null)
    const fontSize = ref(18)
    const readingProgress = ref(0)
    const isSpeaking = ref(false)
    const recommendedArticles = ref<Article[]>([])

    watch(
      () => route.params.slug,
      async (slug) => {
        if (slug) {
          const found = await store.findBySlug(slug as string)
          article.value = found || null
          if (article.value) {
            const sameCategory = store.findArticlesByCategory(article.value.category.slug)
            recommendedArticles.value = sameCategory
              .filter((a) => a.id !== article.value!.id)
              .slice(0, 3)
          }
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
      meta: computed(() => [
        { name: 'description', content: getLocalizedField(article.value!, 'excerpt') || '' },
        { property: 'og:title', content: getLocalizedField(article.value!, 'title') || '' },
        { property: 'og:image', content: article.value?.coverImage || '' },
      ]),
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

      const rawText = document.getElementById('markdown-content')?.innerText
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
    }

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      readingProgress.value = totalHeight ? (window.scrollY / totalHeight) * 100 : 0
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
      window.speechSynthesis.cancel()
    })

    return () => {
      if (!article.value) return null

      return (
        <article class="bg-background min-h-screen">
          {/* Progress Bar */}
          <div class="fixed top-28 left-0 w-full h-2 bg-border/20 z-10">
            <div
              class="h-full bg-primary transition-all duration-150"
              style={{ width: `${readingProgress.value}%` }}
            />
          </div>

          {/* Accessibility Controls */}
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
              >
                A+
              </button>
              <button
                onClick={() => {
                  fontSize.value -= 2
                }}
                class="w-10 h-10 rounded-full hover:bg-surface-hover font-bold text-text-secondary text-sm cursor-pointer transition border-none"
                title={t('common.fontSizeDecrease')}
              >
                A-
              </button>
            </div>
          </div>

          <div class="mx-auto px-4 sm:px-6 lg:px-8 flex flex-col xl:flex-row gap-8 pt-8 pb-24">
            {/* Left Sidebar Ad (Slim Skyscraper) */}
            <aside class="w-full xl:w-48 shrink-0 order-1">
              <div class="sticky top-24">
                <AdDisplay
                  size="inline"
                  label={t('article.mainPromo')}
                  class="xl:h-[calc(100vh-8rem)] h-40"
                />
              </div>
            </aside>

            {/* Main Content Area */}
            <main class="flex-1 w-full max-w-4xl mx-auto order-2">
              <header class="pb-10 mb-10 border-b border-border">
                <div class="max-w-3xl mx-auto text-center">
                  <div class="flex items-center justify-center gap-3 mb-6">
                    <RouterLink
                      to={{ name: 'category', params: { slug: article.value.category.slug } }}
                      class="no-underline"
                    >
                      <RouterLink
                        to={{ name: 'category', params: { slug: article.value.category.slug } }}
                        class="no-underline"
                      >
                        <BaseBadge
                          bgColor={article.value.category.bgColor}
                          textColor={article.value.category.color}
                          borderColor={article.value.category.borderColor}
                        >
                          {getLocalizedField(article.value.category, 'name')}
                        </BaseBadge>
                      </RouterLink>
                    </RouterLink>
                    <span class="text-text-muted text-sm">
                      {article.value.readTimeMinutes} {t('article.minutesRead')}
                    </span>
                  </div>

                  <h1 class="text-4xl sm:text-5xl font-extrabold text-text-primary leading-tight mb-8">
                    {getLocalizedField(article.value, 'title')}
                  </h1>

                  <RouterLink
                    to={{ name: 'author', params: { id: article.value.author.id } }}
                    class="flex items-center justify-center gap-4 pt-4 max-w-sm mx-auto group/author hover:opacity-80 transition"
                  >
                    <BaseImage
                      src={article.value.author.avatar}
                      alt={article.value.author.name}
                      isProfile
                      class="w-12 h-12 rounded-full border-2 border-primary/20 shadow-sm object-cover group-hover/author:border-primary transition-colors"
                    />

                    <div class="text-left">
                      <p class="text-text-primary font-bold leading-none mb-1 group-hover/author:text-primary transition-colors">
                        {article.value.author.name}
                      </p>
                      <p class="text-text-muted text-sm">{article.value.publishedAt}</p>
                    </div>
                  </RouterLink>
                </div>
              </header>

              {/* Cover Media */}
              <div class="mb-12">
                <div class="aspect-video rounded-2xl overflow-hidden shadow-elevated bg-surface-muted">
                  <BaseImage
                    src={article.value.coverImage}
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

              {/* Content Render Area */}
              <div class="max-w-3xl mx-auto relative">
                <div
                  id="markdown-content"
                  class="markdown-body prose prose-blue max-w-none text-text-secondary transition-all duration-200"
                  style={{ fontSize: `${fontSize.value}px` }}
                  v-html={outputHtml.value}
                />

                {/* Tag Metadata */}
                <div class="mt-16 pt-8 border-t border-border">
                  <div class="flex flex-wrap gap-2">
                    {JSON.parse(getLocalizedField(article.value, 'tags')).map((tag: string) => (
                      <span
                        key={tag}
                        class="px-3 py-1 bg-surface-muted text-text-secondary text-sm rounded-lg hover:bg-surface-active cursor-pointer transition"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommended Articles */}
              {recommendedArticles.value.length > 0 && (
                <div class="mt-16 pt-12 border-t border-border">
                  <h2 class="text-2xl font-bold text-text-primary mb-8">
                    {t('article.recommended')}
                  </h2>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {recommendedArticles.value.map((recArticle) => (
                      <ArticleCard key={recArticle.id} article={recArticle} />
                    ))}
                  </div>
                </div>
              )}
            </main>

            {/* Right Sidebar Area (Slim) */}
            <aside class="w-full xl:w-48 shrink-0 order-3">
              <div class="sticky top-24 flex flex-col gap-6">
                <AdDisplay
                  size="inline"
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
