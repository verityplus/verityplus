import { defineComponent, computed } from 'vue'
import { useHead } from '@/composables/useHead'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ContactView',
  setup() {
    const { t } = useI18n()

    const headTitle = computed(() => t('common.contactTitle'))
    const headDesc = computed(() => t('common.contactDesc'))

    useHead({
      title: headTitle,
      meta: [
        {
          name: 'description',
          content: headDesc,
        },
      ],
    })

    const contactMethods = computed(() => [
      {
        icon: 'bi bi-geo-alt-fill',
        label: t('contact.mainOffice'),
        value: t('contact.address'),
        href: null,
      },
      {
        icon: 'bi bi-envelope-fill',
        label: t('common.email'),
        value: 'contact@verityplus.space',
        href: 'mailto:contact@verityplus.space',
      },
      {
        icon: 'bi bi-telephone-fill',
        label: t('common.phone'),
        value: t('contact.phone'),
        href: 'tel:+622112345678',
      },
    ])

    return () => (
      <section class="bg-background py-16 sm:py-24">
        <div class="container-page">
          <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-primary font-semibold tracking-wide uppercase text-sm mb-3">
              {t('contact.heading')}
            </h2>
            <h1 class="text-3xl sm:text-4xl font-extrabold text-text-primary mb-4">
              {t('contact.title')}
            </h1>
            <p class="text-lg text-text-secondary mb-12">{t('contact.description')}</p>

            <div class="space-y-6">
              {contactMethods.value.map((method) => {
                const content = (
                  <>
                    <div class="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <i class={[method.icon, 'text-xl']} />
                    </div>
                    <div class="text-left">
                      <h4 class="text-sm font-medium text-text-muted uppercase tracking-wider mb-1">
                        {method.label}
                      </h4>
                      <p class="text-text-primary font-medium">{method.value}</p>
                    </div>
                  </>
                )

                if (method.href) {
                  return (
                    <a
                      key={method.label}
                      href={method.href}
                      class="flex items-center gap-4 p-5 bg-surface rounded-xl border border-border hover:border-primary/30 transition duration-300 group"
                    >
                      {content}
                    </a>
                  )
                }

                return (
                  <div
                    key={method.label}
                    class="flex items-center gap-4 p-5 bg-surface rounded-xl border border-border"
                  >
                    {content}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    )
  },
})
