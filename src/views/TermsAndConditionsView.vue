<template>
  <section class="bg-background-alt py-16 px-6 sm:py-24">
    <div class="max-w-4xl mx-auto bg-surface p-8 sm:p-12 rounded-[var(--radius-2xl)] shadow-[var(--shadow-card)] border border-border">

      <div class="border-b border-border pb-8 mb-8 text-center sm:text-left">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-text-primary mb-4">
          Syarat dan Ketentuan
        </h1>
        <p class="text-text-secondary">
          Selamat datang di platform kami. Harap baca dokumen ini dengan seksama.
        </p>
        <p class="text-xs text-text-muted mt-2 uppercase tracking-widest">
          Versi 1.2 — Pembaruan Terakhir: 30 Maret 2026
        </p>
      </div>

      <div class="text-text-secondary leading-relaxed space-y-10">

        <section v-for="(section, index) in sections" :key="section.title">
          <h2 class="text-xl font-bold text-text-primary mb-4 flex items-baseline">
            <span class="text-primary mr-2 tabular-nums">{{ String(index + 1).padStart(2, '0') }}.</span>
            {{ section.title }}
          </h2>
          <p v-if="section.text">{{ section.text }}</p>
          <template v-if="section.items">
            <p v-if="section.intro" class="mb-3">{{ section.intro }}</p>
            <ul class="list-disc pl-6 space-y-2 marker:text-primary">
              <li v-for="item in section.items" :key="item">{{ item }}</li>
            </ul>
          </template>
          <div v-if="section.quote" class="bg-surface-muted p-6 rounded-[var(--radius-xl)] border-l-4 border-border italic text-sm">
            {{ section.quote }}
          </div>
        </section>

        <div class="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p class="text-sm text-text-muted text-center sm:text-left">
            Ada pertanyaan mengenai dokumen ini?
          </p>
          <button class="btn-primary">
            Hubungi Tim Legal
          </button>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const sections = [
  {
    title: 'Penerimaan Ketentuan',
    text: 'Dengan mengakses atau menggunakan situs web dan layanan kami, Anda dianggap telah membaca, memahami, dan setuju untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak setuju dengan bagian mana pun dari ketentuan ini, Anda disarankan untuk tidak menggunakan layanan kami.',
  },
  {
    title: 'Akun Pengguna',
    intro: 'Untuk mengakses fitur tertentu, Anda mungkin diminta untuk membuat akun. Anda bertanggung jawab penuh atas:',
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
    quote: '"Kami menyediakan layanan ini \'sebagaimana adanya\' tanpa jaminan apa pun. Kami tidak bertanggung jawab atas kerugian langsung, tidak langsung, atau konsekuensial yang timbul dari penggunaan atau ketidakmampuan Anda dalam menggunakan layanan kami."',
  },
  {
    title: 'Perubahan Ketentuan',
    text: 'Kami berhak untuk mengubah atau mengganti Syarat dan Ketentuan ini kapan saja. Perubahan akan berlaku segera setelah diposting di halaman ini. Kami akan memberikan notifikasi melalui email atau pengumuman di situs jika terdapat perubahan material.',
  },
]
</script>
