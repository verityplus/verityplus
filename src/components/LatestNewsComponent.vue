<script lang="ts" setup>
import { ref } from 'vue';

const latestNews = ref([
  { id: 1, category: 'Ekonomi', title: 'IHSG Hari Ini Diprediksi Menguat Seiring Masuknya Aliran Modal Asing', author: 'Admin', time: '15 Menit yang lalu', seed: 'news1' },
  { id: 2, category: 'Teknologi', title: 'Inovasi Baterai Solid-State Mulai Masuk Jalur Produksi Massal', author: 'Redaksi', time: '1 Jam yang lalu', seed: 'news2' },
  { id: 3, category: 'Gaya Hidup', title: 'Tren Wisata "Slow Travel" Semakin Diminati Generasi Z Tahun Ini', author: 'Travel Writer', time: '3 Jam yang lalu', seed: 'news3' },
  { id: 4, category: 'Olahraga', title: 'Piala Dunia 2026: Jadwal Lengkap dan Prediksi Tim Favorit', author: 'Sports Analyst', time: '5 Jam yang lalu', seed: 'news4' },
])
</script>
<template>
  <div class="border-2 border-primary rounded-xl p-6">
    <div class="flex items-center justify-between mb-8 border-b-2 border-primary pb-2">
      <h2 class="text-3xl font-black uppercase tracking-tighter">Artikel Terbaru</h2>
    </div>

    <div class="space-y-8">
      <article v-for="news in latestNews" :key="news.id" class="group cursor-pointer">
        <div class="flex flex-col md:flex-row gap-6">
          <div class="md:w-1/2 overflow-hidden rounded-xl">
            <img :src="`https://picsum.photos/seed/${news.seed}/800/450`"
              class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
          </div>
          <div class="md:w-1/2 flex flex-col justify-center">
            <div class="mb-3 w-fit p-2 bg-amber-300 rounded-md">{{ news.category }}</div>
            <h3 class="text-2xl font-bold leading-tight group-hover:text-primary mb-3 transition">
              {{ news.title }}
            </h3>
            <p class="text-muted-color text-sm line-clamp-2 mb-4">Analisis mendalam mengenai perkembangan terkini di
              sektor {{ news.category.toLowerCase() }} yang berdampak pada pasar nasional.</p>
            <div class="flex items-center text-xs text-muted-color-emphasis font-medium uppercase tracking-widest">
              <span>{{ news.author }}</span>
              <span class="mx-2">•</span>
              <span>{{ news.time }}</span>
            </div>
          </div>
        </div>
      </article>
      <div class="w-full flex flex-col items-end">
        <button class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition">Lihat Semua
          Berita</button>
      </div>
    </div>
  </div>
</template>
