import { defineComponent } from 'vue'
import { BaseButton } from '@/components/ui/Button'

/**
 * Static View: ContactView
 */
export default defineComponent({
  name: 'ContactView',
  setup() {
    const contactInfo = [
      { icon: 'bi bi-geo-alt-fill', label: 'Kantor Utama', value: 'Jl. Teknologi No. 42, Jakarta Selatan, Indonesia' },
      { icon: 'bi bi-envelope-fill', label: 'Email', value: 'contact@verityplus.space' },
      { icon: 'bi bi-telephone-fill', label: 'Telepon', value: '+62 21 1234 5678' },
    ]

    const handleSubmit = (e: Event) => {
      e.preventDefault()
      alert('Pesan Anda telah terkirim (Ini hanya demo)')
    }

    return () => (
      <section class="bg-background py-16 px-6 sm:py-24">
        <div class="container-page">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 class="text-primary font-semibold tracking-wide uppercase text-sm mb-2">
                Hubungi Kami
              </h2>
              <h1 class="text-4xl font-extrabold text-text-primary mb-6">
                Mari Mulai Sesuatu yang Luar Biasa
              </h1>
              <p class="text-lg text-text-secondary mb-10">
                Punya ide atau pertanyaan? Tim kami siap membantu Anda mewujudkan visi digital Anda. Kirimkan pesan dan kami
                akan membalas dalam 24 jam.
              </p>

              <div class="space-y-8">
                {contactInfo.map(info => (
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
                    <label class="block text-sm font-medium text-text-secondary mb-2">Nama Depan</label>
                    <input
                      type="text"
                      placeholder="John"
                    class="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition bg-background text-text-primary"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-text-secondary mb-2">Nama Belakang</label>
                    <input
                      type="text"
                      placeholder="Doe"
                    class="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition bg-background text-text-primary"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    class="w-full px-4 py-3 rounded-[var(--radius-lg)] border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition bg-background text-text-primary"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-2">Pesan</label>
                  <textarea
                    rows={4}
                    placeholder="Apa yang bisa kami bantu?"
                    class="w-full px-4 py-3 rounded-[var(--radius-lg)] border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition bg-background text-text-primary resize-none"
                  ></textarea>
                </div>

                <BaseButton fullWidth type="submit" class="py-4 text-base shadow-lg hover:shadow-xl transition duration-300 hover:-translate-y-0.5">
                  Kirim Pesan
                </BaseButton>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  },
})
