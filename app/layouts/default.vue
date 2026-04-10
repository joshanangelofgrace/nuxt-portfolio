<script setup lang="ts">
</script>

<template>
  <div>
    <div class="">
      <AppHeader :links="navLinks" />
      <slot />
      <!-- <AppFooter /> -->
    </div>
  </div>
</template>
