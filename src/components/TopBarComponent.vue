<script setup lang="ts">
import SearchInputComponent from './SearchInputComponent.vue'
import LogoDisplayComponent from './LogoDisplayComponent.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border">
    <div class="container-page">
      <div class="flex justify-between items-center h-16">
        <RouterLink to="/" class="flex items-center" aria-label="Ke beranda">
          <LogoDisplayComponent />
        </RouterLink>
        <div class="flex gap-4 items-center">
          <SearchInputComponent />
        </div>
      </div>
    </div>
  </header>
</template>
