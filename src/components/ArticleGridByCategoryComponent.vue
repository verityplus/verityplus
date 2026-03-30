<script setup lang="ts">
import SubTopBarComponent from '@/components/SubTopBarComponent.vue';
// Definisi Interface untuk Type Safety
interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  author: string;
  readTime: string;
}

// Data Dummy Internal (Bisa dipindah ke store atau API nantinya)
const dummyArticles: Article[] = [
  {
    id: 1,
    title: "Membangun Desain Sistem yang Skalabel dengan Tailwind CSS",
    excerpt: "Pelajari bagaimana mengelola konfigurasi warna, tipografi, dan spacing agar konsisten di seluruh proyek besar.",
    category: "Design",
    date: "12 Okt 2026",
    author: "Arif Kurniawan",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Tips TypeScript: Utility Types yang Wajib Kamu Tahu",
    excerpt: "Mempercepat proses development dengan Omit, Pick, dan Partial untuk manipulasi interface yang lebih elegan.",
    category: "Development",
    date: "15 Okt 2026",
    author: "Siti Aminah",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&q=80",
    readTime: "8 min read"
  },
  {
    id: 3,
    title: "Eksplorasi Fitur Terbaru Vue 3.5 dan Vapor Mode",
    excerpt: "Vapor mode menjanjikan performa luar biasa tanpa Virtual DOM. Apakah ini masa depan framework frontend?",
    category: "Tech News",
    date: "18 Okt 2026",
    author: "Budi Santoso",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Optimasi Performa Gambar di Website Modern",
    excerpt: "Menggunakan format WebP, Avif, dan teknik lazy loading untuk mendapatkan skor Core Web Vitals yang sempurna.",
    category: "Optimization",
    date: "20 Okt 2026",
    author: "Rizky Pratama",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    readTime: "4 min read"
  }
];
</script>

<template>
  <SubTopBarComponent />
  <section class="bg-gray-50 py-12 px-4 lg:px-48">
    <div>
      <div class="mb-10 text-center">
        <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">Artikel Terbaru</h1>
        <p class="mt-3 text-lg text-gray-500">Wawasan terbaru seputar teknologi dan pengembangan web.</p>
      </div>

      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <article v-for="article in dummyArticles" :key="article.id"
          class="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div class="relative aspect-16/10 overflow-hidden rounded-t-2xl">
            <img :src="article.image" :alt="article.title"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div class="absolute top-4 left-4">
              <span
                class="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700 backdrop-blur-sm shadow-sm">
                {{ article.category }}
              </span>
            </div>
          </div>

          <div class="flex flex-1 flex-col p-5">
            <div class="flex items-center gap-2 mb-3 text-xs text-gray-400">
              <time>{{ article.date }}</time>
              <span>•</span>
              <span>{{ article.readTime }}</span>
            </div>

            <h3
              class="mb-2 text-lg font-bold leading-tight text-gray-900 group-hover:text-indigo-600 transition-colors">
              <a href="#">{{ article.title }}</a>
            </h3>

            <p class="mb-5 text-sm leading-relaxed text-gray-600 line-clamp-3">
              {{ article.excerpt }}
            </p>

            <div class="mt-auto flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div
                  class="h-7 w-7 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600">
                  {{article.author.split(' ').map(n => n[0]).join('')}}
                </div>
                <span class="text-xs font-medium text-gray-700">{{ article.author }}</span>
              </div>

              <button class="text-indigo-600 hover:text-indigo-800 transition-colors">
                <i class="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Class utility tambahan jika diperlukan, tapi Tailwind sudah mencakup hampir semuanya */
</style>
