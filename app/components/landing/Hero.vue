<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'
import ShinyText from '../ShinyText.vue'

const { footer, global } = useAppConfig()

const startTitleAnimation = ref(false)

onMounted(() => {
  setTimeout(() => startTitleAnimation.value = true, 2000)
})

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <div class="flex h-[calc(100vh)] w-full items-center">
    <div class="flex-1 flex flex-col gap-1 ml-2 sm:ml-6 md:ml-24">
      <!-- title -->
      <Motion
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6,
          delay: 0.1
        }"
      >
        <div class="flex text-2xl lg:text-4xl">
          Meet
        </div>
      </Motion>
      <!-- header -->
      <Motion
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6,
          delay: 0.2
        }"
      >
        <div class="text-shadow-md max-w-xl text-4xl lg:text-6xl">
          <ClientOnly>
            <ShinyText
              :text="page.title"
              :speed="4"
              :delay="1"
              :disabled="!startTitleAnimation"
              :color="'#000'"
              :shine-color="'#efefef'"
              :spread="100"
              :direction="'left'"
              :yoyo="true"
              :pause-on-hover="false"
            />
          </ClientOnly>
        </div>
      </Motion>
      <!-- description -->
      <Motion
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6,
          delay: 0.3
        }"
      >
        <div class="text-xs lg:text-base">
          {{ page.description }}
        </div>
      </Motion>
      <!-- links -->
      <Motion
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6,
          delay: 0.5
        }"
      >
        <div
          v-if="page.hero.links"
          class="flex"
        >
          <UButton
            :color="global.available ? 'success' : 'error'"
            variant="ghost"
            class="gap-2"
            :to="global.available ? global.meetingLink : ''"
            :label="global.available ? 'Available for new projects' : 'Not available at the moment'"
          >
            <template #leading>
              <span class="relative flex size-2">
                <span
                  class="absolute inline-flex size-full rounded-full opacity-75"
                  :class="global.available ? 'bg-success animate-ping' : 'bg-error'"
                />
                <span
                  class="relative inline-flex size-2 scale-90 rounded-full"
                  :class="global.available ? 'bg-success' : 'bg-error'"
                />
              </span>
            </template>
          </UButton>
        </div>
      </Motion>

      <div class="gap-4 flex mt-4">
        <Motion
          :initial="{
            scale: 1.1,
            opacity: 0,
            filter: 'blur(20px)'
          }"
          :animate="{
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)'
          }"
          :transition="{
            duration: 0.6,
            delay: 0.6
          }"
        >
          <UButton
            :color="'neutral'"
            variant="outline"
            class="gap-2"
            :to="global.available ? global.meetingLink : ''"
            label="Book an IT Support Session"
          />
          <StarBorder
            as="div"
            color="black"
            :speed="'6s'"
            :thickness="1"
          >
            Star Border
          </StarBorder>
        </Motion>
        <!-- <Motion
          :initial="{
            scale: 1.1,
            opacity: 0,
            filter: 'blur(20px)'
          }"
          :animate="{
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)'
          }"
          :transition="{
            duration: 0.6,
            delay: 0.6
          }"
        >
          <UButton
            :color="'neutral'"
            variant="outline"
            class="gap-2"
            :to="global.available ? global.meetingLink : ''"
            label="Discuss something else..."
          />
        </Motion> -->
      </div>

      <div class="gap-x-4 inline-flex mt-4">
        <Motion
          v-for="(link, index) of footer?.links"
          :key="index"

          :initial="{
            scale: 1.1,
            opacity: 0,
            filter: 'blur(20px)'
          }"
          :animate="{
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)'
          }"
          :transition="{
            duration: 0.6,
            delay: 0.5 + index * 0.1
          }"
        >
          <UButton
            v-bind="{ size: 'md', color: 'neutral', variant: 'ghost', ...link }"
          />
        </Motion>
      </div>
    </div>
    <div class="flex-1 flex">
      <div class="absolute top-0 right-0 w-auto">
        <Motion
          :initial="{
            scale: 1.1,
            opacity: 0,
            filter: 'blur(20px)'
          }"
          :animate="{
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)'
          }"
          :transition="{
            duration: 0.6,
            delay: 0.1
          }"
        >
          <NuxtImg
            class="w-auto h-[calc(100vh)] object-cover"
            src="/FLW_5740-1.webp"
          />
        </Motion>
      </div>
    </div>
  </div>
</template>
