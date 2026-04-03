import { defineComponent } from 'vue'
import { useHead } from '@/composables/useHead'
import { useI18n } from 'vue-i18n'
import { BaseButton } from '@/components/ui/Button'

/**
 * Static View: TermsAndConditionsView
 */
export default defineComponent({
  name: 'TermsAndConditionsView',
  setup() {
    const { t } = useI18n()

    useHead({
      title: t('common.termsTitle'),
      meta: [{ name: 'description', content: t('common.termsDesc') }],
    })

    const sections = [
      {
        title: t('terms.sections.acceptance.title'),
        text: t('terms.sections.acceptance.content'),
      },
      {
        title: t('terms.sections.userAccount.title'),
        intro: t('terms.sections.userAccount.content'),
        items: [
          t('terms.sections.userAccount.items[0]'),
          t('terms.sections.userAccount.items[1]'),
          t('terms.sections.userAccount.items[2]'),
        ],
      },
      {
        title: t('terms.sections.intellectualProperty.title'),
        text: t('terms.sections.intellectualProperty.content'),
      },
      {
        title: t('terms.sections.liability.title'),
        quote: t('terms.sections.liability.quote'),
      },
      {
        title: t('terms.sections.changes.title'),
        text: t('terms.sections.changes.content'),
      },
    ]

    return () => (
      <section class="bg-background-alt py-16 px-6 sm:py-24">
        <div class="max-w-4xl mx-auto bg-surface p-8 sm:p-12 rounded-2xl shadow-card border border-border text-left">
          <div class="border-b border-border pb-8 mb-8 text-center sm:text-left">
            <h1 class="text-3xl sm:text-4xl font-extrabold text-text-primary mb-4">
              {t('terms.heading')}
            </h1>
            <p class="text-text-secondary leading-relaxed">{t('terms.welcome')}</p>
            <p class="text-xs text-text-muted mt-4 uppercase tracking-widest font-bold">
              {t('terms.version')}
            </p>
          </div>

          <div class="text-text-secondary leading-relaxed space-y-10">
            {sections.map((section, index) => (
              <section key={section.title}>
                <h2 class="text-xl font-bold text-text-primary mb-4 flex items-baseline border-b border-border/10 pb-2">
                  <span class="text-primary mr-3 tabular-nums font-black text-2xl">
                    {(index + 1).toString().padStart(2, '0')}.
                  </span>
                  {section.title}
                </h2>
                {section.text && <p>{section.text}</p>}
                {section.items && (
                  <>
                    {section.intro && <p class="mb-3">{section.intro}</p>}
                    <ul class="list-disc pl-8 space-y-2 marker:text-primary">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </>
                )}
                {section.quote && (
                  <div class="bg-surface-muted p-6 rounded-xl border-l-4 border-primary transition hover:shadow-card-hover italic text-sm text-text-primary">
                    {section.quote}
                  </div>
                )}
              </section>
            ))}

            <div class="pt-10 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-6">
              <p class="text-sm text-text-muted text-center sm:text-left leading-relaxed">
                {t('terms.question')}
                <br />
                {t('terms.questionDesc')}
              </p>
              <BaseButton class="px-8 shadow-lg shadow-primary/20">
                {t('terms.contactLegal')}
              </BaseButton>
            </div>
          </div>
        </div>
      </section>
    )
  },
})
