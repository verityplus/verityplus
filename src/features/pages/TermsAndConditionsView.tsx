import { defineComponent, computed, ref, onMounted, onUnmounted } from 'vue'
import { useHead } from '@/composables/useHead'
import { useI18n } from 'vue-i18n'
import { useLocaleRoute } from '@/composables/useLocaleRoute'

export default defineComponent({
  name: 'TermsAndConditionsView',
  setup() {
    const { t, tm } = useI18n()
    const { push } = useLocaleRoute()

    const headTitle = computed(() => t('common.termsTitle'))
    const headDesc = computed(() => t('common.termsDesc'))

    useHead({
      title: headTitle,
      meta: [{ name: 'description', content: headDesc }],
    })

    const activeSection = ref<string>('acceptance')
    const sectionsContainerRef = ref<HTMLElement | null>(null)

    interface TocItem {
      key: string
      title: string
    }

    const tocItems = computed<TocItem[]>(() => {
      const s = tm('terms.sections') as Record<string, { title: string }>
      return Object.entries(s).map(([key, value]) => ({
        key,
        title: value.title,
      }))
    })

    interface ContentSection {
      key: string
      title: string
      content?: string
      items?: string[]
    }

    const sections = computed<ContentSection[]>(() => {
      const s = tm('terms.sections') as Record<
        string,
        { title: string; content?: string; items?: string[] }
      >
      return Object.entries(s).map(([key, value]) => ({
        key,
        title: value.title,
        content: value.content,
        items: value.items,
      }))
    })

    const handleScroll = () => {
      if (!sectionsContainerRef.value) return
      const container = sectionsContainerRef.value
      const headings = container.querySelectorAll('[data-section-id]')
      let current = activeSection.value

      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect()
        if (rect.top <= 120) {
          current = heading.getAttribute('data-section-id') || current
        }
      })

      activeSection.value = current
    }

    const scrollToSection = (key: string) => {
      const el = document.getElementById(`section-${key}`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll, { passive: true })
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return () => (
      <section class="bg-background-alt py-16 px-6 sm:py-24">
        <div class="max-w-6xl mx-auto">
          <div class="mb-12">
            <h1 class="text-3xl sm:text-4xl font-extrabold text-text-primary mb-3">
              {t('terms.heading')}
            </h1>
            <p class="text-text-muted text-sm">{t('terms.lastUpdated')}</p>
            <p class="text-text-secondary mt-6 leading-relaxed max-w-3xl">{t('terms.intro')}</p>
          </div>

          <div class="flex flex-col lg:flex-row gap-12">
            <aside class="lg:w-64 lg:flex-shrink-0">
              <div class="lg:sticky lg:top-24">
                <h3 class="text-xs font-bold uppercase tracking-widest text-text-muted mb-4 hidden lg:block">
                  {t('terms.tocHeading')}
                </h3>
                <nav class="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
                  {tocItems.value.map((item) => {
                    const isActive = activeSection.value === item.key
                    return (
                      <button
                        onClick={() => scrollToSection(item.key)}
                        class={`whitespace-nowrap lg:whitespace-normal text-sm text-left px-3 py-2 rounded-lg transition-colors duration-150 ${
                          isActive
                            ? 'text-primary font-semibold bg-primary/5'
                            : 'text-text-secondary hover:text-text-primary hover:bg-surface/50'
                        }`}
                      >
                        {item.title}
                      </button>
                    )
                  })}
                </nav>
              </div>
            </aside>

            <div ref={sectionsContainerRef} class="flex-1 min-w-0">
              <div class="bg-surface rounded-2xl border border-border p-8 sm:p-10 space-y-10">
                {sections.value.map((section) => (
                  <div
                    id={`section-${section.key}`}
                    data-section-id={section.key}
                    class="scroll-mt-24"
                  >
                    <h2 class="text-xl font-bold text-text-primary mb-4 pb-3 border-b border-border/40">
                      {section.title}
                    </h2>
                    <div class="text-text-secondary leading-relaxed space-y-4">
                      {section.content && <p>{section.content}</p>}
                      {section.items && (
                        <ul class="list-disc pl-6 space-y-2 marker:text-primary">
                          {section.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div class="mt-12 bg-primary/5 border-l-4 border-primary rounded-r-lg p-6">
                <p class="text-primary font-semibold mb-1">{t('terms.contactHeading')}</p>
                <p class="text-text-secondary text-sm mb-4">{t('terms.contactDesc')}</p>
                <button
                  onClick={() => push({ name: 'contact' })}
                  class="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  <i class="bi bi-envelope"></i>
                  {t('terms.contactButton')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  },
})
