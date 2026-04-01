<script setup lang="ts">
import SearchInputComponent from './SearchInputComponent.vue';
import LogoDisplayComponent from './LogoDisplayComponent.vue';
import AdDisplayComponent from './AdDisplayComponent.vue';
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="h-44 sticky z-100">
    <AdDisplayComponent />
  </div>
  <div class="lg:px-48! px-2 transition-all gap-2 sticky top-0 z-100 bg-white/50 backdrop-blur-sm">
    <div class="flex justify-between items-center h-16">
      <div>
        <RouterLink to="/" class="text-white">
          <LogoDisplayComponent />
        </RouterLink>
      </div>
      <div class="flex gap-4 items-center">
        <SearchInputComponent placeholder="Cari artikel...">
          <template #end-icon>
            <i class="bi bi-search"></i>
          </template>
        </SearchInputComponent>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
