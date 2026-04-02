import { defineComponent } from 'vue'
import { useHead } from '@/composables/useHead'

/**
 * Static View: PrivacyPolicyView
 */
export default defineComponent({
  name: 'PrivacyPolicyView',
  setup() {
    useHead({
      title: 'Kebijakan Privasi — Verity+',
      meta: [
        {
          name: 'description',
          content: 'Kebijakan privasi Verity+ — bagaimana kami melindungi data pribadi Anda.',
        },
      ],
    })

    const sections = [
      {
        title: '1. Pendahuluan',
        text: 'Privasi Anda sangat penting bagi kami. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda saat Anda menggunakan layanan kami. Dengan menggunakan platform kami, Anda menyetujui praktik yang dijelaskan dalam kebijakan ini.',
      },
      {
        title: '2. Informasi yang Kami Kumpulkan',
        intro:
          'Kami mengumpulkan informasi yang Anda berikan secara langsung kepada kami, termasuk namun tidak terbatas pada:',
        items: [
          'Nama lengkap dan informasi kontak (email, nomor telepon).',
          'Data demografis jika diperlukan untuk layanan tertentu.',
          'Informasi teknis seperti alamat IP, jenis perangkat, dan log aktivitas browser melalui Cookies.',
        ],
      },
      {
        title: '3. Penggunaan Informasi',
        intro: 'Informasi yang kami kumpulkan digunakan untuk:',
        items: [
          'Menyediakan, memelihara, dan meningkatkan layanan kami.',
          'Memproses transaksi dan mengirimkan pemberitahuan terkait.',
          'Mengirimkan komunikasi pemasaran (Anda dapat berhenti berlangganan kapan saja).',
          'Mendeteksi dan mencegah aktivitas penipuan atau teknis yang mencurigakan.',
        ],
      },
      {
        title: '4. Keamanan Data',
        text: 'Kami menerapkan langkah-langkah keamanan teknis dan organisasional yang standar di industri untuk melindungi data pribadi Anda dari akses tidak sah, pengungkapan, atau modifikasi. Namun, harap diingat bahwa tidak ada metode transmisi data melalui internet yang 100% aman.',
      },
      {
        title: '5. Hak Anda',
        text: 'Anda memiliki hak untuk mengakses, memperbarui, atau meminta penghapusan informasi pribadi yang kami simpan. Jika Anda ingin menggunakan hak ini, silakan hubungi kami melalui informasi kontak yang tersedia di halaman Kontak kami.',
      },
    ]

    return () => (
      <section class="bg-background-alt py-16 px-6 sm:py-24">
        <div class="max-w-4xl mx-auto bg-surface p-8 sm:p-12 rounded-2xl shadow-card border border-border text-left">
          <div class="border-b border-border pb-8 mb-8">
            <h1 class="text-3xl sm:text-4xl font-extrabold text-text-primary mb-4">
              Kebijakan Privasi
            </h1>
            <p class="text-text-muted italic">Terakhir diperbarui: 20 Mei 2024</p>
          </div>

          <div class="prose prose-blue max-w-none text-text-secondary leading-relaxed space-y-8">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 class="text-xl font-bold text-text-primary mb-3 flex items-center border-b border-border/10 pb-2">
                  {section.title}
                </h2>
                {section.text && <p>{section.text}</p>}
                {section.items && (
                  <>
                    {section.intro && <p class="mb-3">{section.intro}</p>}
                    <ul class="list-disc pl-6 space-y-2 marker:text-primary">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </>
                )}
              </section>
            ))}

            <div class="bg-primary-50 border-l-4 border-primary p-6 rounded-r-lg mt-10">
              <p class="text-primary-700 font-bold mb-1">Pertanyaan tentang kebijakan ini?</p>
              <p class="text-primary-600 text-sm">
                Jika Anda memiliki pertanyaan tambahan mengenai penggunaan data Anda, jangan ragu
                untuk menghubungi tim kepatuhan kami melalui email di{' '}
                <span class="font-bold underline">privacy@verityplus.space</span>.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  },
})
