<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

defineProps<{
  links: NavigationMenuItem[]
}>()
</script>

<template>
  <div class="fixed border-b border-b-gray-100 text-gray-400 w-full flex z-100">
    <div class="flex m-auto">
      <div
        v-for="value in links"
        :key="value"
        class="px-8 p-4 border-l-gray-100 border-r-gray-100 border-l border-r
         hover:bg-green-100/50 hover:text-green-500 cursor-pointer"
      >
        {{ value.label }}
      </div>
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
