import { defineComponent } from 'vue'
import { useHead } from '@/composables/useHead'
import { useI18n } from 'vue-i18n'

/**
 * Static View: AboutUsView
 */
export default defineComponent({
  name: 'AboutUsView',
  setup() {
    const { t } = useI18n()

    useHead({
      title: t('common.aboutTitle'),
      meta: [
        {
          name: 'description',
          content: t('common.aboutDesc'),
        },
      ],
    })

    const coreValues = [
      {
        icon: 'bi bi-lightning-fill',
        title: t('about.innovationTitle'),
        description: t('about.innovationDesc'),
      },
      {
        icon: 'bi bi-people-fill',
        title: t('about.collaborationTitle'),
        description: t('about.collaborationDesc'),
      },
      {
        icon: 'bi bi-shield-check',
        title: t('about.integrityTitle'),
        description: t('about.integrityDesc'),
      },
    ]

    return () => (
      <section class="bg-background py-16 px-6 sm:py-24">
        <div class="container-page">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="text-primary font-semibold tracking-wide uppercase text-sm mb-2">
                {t('about.whoWeAre')}
              </h2>
              <h1 class="text-4xl sm:text-5xl font-extrabold text-text-primary leading-tight mb-6">
                {t('about.heading')}
              </h1>
              <p class="text-lg text-text-secondary mb-8 leading-relaxed">
                {t('about.description')}
              </p>

              <div class="grid grid-cols-2 gap-6 border-t border-border pt-8">
                <div>
                  <span class="block text-3xl font-bold text-text-primary">150+</span>
                  <span class="text-sm text-text-muted uppercase tracking-wider">
                    {t('about.projectsCompleted')}
                  </span>
                </div>
                <div>
                  <span class="block text-3xl font-bold text-text-primary">10+</span>
                  <span class="text-sm text-text-muted uppercase tracking-wider">
                    {t('about.yearsExperience')}
                  </span>
                </div>
              </div>
            </div>

            <div class="relative">
              <div class="aspect-square overflow-hidden rounded-2xl shadow-elevated">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt={t('about.teamAlt')}
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="absolute -bottom-6 -left-6 bg-primary text-text-inverse p-6 rounded-xl hidden md:block shadow-elevated">
                <p class="text-xl font-medium">{t('about.quote')}</p>
              </div>
            </div>
          </div>

          {/* Core Values Section */}
          <div class="mt-24">
            <div class="text-center mb-16">
              <h3 class="text-3xl font-bold text-text-primary">{t('about.coreValues')}</h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              {coreValues.map((value) => (
                <div
                  key={value.title}
                  class="p-8 bg-surface rounded-xl border border-border hover:border-primary/30 hover:shadow-card-hover transition duration-300"
                >
                  <div class="w-12 h-12 bg-primary-100 text-primary rounded-lg flex items-center justify-center mb-4">
                    <i class={[value.icon, 'text-xl']} />
                  </div>
                  <h4 class="text-xl font-semibold mb-2 text-text-primary">{value.title}</h4>
                  <p class="text-text-secondary">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  },
})
