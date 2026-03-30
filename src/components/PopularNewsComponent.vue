<script lang="ts" setup>
import { ref } from 'vue';

const popularNews = ref([
  { id: '01', title: 'Langkah Strategis BI Menghadapi Volatilitas Pasar Global' },
  { id: '02', title: 'Review Laptop Terbaru 2026: Performa AI yang Menakjubkan' },
  { id: '03', title: '5 Destinasi Hidden Gem di Indonesia untuk Liburan' }
]);
</script>
<template>
  <div class="rounded-md bg-white outline-1 p-4">
    <div class="flex items-center gap-2 mb-4">
      <div class="w-1 h-6 bg-primary rounded-full"></div>
      <span class="text-lg font-black uppercase italic">Populer</span>
    </div>
    <div class="space-y-6">
      <div v-for="item in popularNews" :key="item.id" class="flex gap-4 group cursor-pointer">
        <span class="text-3xl font-black text-surface-200 group-hover:text-primary transition italic leading-none">{{
          item.id }}</span>
        <h4 class="text-sm font-bold leading-snug group-hover:underline">{{ item.title }}</h4>
      </div>
    </div>
  </div>
</template>
