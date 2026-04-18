<script setup lang="ts">
import ScrollBackground from '~/components/landing/ScrollBackground.vue';

const { data: page } = await useAsyncData('index', () => {
  return queryCollection('index').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

useSeoMeta({
  title: page.value?.seo.title || page.value?.title,
  ogTitle: page.value?.seo.title || page.value?.title,
  description: page.value?.seo.description || page.value?.description,
  ogDescription: page.value?.seo.description || page.value?.description
})
</script>

<template>
  <UPage v-if="page">
    <ClientOnly>
      <!-- <div class="absolute top-0 left-0 w-full h-full">
        <DotGrid
          :dot-size="4"
          :gap="28"
          base-color="#e2e8f0"
          active-color="#ffd6a8"
          :proximity="75"
          :speed-trigger="100"
          :shock-radius="250"
          :shock-strength="5"
          :max-speed="5000"
          :resistance="750"
          :return-duration="1.5"
          class-name="custom-dot-grid"
        />
      </div> -->
      <ScrollBackground />
    </ClientOnly>
    <LandingHero :page />
  </UPage>
</template>
