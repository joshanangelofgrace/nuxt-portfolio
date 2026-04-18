<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

defineProps<{
  links: NavigationMenuItem[]
}>()
</script>

<template>
  <div class="fixed border-b border-b-gray-100 bg-white/90 text-gray-400 w-full flex z-100">
    <div class="flex m-auto">
      <a
        v-for="value in links"
        :key="value"
        :href="value.to"
        class="px-8 p-4 border-l-gray-100 border-r-gray-100 border-l border-r cursor-pointer"
        :class="['hover:text-' + value.colour, 'hover:bg-' + value.colour +'/10 ']"
      >
        {{ value.label }}
      </a>
    </div>
    <!-- <UNavigationMenu
      :items="links"
      variant="pill"
      :orientation="'horizontal'"
      color="neutral"
      class="m-auto"
      :ui="{
        link: 'px-2 py-1',
        linkLeadingIcon: 'hidden'
      }"
    >
    </UNavigationMenu> -->
  </div>
</template>
