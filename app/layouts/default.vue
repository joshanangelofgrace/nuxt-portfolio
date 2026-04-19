<script setup lang="ts">
</script>

<template>
  <div>
    <div class="bg-white dark:bg-gray-800">
      <AppHeader :links="navLinks" />
      <slot />
      <!-- <AppFooter /> -->
    </div>
  </div>
</template>
