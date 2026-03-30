<template>
  <article class="bg-white min-h-screen font-sans transition-all duration-300">
    <div class="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50">
      <div class="h-full bg-blue-600 transition-all duration-150" :style="{ width: readingProgress + '%' }"></div>
    </div>

    <div class="fixed bottom-8 right-8 flex flex-col gap-3 z-40">
      <button @click="toggleSpeech" :class="isSpeaking ? 'bg-red-500 shadow-red-200' : 'bg-blue-600 shadow-blue-200'"
        class="w-14 h-14 rounded-full text-white shadow-xl flex items-center justify-center hover:scale-110 transition group"
        title="Baca Artikel">
        <svg v-if="!isSpeaking" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
        <svg v-else class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
        </svg>
      </button>

      <div class="bg-white border border-gray-200 rounded-full shadow-xl p-2 flex flex-col gap-2">
        <button @click="fontSize += 2"
          class="w-10 h-10 rounded-full hover:bg-gray-100 font-bold text-gray-700 text-lg">A+</button>
        <button @click="fontSize -= 2"
          class="w-10 h-10 rounded-full hover:bg-gray-100 font-bold text-gray-700 text-sm">A-</button>
      </div>
    </div>

    <div class="max-w-360 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col xl:flex-row gap-8 pt-16 pb-24">

      <aside class="w-full xl:w-75 shrink-0 order-1 xl:order-1">
        <div
          class="sticky top-20 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl h-40 xl:h-[600px] flex items-center justify-center text-gray-400 font-bold tracking-widest uppercase text-sm shadow-inner transition-all">
          Space Iklan Kiri / Atas
        </div>
      </aside>

      <main class="flex-1 w-full max-w-5xl mx-auto order-2 xl:order-2">

        <header class="pb-10 mb-10 border-b border-gray-100">
          <div class="max-w-3xl mx-auto text-center">
            <div class="flex items-center justify-center gap-3 mb-6">
              <span
                class="px-4 py-1 bg-blue-100 text-blue-700 text-sm font-bold rounded-full uppercase tracking-widest">
                {{ articleMeta.category }}
              </span>
              <span class="text-gray-400 text-sm">{{ articleMeta.readTime }} menit baca</span>
            </div>

            <h1 class="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-8">
              {{ articleMeta.title }}
            </h1>

            <div class="flex items-center justify-center gap-4 pt-4 max-w-sm mx-auto">
              <img :src="articleMeta.author.avatar" alt="Author"
                class="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
              <div class="text-left">
                <p class="text-gray-900 font-bold leading-none mb-1">{{ articleMeta.author.name }}</p>
                <p class="text-gray-500 text-sm">{{ articleMeta.date }}</p>
              </div>
            </div>
          </div>
        </header>

        <div class="mb-12">
          <div class="aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-gray-200">
            <img :src="articleMeta.coverImage" :alt="articleMeta.title" class="w-full h-full object-cover" />
          </div>
          <p class="text-center text-sm text-gray-400 mt-4 italic">{{ articleMeta.imageCaption }}</p>
        </div>

        <div class="max-w-3xl mx-auto relative">
          <div id="markdown-content"
            class="markdown-body prose prose-blue max-w-none text-gray-800 transition-all duration-200"
            :style="{ fontSize: fontSize + 'px' }" v-html="outputHtml"></div>

          <div class="mt-16 pt-8 border-t border-gray-100">
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in articleMeta.tags" :key="tag"
                class="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-lg hover:bg-gray-200 cursor-pointer transition">
                #{{ tag }}
              </span>
            </div>
          </div>
        </div>

      </main>

      <aside class="w-full xl:w-[300px] shrink-0 order-3 xl:order-3">
        <div
          class="sticky top-20 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl h-40 xl:h-[600px] flex items-center justify-center text-gray-400 font-bold tracking-widest uppercase text-sm shadow-inner transition-all">
          Space Iklan Kanan / Bawah
        </div>
      </aside>

    </div>
  </article>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { marked } from 'marked';

