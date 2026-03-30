<script lang="ts" setup>
import AdDisplayComponent from '@/components/AdDisplayComponent.vue';
import HeadlineNewsComponent from '@/components/HeadlineNewsComponent.vue';
import LatestNewsComponent from '@/components/LatestNewsComponent.vue';
import PopularNewsComponent from '@/components/PopularNewsComponent.vue';
import InstagramEmbedComponent from '@/components/InstagramEmbedComponent';
import ArticleGridByCategoryComponent from '@/components/ArticleGridByCategoryComponent.vue';
</script>

<template>
  <main class="gap-4 flex flex-col px-4 py-4 lg:px-48 transition-all">
    <div class="flex flex-col xl:flex-row gap-10">

      <section class="xl:w-2/3 w-full">
        <HeadlineNewsComponent />
        <LatestNewsComponent />
      </section>

      <aside class="xl:w-1/3 w-full">
        <div class="flex flex-col gap-2">

          <div class="w-full h-32">
            <AdDisplayComponent />
          </div>

          <PopularNewsComponent />

          <div class="w-full h-64">
            <AdDisplayComponent />
          </div>

          <div class="w-full h-108">
            <AdDisplayComponent />
          </div>

          <div class="flex h-122">
            <InstagramEmbedComponent class="flex-1" />
          </div>
        </div>
      </aside>

    </div>
    <div>
      <div class="w-full h-32">
        <AdDisplayComponent />
      </div>
    </div>
  </main>
  <div>
    <ArticleGridByCategoryComponent />
    <div class="w-full h-36 px-4 lg:px-48 py-4">
      <AdDisplayComponent />
    </div>
  </div>
</template>

<style scoped></style>
