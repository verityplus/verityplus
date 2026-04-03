import { defineComponent, computed } from 'vue'
import { useHead } from '@/composables/useHead'
import { useI18n } from 'vue-i18n'
import { BaseButton } from '@/components/ui/Button'

/**
 * Static View: AdvertiseView
 */
export default defineComponent({
  name: 'AdvertiseView',
  setup() {
    const { t } = useI18n()

    const headTitle = computed(() => t('common.advertiseTitle'))
    const headDesc = computed(() => t('common.advertiseDesc'))

    useHead({
      title: headTitle,
      meta: [
        {
          name: 'description',
          content: headDesc,
        },
      ],
    })

    const stats = computed(() => [
      { value: '500K+', label: t('advertise.stats.monthlyViews') },
      { value: '120K+', label: t('advertise.stats.activeUsers') },
      { value: '4.8%', label: t('advertise.stats.avgCTR') },
      { value: '25K+', label: t('advertise.stats.subscribers') },
    ])

    const plans = computed(() => [
      {
        name: t('advertise.plans.starter.name'),
        subtitle: t('advertise.plans.starter.subtitle'),
        price: 'Rp 1.5jt',
        period: t('common.monthly'),
        featured: false,
        cta: t('advertise.plans.starter.cta'),
        features: [
          { text: t('advertise.features.bannerSidebar'), included: true },
          { text: t('advertise.features.dedicatedPost'), included: true },
          { text: t('advertise.features.socialMediaShoutout'), included: false },
        ],
      },
      {
        name: t('advertise.plans.professional.name'),
        subtitle: t('advertise.plans.professional.subtitle'),
        price: 'Rp 4.5jt',
        period: t('common.monthly'),
        featured: true,
        cta: t('advertise.plans.professional.cta'),
        features: [
          { text: t('advertise.features.headerBanner'), included: true },
          { text: t('advertise.features.sponsoredArticles'), included: true },
          { text: t('advertise.features.socialMediaPost'), included: true },
          { text: t('advertise.features.weeklyNewsletter'), included: true },
        ],
      },
      {
        name: t('advertise.plans.custom.name'),
        subtitle: t('advertise.plans.custom.subtitle'),
        price: t('common.contactUs'),
        period: '',
        featured: false,
        cta: t('advertise.plans.custom.cta'),
        features: [
          { text: t('advertise.features.allProfessionalFeatures'), included: true },
          { text: t('advertise.features.fullPageBranding'), included: true },
          { text: t('advertise.features.videoReview'), included: true },
        ],
      },
    ])

    return () => (
      <section class="bg-background py-16 px-6 sm:py-24">
        <div class="container-page">
          <div class="text-center max-w-3xl mx-auto mb-16">
            <h2 class="text-primary font-semibold tracking-wide uppercase text-sm mb-2">
              {t('advertise.heading')}
            </h2>
            <h1 class="text-4xl sm:text-5xl font-extrabold text-text-primary mb-6">
              {t('advertise.title')}
            </h1>
            <p class="text-lg text-text-secondary">{t('advertise.description')}</p>
          </div>

          {/* Stats Summary */}
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 py-10 border-y border-border">
            {stats.value.map((stat) => (
              <div key={stat.label} class="text-center">
                <div class="text-4xl font-bold text-text-primary">{stat.value}</div>
                <div class="text-sm text-text-muted mt-1 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Plan Comparison Cards */}
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.value.map((plan) => (
              <div
                key={plan.name}
                class={[
                  'rounded-2xl p-8 flex flex-col transition duration-300',
                  plan.featured
                    ? 'relative border-2 border-primary shadow-elevated bg-surface md:-translate-y-4'
                    : 'border border-border bg-surface hover:shadow-card-hover',
                ]}
              >
                {plan.featured && (
                  <div class="absolute top-0 right-8 -translate-y-1/2 bg-primary text-text-inverse px-4 py-1 rounded-full text-sm font-bold">
                    {t('common.mostPopular')}
                  </div>
                )}

                <h3 class="text-xl font-bold text-text-primary mb-2">{plan.name}</h3>
                <p class="text-text-muted mb-6">{plan.subtitle}</p>

                <div class="mb-6">
                  <span class="text-4xl font-extrabold text-text-primary">{plan.price}</span>
                  {plan.period && <span class="text-text-muted">{plan.period}</span>}
                </div>

                <ul class="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <li
                      key={feature.text}
                      class={[
                        'flex items-center',
                        feature.included ? 'text-text-secondary' : 'text-text-muted',
                      ]}
                    >
                      <i
                        class={[
                          'mr-2 text-lg',
                          feature.included
                            ? 'bi bi-check-lg text-emerald-500'
                            : 'bi bi-x-lg text-text-muted',
                        ]}
                      />
                      <span class={[plan.featured && feature.included ? 'font-medium' : '']}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <BaseButton fullWidth variant={plan.featured ? 'primary' : 'outline'} class="py-3">
                  {plan.cta}
                </BaseButton>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  },
})