// --- VARIABEL DATA (.md string & Metadata) ---
const articleMeta = ref({
  title: 'Evolusi Desain Web: Dari Tabel Hingga AI-Driven UI',
  category: 'Desain',
  readTime: 10,
  date: '15 April 2026',
  coverImage: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80',
  imageCaption: 'Ilustrasi proses desain interface modern.',
  tags: ['WebDesign', 'UIUX', 'History', 'TechTrends'],
  author: {
    name: 'Rina Wijaya',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80'
  }
});

// Konten Markdown Mentah
const markdownSource = ref(`
Selamat datang di perjalanan waktu dunia desain web. Dalam dua dekade terakhir, kita telah melihat transformasi luar biasa dari halaman statis berbasis tabel hingga interface dinamis yang ditenagai oleh kecerdasan buatan.

### Era Awal: HTML Tabel (1995-2000)
Pada awalnya, tata letak web sangat kaku. Desainer menggunakan tag \`<table>\` untuk memaksa elemen berada di posisi tertentu. Sangat tidak responsif, namun itulah standar pada masanya.

> "Web adalah kanvas kosong, dan tabel adalah grid pertama kami."

### Revolusi CSS (2000-2010)
Munculnya **CSS** mengubah segalanya. Pemisahan konten (HTML) dan presentasi (CSS) memungkinkan fleksibilitas yang belum pernah ada sebelumnya. Kita mulai mengenal tata letak berbasis *float* dan *positioning*.

### Era Modern: Flexbox, Grid, & AI (Sekarang-2026)
Hari ini, kita memiliki alat canggih seperti CSS Grid dan Flexbox. Namun, inovasi terbesar adalah penggunaan **AI** untuk menghasilkan komponen UI secara otomatis berdasarkan *prompt* pengguna, dan mengoptimalkan pengalaman pengguna secara real-time.

---
Evolusi ini membuktikan bahwa adaptasi adalah kunci utama dalam dunia teknologi.
`);

// --- LOGIKA MARKDOWN ---
const outputHtml = computed(() => {
  return marked.parse(markdownSource.value);
});

// --- LOGIKA TEXT ZOOM ---
const fontSize = ref(18);

// --- LOGIKA SPEECH SYNTHESIS ---
const isSpeaking = ref(false);
const toggleSpeech = () => {
  if (isSpeaking.value) {
    window.speechSynthesis.cancel();
    isSpeaking.value = false;
    return;
  }

  const rawText = document.getElementById('markdown-content')!.innerText;
  const fullText = `${articleMeta.value.title}. ${rawText}`;
  const utterance = new SpeechSynthesisUtterance(fullText);
  utterance.lang = 'id-ID';

  utterance.onend = () => isSpeaking.value = false;

  window.speechSynthesis.speak(utterance);
  isSpeaking.value = true;
};

// --- LOGIKA SCROLL PROGRESS ---
const readingProgress = ref(0);
const handleScroll = () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  readingProgress.value = total ? (window.scrollY / total) * 100 : 0;
};

onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.speechSynthesis.cancel();
});
</script>

<style scoped>
@reference "tailwindcss";

.markdown-body :deep(h1) {
  @apply text-4xl font-extrabold text-gray-900 mb-8 border-b pb-4;
}

.markdown-body :deep(h2) {
  @apply text-2xl font-bold text-gray-800 mt-10 mb-4;
}

.markdown-body :deep(h3) {
  @apply text-xl font-bold text-gray-800 mt-8 mb-3;
}

.markdown-body :deep(p) {
  @apply mb-6 leading-relaxed;
}

.markdown-body :deep(ul) {
  @apply list-disc pl-6 mb-6 space-y-2;
}

.markdown-body :deep(ol) {
  @apply list-decimal pl-6 mb-6 space-y-2;
}

.markdown-body :deep(blockquote) {
  @apply border-l-4 border-blue-600 pl-6 italic text-gray-600 my-8 bg-gray-50 p-4 rounded-r-lg;
}

.markdown-body :deep(strong) {
  @apply font-bold text-blue-600;
}

.markdown-body :deep(code) {
  @apply bg-gray-100 text-red-600 px-2 py-0.5 rounded text-sm font-mono;
}

.markdown-body :deep(hr) {
  @apply border-gray-100 my-10;
}
</style>
