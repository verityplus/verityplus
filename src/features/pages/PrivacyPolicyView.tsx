import { defineComponent, computed } from 'vue'
import { useHead } from '@/composables/useHead'
import { useI18n } from 'vue-i18n'

/**
 * Static View: PrivacyPolicyView
 */
export default defineComponent({
  name: 'PrivacyPolicyView',
  setup() {
    const { t, tm } = useI18n()

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

    const sections = computed(() => [
      {
        title: t('privacy.sections.intro.title'),
        text: t('privacy.sections.intro.content'),
      },
      {
        title: t('privacy.sections.infoCollected.title'),
        intro: t('privacy.sections.infoCollected.content'),
        items: tm('privacy.sections.infoCollected.items') as string[],
      },
      {
        title: t('privacy.sections.infoUsage.title'),
        intro: t('privacy.sections.infoUsage.content'),
        items: tm('privacy.sections.infoUsage.items') as string[],
      },
      {
        title: t('privacy.sections.dataSecurity.title'),
        text: t('privacy.sections.dataSecurity.content'),
      },
      {
        title: t('privacy.sections.yourRights.title'),
        text: t('privacy.sections.yourRights.content'),
      },
    ])

    return () => (
      <section class="bg-background-alt py-16 px-6 sm:py-24">
        <div class="max-w-4xl mx-auto bg-surface p-8 sm:p-12 rounded-2xl shadow-card border border-border text-left">
          <div class="border-b border-border pb-8 mb-8">
            <h1 class="text-3xl sm:text-4xl font-extrabold text-text-primary mb-4">
              {t('privacy.heading')}
            </h1>
            <p class="text-text-muted italic">{t('privacy.lastUpdated')}</p>
          </div>

          <div class="prose prose-blue max-w-none text-text-secondary leading-relaxed space-y-8">
            {sections.value.map((section) => (
              <section key={section.title}>
                <h2 class="text-xl font-bold text-text-primary mb-3 flex items-center border-b border-border/10 pb-2">
                  {section.title}
                </h2>
                {section.text && <p>{section.text}</p>}
                {section.items && (
                  <>
                    {section.intro && <p class="mb-3">{section.intro}</p>}
                    <ul class="list-disc pl-6 space-y-2 marker:text-primary">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </>
                )}
              </section>
            ))}

            <div class="bg-primary-50 border-l-4 border-primary p-6 rounded-r-lg mt-10">
              <p class="text-primary-700 font-bold mb-1">{t('privacy.question')}</p>
              <p class="text-primary-600 text-sm">
                {t('privacy.questionDesc')}{' '}
                <span class="font-bold underline">privacy@verityplus.space</span>.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  },
})
