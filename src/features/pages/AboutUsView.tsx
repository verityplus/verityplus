import { defineComponent, computed, onMounted, ref } from 'vue'
import { useHead } from '@/composables/useHead'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'AboutUsView',
  setup() {
    const { t } = useI18n()

    const headTitle = computed(() => t('common.aboutTitle'))
    const headDesc = computed(() => t('common.aboutDesc'))

    useHead({
      title: headTitle,
      meta: [
        {
          name: 'description',
          content: headDesc,
        },
      ],
    })

    const formatNumber = (num: number): string => {
      if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
      if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
      return num.toString()
    }

// Stats section removed

    const coreValues = computed(() => [
      {
        icon: 'bi bi-people-fill',
        title: t('about.communityTitle'),
        description: t('about.communityDesc'),
      },
      {
        icon: 'bi bi-palette-fill',
        title: t('about.creativityTitle'),
        description: t('about.creativityDesc'),
      },
      {
        icon: 'bi bi-lightning-fill',
        title: t('about.innovationTitle'),
        description: t('about.innovationDesc'),
      },
      {
        icon: 'bi bi-award-fill',
        title: t('about.qualityTitle'),
        description: t('about.qualityDesc'),
      },
    ])

    return () => (
      <section class="bg-background">

        <div class="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/5 py-20 sm:py-28">
          <div class="container-page">
            <div class="max-w-3xl mx-auto text-center">
              <span class="inline-block text-primary font-semibold tracking-widest uppercase text-xs mb-4">
                {t('about.whoWeAre')}
              </span>
              <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary leading-tight mb-6">
                {t('about.heading')}
              </h1>
              <p class="text-lg sm:text-xl text-text-secondary leading-relaxed">
                {t('about.description')}
              </p>
            </div>
          </div>
          <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        </div>


        <div class="py-16 sm:py-24 px-6">
          <div class="container-page">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div class="relative">
                <div class="aspect-[4/3] overflow-hidden rounded-2xl shadow-elevated">
                  <img
                    src="/about-us-team.png"
                    alt={t('about.teamAlt')}
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="absolute -bottom-4 -right-4 bg-primary text-text-inverse px-5 py-3 rounded-lg shadow-elevated">
                  <p class="text-sm font-medium">{t('about.established')}</p>
                </div>
              </div>

              <div>
                <h2 class="text-2xl sm:text-3xl font-bold text-text-primary mb-6">
                  {t('about.ourStory')}
                </h2>
                <div class="space-y-4 text-text-secondary leading-relaxed">
                  <p>{t('about.storyParagraph1')}</p>
                  <p>{t('about.storyParagraph2')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="py-16 sm:py-24 px-6 bg-surface border-y border-border">
          <div class="container-page">
            <div class="text-center mb-12">
              <span class="text-primary font-semibold tracking-widest uppercase text-xs">
                {t('about.purpose')}
              </span>
              <h2 class="text-3xl sm:text-4xl font-bold text-text-primary mt-2">
                {t('about.missionVision')}
              </h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div class="p-8 bg-background rounded-xl border border-border hover:border-primary/30 transition duration-300">
                <div class="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-5">
                  <i class="bi bi-bullseye text-xl" />
                </div>
                <h3 class="text-xl font-semibold text-text-primary mb-3">{t('about.mission')}</h3>
                <p class="text-text-secondary leading-relaxed">{t('about.missionDesc')}</p>
              </div>
              <div class="p-8 bg-background rounded-xl border border-border hover:border-primary/30 transition duration-300">
                <div class="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-5">
                  <i class="bi bi-eye-fill text-xl" />
                </div>
                <h3 class="text-xl font-semibold text-text-primary mb-3">{t('about.vision')}</h3>
                <p class="text-text-secondary leading-relaxed">{t('about.visionDesc')}</p>
              </div>
            </div>
          </div>
        </div>


        {/* Stats section removed */}


        <div class="py-16 sm:py-24 px-6 bg-surface border-t border-border">
          <div class="container-page">
            <div class="text-center mb-16">
              <span class="text-primary font-semibold tracking-widest uppercase text-xs">
                {t('about.whatWeBelieve')}
              </span>
              <h2 class="text-3xl sm:text-4xl font-bold text-text-primary mt-2">
                {t('about.coreValues')}
              </h2>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.value.map((value) => (
                <div
                  key={value.title}
                  class="p-6 bg-background rounded-xl border border-border hover:border-primary/30 hover:shadow-card-hover transition duration-300 group"
                >
                  <div class="w-11 h-11 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-text-inverse transition duration-300">
                    <i class={[value.icon, 'text-lg']} />
                  </div>
                  <h3 class="text-lg font-semibold text-text-primary mb-2">{value.title}</h3>
                  <p class="text-text-secondary text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  },
})
