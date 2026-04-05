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

    const plans = computed(() => [
      {
        name: t('advertise.plans.starter.name'),
        subtitle: t('advertise.plans.starter.subtitle'),
        price: 'Rp 200K',
        featured: false,
        cta: t('advertise.plans.starter.cta'),
        features: [
          { text: t('advertise.features.bannerSidebar3Days'), included: true },
          { text: t('advertise.features.oneAdvertorialArticle'), included: true },
          { text: t('advertise.features.oneInstagramPost'), included: true },
          { text: t('advertise.features.oneTikTokPost'), included: true },
        ],
      },
      {
        name: t('advertise.plans.professional.name'),
        subtitle: t('advertise.plans.professional.subtitle'),
        price: 'Rp 300K',
        featured: true,
        cta: t('advertise.plans.professional.cta'),
        features: [
          { text: t('advertise.features.bannerSidebar9Days'), included: true },
          { text: t('advertise.features.threeAdvertorialArticles'), included: true },
          { text: t('advertise.features.threeInstagramPosts'), included: true },
          { text: t('advertise.features.threeTikTokPosts'), included: true },
        ],
      },
      {
        name: t('advertise.plans.custom.name'),
        subtitle: t('advertise.plans.custom.subtitle'),
        price: t('common.contactUs'),
        featured: false,
        cta: t('advertise.plans.custom.cta'),
        features: [
          { text: t('advertise.features.allProfessionalBenefits'), included: true },
          { text: t('advertise.features.promotionalVideo'), included: true },
          { text: t('advertise.features.customCampaign'), included: true },
          { text: t('advertise.features.etCetera'), included: true },
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

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
