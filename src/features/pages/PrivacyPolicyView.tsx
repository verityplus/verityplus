import { defineComponent, computed, ref } from 'vue'
import { useHead } from '@/composables/useHead'
import { useI18n } from 'vue-i18n'
import { useLocaleRoute } from '@/composables/useLocaleRoute'

export default defineComponent({
  name: 'PrivacyPolicyView',
  setup() {
    const { t, tm } = useI18n()
    const { push } = useLocaleRoute()

    const headTitle = computed(() => t('common.privacyTitle'))
    const headDesc = computed(() => t('common.privacyDesc'))

    useHead({
      title: headTitle,
      meta: [
        {
          name: 'description',
          content: headDesc,
        },
      ],
    })

    const openSection = ref<string | null>(null)

    const toggleSection = (key: string) => {
      openSection.value = openSection.value === key ? null : key
    }

    interface AccordionSection {
      key: string
      title: string
      content?: string
      items?: string[]
    }

    const sections = computed<AccordionSection[]>(() => {

      const s = tm('privacy.sections') as Record<string, any>
      return [
        {
          key: 'infoCollected',
          title: s.infoCollected.title,
          content: s.infoCollected.content,
          items: s.infoCollected.items,
        },
        {
          key: 'infoUsage',
          title: s.infoUsage.title,
          content: s.infoUsage.content,
          items: s.infoUsage.items,
        },
        {
          key: 'cookies',
          title: s.cookies.title,
          content: s.cookies.content,
          items: s.cookies.items,
        },
        {
          key: 'thirdParty',
          title: s.thirdParty.title,
          content: s.thirdParty.content,
          items: s.thirdParty.items,
        },
        {
          key: 'dataRetention',
          title: s.dataRetention.title,
          content: s.dataRetention.content,
        },
        {
          key: 'yourRights',
          title: s.yourRights.title,
          content: s.yourRights.content,
          items: s.yourRights.items,
        },
        {
          key: 'childrenPrivacy',
          title: s.childrenPrivacy.title,
          content: s.childrenPrivacy.content,
        },
        {
          key: 'policyChanges',
          title: s.policyChanges.title,
          content: s.policyChanges.content,
        },
      ]
    })

    return () => (
      <section class="bg-background-alt py-16 px-6 sm:py-24">
        <div class="max-w-3xl mx-auto text-left">
          <div class="mb-12">
            <h1 class="text-3xl sm:text-4xl font-extrabold text-text-primary mb-3">
              {t('privacy.heading')}
            </h1>
            <p class="text-text-muted text-sm">{t('privacy.lastUpdated')}</p>
            <p class="text-text-secondary mt-6 leading-relaxed">{t('privacy.intro')}</p>
          </div>

          <div class="space-y-3">
            {sections.value.map((section) => {
              const isOpen = openSection.value === section.key
              return (
                <div class="bg-surface rounded-xl border border-border overflow-hidden transition-shadow duration-200 hover:shadow-card">
                  <button
                    onClick={() => toggleSection(section.key)}
                    class="w-full flex items-center justify-between px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  >
                    <span class="text-base sm:text-lg font-semibold text-text-primary pr-4">
                      {section.title}
                    </span>
                    <span
                      class={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full border border-border text-text-muted transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                      </svg>
                    </span>
                  </button>

                  <div
                    class={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div class="px-6 pb-6 pt-2 text-text-secondary leading-relaxed space-y-3 border-t border-border/30">
                      {section.content && <p>{section.content}</p>}
                      {section.items && (
                        <ul class="list-disc pl-5 space-y-2 marker:text-primary">
                          {section.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div class="mt-12 bg-primary/5 border-l-4 border-primary rounded-r-lg p-6">
            <p class="text-primary font-semibold mb-1">{t('privacy.contactHeading')}</p>
            <p class="text-text-secondary text-sm mb-4">{t('privacy.contactDesc')}</p>
            <button
              onClick={() => push({ name: 'contact' })}
              class="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.577L16 11.801V4.697l-5.803 3.556ZM7 1.5a.5.5 0 0 0-1 0v1a.5.5 0 0 0 1 0v-1Zm4 0a.5.5 0 0 0-1 0v1a.5.5 0 0 0 1 0v-1Z" />
              </svg>
              {t('privacy.contactButton')}
            </button>
          </div>
        </div>
      </section>
    )
  },
})
