import { defineComponent } from 'vue'
import { useHead } from '@/composables/useHead'
import { BaseButton } from '@/components/ui/Button'

/**
 * Static View: TermsAndConditionsView
 */
export default defineComponent({
  name: 'TermsAndConditionsView',
  setup() {
    useHead({
      title: 'Syarat dan Ketentuan — Verity+',
      meta: [{ name: 'description', content: 'Syarat dan ketentuan penggunaan platform Verity+.' }],
    })

    const sections = [
      {
        title: 'Penerimaan Ketentuan',
        text: 'Dengan mengakses atau menggunakan situs web dan layanan kami, Anda dianggap telah membaca, memahami, dan setuju untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak setuju dengan bagian mana pun dari ketentuan ini, Anda disarankan untuk tidak menggunakan layanan kami.',
      },
      {
        title: 'Akun Pengguna',
        intro:
          'Untuk mengakses fitur tertentu, Anda mungkin diminta untuk membuat akun. Anda bertanggung jawab penuh atas:',
        items: [
          'Menjaga kerahasiaan kata sandi dan informasi akun Anda.',
          'Semua aktivitas yang terjadi di bawah akun Anda.',
          'Memberikan informasi yang akurat, lengkap, dan terbaru.',
        ],
      },
      {
        title: 'Hak Kekayaan Intelektual',
        text: 'Seluruh konten yang tersedia di platform ini, termasuk namun tidak terbatas pada teks, grafik, logo, ikon, gambar, dan perangkat lunak, adalah properti kami atau pemberi lisensi kami dan dilindungi oleh undang-undang hak cipta internasional. Penggunaan tanpa izin tertulis merupakan pelanggaran hukum.',
      },
      {
        title: 'Batasan Tanggung Jawab',
        quote:
          '"Kami menyediakan layanan ini \'sebagaimana adanya\' tanpa jaminan apa pun. Kami tidak bertanggung jawab atas kerugian langsung, tidak langsung, atau konsekuensial yang timbul dari penggunaan atau ketidakmampuan Anda dalam menggunakan layanan kami."',
      },
      {
        title: 'Perubahan Ketentuan',
        text: 'Kami berhak untuk mengubah atau mengganti Syarat dan Ketentuan ini kapan saja. Perubahan akan berlaku segera setelah diposting di halaman ini. Kami akan memberikan notifikasi melalui email atau pengumuman di situs jika terdapat perubahan material.',
      },
    ]

    return () => (
      <section class="bg-background-alt py-16 px-6 sm:py-24">
        <div class="max-w-4xl mx-auto bg-surface p-8 sm:p-12 rounded-2xl shadow-card border border-border text-left">
          <div class="border-b border-border pb-8 mb-8 text-center sm:text-left">
            <h1 class="text-3xl sm:text-4xl font-extrabold text-text-primary mb-4">
              Syarat dan Ketentuan
            </h1>
            <p class="text-text-secondary leading-relaxed">
              Selamat datang di platform kami. Harap baca dokumen ini dengan seksama sebelum
              menggunakan layanan kami.
            </p>
            <p class="text-xs text-text-muted mt-4 uppercase tracking-widest font-bold">
              Versi 1.2 — Pembaruan Terakhir: 30 Maret 2026
            </p>
          </div>

          <div class="text-text-secondary leading-relaxed space-y-10">
            {sections.map((section, index) => (
              <section key={section.title}>
                <h2 class="text-xl font-bold text-text-primary mb-4 flex items-baseline border-b border-border/10 pb-2">
                  <span class="text-primary mr-3 tabular-nums font-black text-2xl">
                    {(index + 1).toString().padStart(2, '0')}.
                  </span>
                  {section.title}
                </h2>
                {section.text && <p>{section.text}</p>}
                {section.items && (
                  <>
                    {section.intro && <p class="mb-3">{section.intro}</p>}
                    <ul class="list-disc pl-8 space-y-2 marker:text-primary">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </>
                )}
                {section.quote && (
                  <div class="bg-surface-muted p-6 rounded-xl border-l-4 border-primary transition hover:shadow-card-hover italic text-sm text-text-primary">
                    {section.quote}
                  </div>
                )}
              </section>
            ))}

            <div class="pt-10 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-6">
              <p class="text-sm text-text-muted text-center sm:text-left leading-relaxed">
                Ada pertanyaan atau butuh klarifikasi mengenai dokumen ini?
                <br />
                Tim hukum kami siap membantu Anda.
              </p>
              <BaseButton class="px-8 shadow-lg shadow-primary/20">Hubungi Tim Legal</BaseButton>
            </div>
          </div>
        </div>
      </section>
    )
  },
})
