<template>
  <section class="bg-background py-16 px-6 sm:py-24">
    <div class="container-page">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-primary font-semibold tracking-wide uppercase text-sm mb-2">
            Siapa Kami
          </h2>
          <h1 class="text-4xl sm:text-5xl font-extrabold text-text-primary leading-tight mb-6">
            Membangun Masa Depan Digital yang Lebih Baik
          </h1>
          <p class="text-lg text-text-secondary mb-8 leading-relaxed">
            Kami adalah tim kreatif dan pengembang yang berdedikasi untuk memberikan solusi teknologi inovatif. Fokus
            kami adalah membantu bisnis bertransformasi di era digital dengan desain yang berpusat pada pengguna dan
            performa yang optimal.
          </p>

          <div class="grid grid-cols-2 gap-6 border-t border-border pt-8">
            <div>
              <span class="block text-3xl font-bold text-text-primary">150+</span>
              <span class="text-sm text-text-muted uppercase tracking-wider">Proyek Selesai</span>
            </div>
            <div>
              <span class="block text-3xl font-bold text-text-primary">10+</span>
              <span class="text-sm text-text-muted uppercase tracking-wider">Tahun Pengalaman</span>
            </div>
          </div>
        </div>

        <div class="relative">
          <div class="aspect-square overflow-hidden rounded-[var(--radius-2xl)] shadow-[var(--shadow-elevated)]">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
              alt="Tim Kami Sedang Bekerja"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="absolute -bottom-6 -left-6 bg-primary text-text-inverse p-6 rounded-[var(--radius-xl)] hidden md:block shadow-[var(--shadow-elevated)]">
            <p class="text-xl font-medium">"Kreativitas tanpa batas, hasil tanpa kompromi."</p>
          </div>
        </div>
      </div>

      <!-- Core Values -->
      <div class="mt-24">
        <div class="text-center mb-16">
          <h3 class="text-3xl font-bold text-text-primary">Nilai Inti Kami</h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="value in coreValues"
            :key="value.title"
            class="p-8 bg-surface rounded-[var(--radius-xl)] border border-border hover:border-primary/30 hover:shadow-[var(--shadow-card-hover)] transition duration-300"
          >
            <div class="w-12 h-12 bg-primary-100 text-primary rounded-[var(--radius-lg)] flex items-center justify-center mb-4">
              <i :class="value.icon" class="text-xl"></i>
            </div>
            <h4 class="text-xl font-semibold mb-2 text-text-primary">{{ value.title }}</h4>
            <p class="text-text-secondary">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const coreValues = [
  {
    icon: 'bi bi-lightning-fill',
    title: 'Inovasi Cepat',
    description: 'Kami selalu mencari cara baru untuk menyelesaikan masalah lama dengan teknologi terkini.',
  },
  {
    icon: 'bi bi-people-fill',
    title: 'Kolaborasi Tim',
    description: 'Bekerja bersama klien sebagai partner untuk memastikan visi menjadi kenyataan.',
  },
  {
    icon: 'bi bi-shield-check',
    title: 'Integritas',
    description: 'Kepercayaan adalah fondasi kami. Kami menjunjung tinggi transparansi dan kejujuran.',
  },
]
</script>
