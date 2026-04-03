import { defineComponent } from 'vue'
import { useHead } from '@/composables/useHead'
import { useI18n } from 'vue-i18n'
import { BaseButton } from '@/components/ui/Button'

/**
 * Static View: ContactView
 */
export default defineComponent({
  name: 'ContactView',
  setup() {
    const { t } = useI18n()

    useHead({
      title: t('common.contactTitle'),
      meta: [
        {
          name: 'description',
          content: t('common.contactDesc'),
        },
      ],
    })

    const contactInfo = [
      {
        icon: 'bi bi-geo-alt-fill',
        label: t('contact.mainOffice'),
        value: t('contact.address'),
      },
      { icon: 'bi bi-envelope-fill', label: t('common.email'), value: 'contact@verityplus.space' },
      {
        icon: 'bi bi-telephone-fill',
        label: t('common.phone') ?? 'Telepon',
        value: t('contact.phone'),
      },
    ]

    const handleSubmit = (e: Event) => {
      e.preventDefault()
      alert(t('contact.messageSent'))
    }

    return () => (
      <section class="bg-background py-16 px-6 sm:py-24">
        <div class="container-page">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 class="text-primary font-semibold tracking-wide uppercase text-sm mb-2">
                {t('contact.heading')}
              </h2>
              <h1 class="text-4xl font-extrabold text-text-primary mb-6">{t('contact.title')}</h1>
              <p class="text-lg text-text-secondary mb-10">{t('contact.description')}</p>

              <div class="space-y-8">
                {contactInfo.map((info) => (
                  <div key={info.label} class="flex items-start gap-4">
                    <div class="flex-shrink-0 w-12 h-12 bg-primary-100 text-primary rounded-lg flex items-center justify-center">
                      <i class={[info.icon, 'text-xl']} />
                    </div>
                    <div>
                      <h4 class="text-lg font-bold text-text-primary">{info.label}</h4>
                      <p class="text-text-secondary">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div class="bg-surface p-8 rounded-2xl border border-border shadow-card">
              <form onSubmit={handleSubmit} class="space-y-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-text-secondary mb-2">
                      {t('contact.firstName')}
                    </label>
                    <input
                      type="text"
                      placeholder={t('contact.firstNamePlaceholder')}
                      class="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition bg-background text-text-primary"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-text-secondary mb-2">
                      {t('contact.lastName')}
                    </label>
                    <input
                      type="text"
                      placeholder={t('contact.lastNamePlaceholder')}
                      class="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition bg-background text-text-primary"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-2">
                    {t('common.email')}
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    class="w-full px-4 py-3 rounded-[var(--radius-lg)] border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition bg-background text-text-primary"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-2">
                    {t('contact.message')}
                  </label>
                  <textarea
                    rows={4}
                    placeholder={t('contact.messagePlaceholder')}
                    class="w-full px-4 py-3 rounded-[var(--radius-lg)] border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition bg-background text-text-primary resize-none"
                  ></textarea>
                </div>

                <BaseButton
                  fullWidth
                  type="submit"
                  class="py-4 text-base shadow-lg hover:shadow-xl transition duration-300 hover:-translate-y-0.5"
                >
                  {t('contact.sendMessage')}
                </BaseButton>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  },
})
