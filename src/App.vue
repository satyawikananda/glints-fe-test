<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useHead } from '@vueuse/head'

useHead({
  title: 'Glints Test Frontend',
})
</script>

<template>
  <div class="min-h-100vh overflow-hidden block relative pb-30 mx-auto flex flex-col">
    <Navbar />
    <main class="mx-auto mt-4 min-h-prose w-full lg:max-w-screen-lg">
      <router-view :key="$route.path" />
      <ToTopBtn />
    </main>
    <Footer />
  </div>
</template>
