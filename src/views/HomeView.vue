<script lang="ts" setup>
import AdDisplayComponent from '@/components/AdDisplayComponent.vue'
import HeadlineNewsComponent from '@/components/HeadlineNewsComponent.vue'
import LatestNewsComponent from '@/components/LatestNewsComponent.vue'
import PopularNewsComponent from '@/components/PopularNewsComponent.vue'
import InstagramEmbedComponent from '@/components/InstagramEmbedComponent.vue'
import ArticleGridByCategoryComponent from '@/components/ArticleGridByCategoryComponent.vue'
</script>

<template>
  <main class="bg-background">
    <!-- Hero Section -->
    <div class="container-page py-6">
      <div class="flex flex-col xl:flex-row gap-8">

        <section class="xl:w-2/3 w-full">
          <HeadlineNewsComponent />
          <LatestNewsComponent />
        </section>

        <aside class="xl:w-1/3 w-full">
          <div class="flex flex-col gap-4">
            <AdDisplayComponent size="banner" label="Iklan Header" />
            <PopularNewsComponent />
            <AdDisplayComponent size="sidebar" label="Iklan Sidebar" />
            <InstagramEmbedComponent />
          </div>
        </aside>

      </div>
    </div>

    <!-- Articles Grid -->
    <ArticleGridByCategoryComponent />

    <!-- Bottom Ad -->
    <div class="container-page py-6">
      <AdDisplayComponent size="leaderboard" label="Iklan Leaderboard" />
    </div>
  </main>
</template>
