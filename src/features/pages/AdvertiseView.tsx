import { defineComponent } from 'vue'
import { useHead } from '@/composables/useHead'
import { BaseButton } from '@/components/ui/Button'

/**
 * Static View: AdvertiseView
 */
export default defineComponent({
  name: 'AdvertiseView',
  setup() {
    useHead({
      title: 'Iklan & Kerjasama — Verity+',
      meta: [
        {
          name: 'description',
          content: 'Tingkatkan visibilitas brand Anda dengan beriklan di platform Verity+.',
        },
      ],
    })

    const stats = [
      { value: '500K+', label: 'Monthly Views' },
      { value: '120K+', label: 'Active Users' },
      { value: '4.8%', label: 'Avg. CTR' },
      { value: '25K+', label: 'Subscribers' },
    ]

    const plans = [
      {
        name: 'Starter',
        subtitle: 'Cocok untuk UMKM atau kampanye uji coba.',
        price: 'Rp 1.5jt',
        period: '/bulan',
        featured: false,
        cta: 'Pilih Paket',
        features: [
          { text: 'Banner Sidebar (300x250)', included: true },
          { text: '1 Dedicated Post', included: true },
          { text: 'Social Media Shoutout', included: false },
        ],
      },
      {
        name: 'Professional',
        subtitle: 'Maksimalkan eksposur brand Anda.',
        price: 'Rp 4.5jt',
        period: '/bulan',
        featured: true,
        cta: 'Mulai Sekarang',
        features: [
          { text: 'Banner Header Utama', included: true },
          { text: '3 Sponsored Articles', included: true },
          { text: 'Social Media Post (IG/FB)', included: true },
          { text: 'Weekly Newsletter', included: true },
        ],
      },
      {
        name: 'Custom',
        subtitle: 'Solusi skala besar sesuai kebutuhan Anda.',
        price: 'Hubungi Kami',
        period: '',
        featured: false,
        cta: 'Konsultasi Gratis',
        features: [
          { text: 'Semua Fitur Professional', included: true },
          { text: 'Full Page Branding', included: true },
          { text: 'Video Review / Unboxing', included: true },
        ],
      },
    ]

    return () => (
      <section class="bg-background py-16 px-6 sm:py-24">
        <div class="container-page">
          <div class="text-center max-w-3xl mx-auto mb-16">
            <h2 class="text-primary font-semibold tracking-wide uppercase text-sm mb-2">
              Advertising
            </h2>
            <h1 class="text-4xl sm:text-5xl font-extrabold text-text-primary mb-6">
              Jangkau Audiens yang Tepat Bersama Kami
            </h1>
            <p class="text-lg text-text-secondary">
              Tingkatkan visibilitas brand Anda dengan menempatkan iklan di platform kami yang
              memiliki ribuan pengunjung aktif setiap harinya.
            </p>
          </div>

          {/* Stats Summary */}
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 py-10 border-y border-border">
            {stats.map((stat) => (
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
            {plans.map((plan) => (
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
                    TERPOPULER
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
