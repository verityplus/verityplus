import { defineComponent, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { AppLogo } from '../ui/Logo'

/**
 * Layout Component: Footer
 * Global site footer with navigation links.
 */
export const AppFooter = defineComponent({
  name: 'AppFooter',
  setup() {
    const { t } = useI18n()
    const currentYear = computed(() => new Date().getFullYear())

    return () => (
      <footer class="bg-text-primary text-text-muted pt-12 pb-6 mt-auto">
        <div class="container-page">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div class="col-span-1 md:col-span-1">
              <div class="w-fit">
                <AppLogo inverted />
              </div>
              <p class="text-sm mt-4 leading-relaxed text-white/60">{t('footer.description')}</p>
            </div>

            <div>
              <h3 class="text-white font-semibold mb-4 uppercase tracking-wider text-sm">
                {t('footer.company')}
              </h3>
              <ul class="space-y-2">
                <li>
                  <RouterLink
                    to={{ name: 'about-us' }}
                    class="text-white/60 hover:text-primary transition-colors text-sm"
                  >
                    {t('footer.about')}
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    to={{ name: 'contact' }}
                    class="text-white/60 hover:text-primary transition-colors text-sm"
                  >
                    {t('footer.contact')}
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    to={{ name: 'advertise' }}
                    class="text-white/60 hover:text-primary transition-colors text-sm"
                  >
                    {t('footer.advertise')}
                  </RouterLink>
                </li>
              </ul>
            </div>

            <div>
              <h3 class="text-white font-semibold mb-4 uppercase tracking-wider text-sm">
                {t('footer.help')}
              </h3>
              <ul class="space-y-2">
                <li>
                  <RouterLink
                    to={{ name: 'privacy-policy' }}
                    class="text-white/60 hover:text-primary transition-colors text-sm"
                  >
                    {t('footer.privacy')}
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    to={{ name: 'terms-and-conditions' }}
                    class="text-white/60 hover:text-primary transition-colors text-sm"
                  >
                    {t('footer.terms')}
                  </RouterLink>
                </li>
              </ul>
            </div>

            <div>
              <h3 class="text-white font-semibold mb-4 uppercase tracking-wider text-sm">
                {t('footer.social')}
              </h3>
              <ul class="space-y-2">
                <li>
                  <a
                    href="https://instagram.com/verityplus"
                    class="text-white/60 hover:text-primary transition-colors text-sm"
                  >
                    {t('footer.instagram')}
                  </a>
                </li>
                <li>
                  <a
                    href="https://tiktok.com/@verityplus"
                    class="text-white/60 hover:text-primary transition-colors text-sm"
                  >
                    {t('footer.tiktok')}
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contact@verityplus.space"
                    class="text-white/60 hover:text-primary transition-colors text-sm"
                  >
                    {t('footer.email')}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <hr class="border-white/10 mb-8" />

          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-sm text-white/40">
              {t('footer.copyright', { year: currentYear.value })}
            </p>
          </div>
        </div>
      </footer>
    )
  },
})
