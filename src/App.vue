<script setup lang="ts">
import TopBarComponent from './components/TopBarComponent.vue';
import { RouterView } from 'vue-router';
import FooterComponent from './components/FooterComponent.vue';
</script>

<template>
  <TopBarComponent />
  <RouterView />
  <FooterComponent />
</template>

<style scoped></style>
