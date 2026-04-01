import { defineComponent, ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { AppLogo } from '../ui/Logo'
import { BaseButton } from '../ui/Button'

/**
 * Layout Component: Footer
 * Global site footer with navigation links and newsletter.
 */
export const AppFooter = defineComponent({
  name: 'AppFooter',
  setup() {
    const email = ref('')
    const currentYear = computed(() => new Date().getFullYear())

    const handleSubscribe = (e: Event) => {
      e.preventDefault()
      alert(`Terima kasih telah mendaftar dengan email: ${email.value}`)
      email.value = ''
    }

    return () => (
      <footer class="bg-text-primary text-text-muted pt-12 pb-6 mt-auto">
        <div class="container-page">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

            <div class="col-span-1 md:col-span-1">
              <div class="w-fit">
                <AppLogo inverted />
              </div>
              <p class="text-sm mt-4 leading-relaxed text-white/60">
                VERITY+ adalah media digital yang menghadirkan informasi sekaligus solusi bagi generasi muda.
              </p>
            </div>

            <div>
              <h3 class="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Perusahaan</h3>
              <ul class="space-y-2">
                <li>
                  <RouterLink to={{ name: 'about-us' }} class="text-white/60 hover:text-primary transition-colors text-sm">Tentang Kami</RouterLink>
                </li>
                <li>
                  <RouterLink to={{ name: 'contact' }} class="text-white/60 hover:text-primary transition-colors text-sm">Kontak</RouterLink>
                </li>
                <li>
                  <RouterLink to={{ name: 'advertise' }} class="text-white/60 hover:text-primary transition-colors text-sm">Periklanan</RouterLink>
                </li>
              </ul>
            </div>

            <div>
              <h3 class="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Bantuan</h3>
              <ul class="space-y-2">
                <li>
                  <RouterLink to={{ name: 'privacy-policy' }} class="text-white/60 hover:text-primary transition-colors text-sm">Kebijakan Privasi</RouterLink>
                </li>
                <li>
                  <RouterLink to={{ name: 'terms-and-conditions' }} class="text-white/60 hover:text-primary transition-colors text-sm">Syarat & Ketentuan</RouterLink>
                </li>
              </ul>
            </div>

            <div>
              <h3 class="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Newsletter</h3>
              <p class="text-sm mb-4 text-white/60">Dapatkan update terbaru dari kami langsung di inbox Anda.</p>
              <form onSubmit={handleSubscribe} class="flex flex-col gap-2">
                <input
                  value={email.value}
                  onInput={(e) => { email.value = (e.target as HTMLInputElement).value }}
                  type="email"
                  placeholder="Email Anda"
                  class="bg-white/10 border border-white/15 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-primary text-sm placeholder-white/40 transition-colors"
                  required
                />
                <BaseButton fullWidth type="submit">
                  Langganan
                </BaseButton>
              </form>
            </div>
          </div>

          <hr class="border-white/10 mb-8" />

          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-sm text-white/40">
              &copy; {currentYear.value} VERITY+. Hak cipta dilindungi undang-undang.
            </p>

            <div class="flex space-x-6">
              <a href="https://instagram.com/verityplus" class="text-white/40 hover:text-white transition-colors text-sm">Instagram</a>
              <a href="https://tiktok.com/@verityplus" class="text-white/40 hover:text-white transition-colors text-sm">TikTok</a>
              <a href="mailto:contact@verityplus.space" class="text-white/40 hover:text-white transition-colors text-sm">Email</a>
            </div>
          </div>
        </div>
      </footer>
    )
  },
})
