<template>
  <section class="bg-white py-12 px-6 sm:py-20 font-sans">
    <div class="max-w-7xl mx-auto">

      <div class="mb-12 border-b border-gray-100 pb-10">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
          Hasil Pencarian
        </h1>
        <p class="text-lg text-gray-600 mb-6">
          Menampilkan hasil untuk: <span class="font-bold text-blue-600">"{{ searchQuery }}"</span>
        </p>

        <div class="max-w-2xl relative">
          <input v-model="searchQuery" type="text" placeholder="Cari artikel lainnya..."
            class="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition duration-300" />
          <svg class="w-6 h-6 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-12">
        <div class="flex-grow space-y-8">

          <article v-for="article in articles" :key="article.id"
            class="group flex flex-col md:flex-row gap-6 p-4 rounded-3xl hover:bg-gray-50 transition duration-300 border border-transparent hover:border-gray-100">
            <div class="w-full md:w-64 h-44 flex-shrink-0 overflow-hidden rounded-2xl shadow-sm bg-gray-200">
              <img :src="article.image" :alt="article.title"
                class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
            </div>

            <div class="flex flex-col justify-center">
              <div class="flex items-center gap-3 mb-2 text-sm">
                <span
                  class="px-3 py-1 bg-blue-100 text-blue-600 font-bold rounded-full uppercase text-[10px] tracking-widest">
                  {{ article.category }}
                </span>
                <span class="text-gray-400">{{ article.date }}</span>
              </div>
              <h2 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                <a href="#">{{ article.title }}</a>
              </h2>
              <p class="text-gray-600 line-clamp-2 mb-4 text-sm leading-relaxed">
                {{ article.excerpt }}
              </p>
              <div
                class="flex items-center gap-2 text-xs font-bold text-gray-900 uppercase tracking-tighter cursor-pointer group/link">
                Baca Selengkapnya
                <svg class="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none"
                  stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3">
                  </path>
                </svg>
              </div>
            </div>
          </article>

          <div v-if="articles.length === 0" class="text-center py-20">
            <p class="text-gray-500">Tidak ada artikel yang ditemukan.</p>
          </div>
        </div>

        <aside class="w-full lg:w-80 space-y-10">
          <div>
            <h3 class="text-lg font-bold text-gray-900 mb-6 border-l-4 border-blue-600 pl-4">Kategori</h3>
            <ul class="space-y-2">
              <li v-for="cat in categories" :key="cat.name"
                class="flex justify-between items-center p-3 rounded-xl hover:bg-blue-50 transition cursor-pointer group">
                <span class="text-gray-700 font-medium group-hover:text-blue-600">{{ cat.name }}</span>
                <span class="text-xs font-bold bg-gray-100 px-2 py-1 rounded-lg text-gray-500">{{ cat.count }}</span>
              </li>
            </ul>
          </div>

          <div class="bg-gray-900 p-8 rounded-3xl text-white relative overflow-hidden">
            <div class="relative z-10">
              <h3 class="text-xl font-bold mb-3">Newsletter</h3>
              <p class="text-gray-400 text-sm mb-6">Dapatkan update mingguan langsung di inbox Anda.</p>
              <input type="email" placeholder="Email Anda"
                class="w-full px-4 py-3 rounded-xl bg-gray-800 border-none text-white focus:ring-2 focus:ring-blue-500 mb-3 outline-none transition" />
              <button
                class="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition">Gabung</button>
            </div>
            <div class="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl"></div>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Variabel Reaktif
const searchQuery = ref('Strategi Digital Marketing 2026');

const articles = ref([
  {
    id: 1,
    title: 'Cara Menggunakan AI untuk Konten Marketing',
    excerpt: 'Ketahui bagaimana teknologi kecerdasan buatan dapat membantu Anda menciptakan konten yang lebih relevan dan menarik bagi audiens Anda.',
    category: 'Teknologi',
    date: '28 Mar 2026',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Membangun Branding Personal di LinkedIn',
    excerpt: 'Panduan lengkap langkah demi langkah untuk membangun profil profesional yang kuat dan menarik peluang kerja impian Anda.',
    category: 'Bisnis',
    date: '25 Mar 2026',
    image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Desain Minimalis: Mengapa Less is More?',
    excerpt: 'Eksplorasi tren desain grafis tahun ini yang kembali mengusung kesederhanaan namun tetap memberikan dampak visual yang maksimal.',
    category: 'Desain',
    date: '20 Mar 2026',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252729f?auto=format&fit=crop&w=800&q=80'
  }
]);

const categories = ref([
  { name: 'Teknologi', count: 12 },
  { name: 'Bisnis', count: 8 },
  { name: 'Desain', count: 5 },
  { name: 'Lifestyle', count: 15 }
]);
</script>
