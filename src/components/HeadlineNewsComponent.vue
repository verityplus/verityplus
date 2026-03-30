<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';

const newsItems = ref([
  {
    id: 1,
    title: "Teknologi AI Terbaru di 2026",
    summary: "Perkembangan model bahasa besar kini semakin mendekati kecerdasan manusia dengan efisiensi energi yang luar biasa.",
    image: "https://picsum.photos/800/400?random=1",
    tag: "Tech",
    url: "/news/1"
  },
  {
    id: 2,
    title: "Eksplorasi Ruang Angkasa Meningkat",
    summary: "Misi terbaru ke Mars dijadwalkan akan meluncur pada akhir kuartal ini untuk mencari tanda kehidupan purba.",
    image: "https://picsum.photos/800/400?random=2",
    tag: "Science",
    url: "/news/2"
  },
  {
    id: 3,
    title: "Tren Gaya Hidup Berkelanjutan",
    summary: "Masyarakat mulai beralih ke produk ramah lingkungan secara masif untuk mengurangi jejak karbon global.",
    image: "https://picsum.photos/800/400?random=3",
    tag: "Lifestyle",
    url: "/news/3"
  }
]);

const currentIndex = ref(0);
let timer: ReturnType<typeof setInterval> | null = null;

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % newsItems.value.length;
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + newsItems.value.length) % newsItems.value.length;
};

const goToSlide = (index: number) => {
  currentIndex.value = index;
};

const startAutoplay = () => {
  timer = setInterval(nextSlide, 5000);
};

const stopAutoplay = () => {
  if (timer) clearInterval(timer);
};

onMounted(() => startAutoplay());
onUnmounted(() => stopAutoplay());
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <div class="flex flex-col" @mouseenter="stopAutoplay" @mouseleave="startAutoplay">

      <div class="relative group">

        <div class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
            <div v-for="item in newsItems" :key="item.id" class="w-full flex-shrink-0 relative h-[400px] md:h-[450px]">
              <a :href="item.url"
                class="block w-full h-full relative overflow-hidden focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/50 focus-visible:ring-inset">
                <img :src="item.image" :alt="item.title" class="object-cover w-full h-full" />

                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>

                <div class="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <span class="inline-block px-3 py-1 mb-3 text-xs font-semibold text-blue-700 bg-blue-100 rounded-md">
                    {{ item.tag }}
                  </span>
                  <h2 class="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                    {{ item.title }}
                  </h2>
                  <p class="text-slate-300 line-clamp-2 md:w-3/4">
                    {{ item.summary }}
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <button @click="prevSlide"
          class="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-full shadow-md border border-slate-200 transition-colors duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500/80 cursor-pointer"
          aria-label="Previous">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
            class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <button @click="nextSlide"
          class="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-full shadow-md border border-slate-200 transition-colors duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500/80 cursor-pointer"
          aria-label="Next">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
            class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

      </div>

      <ul class="flex justify-center items-center gap-2 m-0 p-0 list-none">
        <li v-for="(item, index) in newsItems" :key="'indicator-' + item.id">
          <button @click="goToSlide(index)" :class="[
            'w-8 h-1 rounded-md transition-colors duration-200 border-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/80 focus:ring-offset-2',
            currentIndex === index ? 'bg-blue-600' : 'bg-slate-200 hover:bg-slate-300'
          ]" :aria-label="`Slide ${index + 1}`" :aria-current="currentIndex === index"></button>
        </li>
      </ul>

    </div>
  </div>
</template>
