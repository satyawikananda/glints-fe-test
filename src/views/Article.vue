<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { BASE_URL } from '@/const'

const route = useRoute()
const slug = route.params?.slug

const detail = ref()
const content = ref()

const loadArticle = async () => {
  try {
    const response = await fetch(`${BASE_URL}posts/${slug}`)
    const data = await response.json()
    detail.value = data
    console.log(detail.value)
  }
  catch (e) {
    console.log(e)
  }
}

const loadContent = async () => {
  try {
    const response = await fetch(`${BASE_URL}posts/${slug}/content`)
    const data = await response.json()
    content.value = data
    console.log(content.value)
  }
  catch (e) {
    console.log(e)
  }
}

onMounted(() => {
  loadArticle()
  loadContent()
})
</script>

<template>
  <div class="py-5 px-4">
    <h1
      class="mb-5 text-transparent bg-clip-text bg-gradient-to-r text-center font-bold text-5xl from-elucidator-500 to-elucidator-700 dark:from-dark-repulser-500 dark:to-dark-repulser-300 md:block"
    >
      {{ detail?.title }}
    </h1>
    <p class="text-center font-normal mb-5 text-dark-100 dark:text-elucidator-50" v-html="content?.excerpt" />
    <div class="flex flex-row flex-wrap justify-center">
      <carbon-calendar class="mr-1 mt-2px dark:text-elucidator-50" />
      <p class="text-center text-dark-100 font-light mb-5 dark:text-elucidator-50">
        {{ new Date(detail?.createdAt).toDateString() }}
      </p>
    </div>
    <div class="flex flex-wrap justify-center mb-3">
      <div class="flex flex-row items-center flex-wrap">
        <ic-baseline-remove-red-eye class="text-dark-100 dark:text-elucidator-50 text-xs" />
        <span class="text-xs font-medium ml-2 text-dark-100 dark:text-elucidator-50">{{ detail?.stats.totalRead
        }}</span>
      </div>
      <div class="flex flex-row items-center flex-wrap ml-2">
        <carbon-thumbs-up-filled class="text-dark-100 dark:text-elucidator-50 text-xs" />
        <span class="text-xs font-medium ml-2 text-dark-100 dark:text-elucidator-50">{{ detail?.stats.totalLikes
        }}</span>
      </div>
      <div class="flex flex-row items-center flex-wrap ml-2">
        <ion-md-share class="text-dark-100 dark:text-elucidator-50 text-xs" />
        <span class="text-xs font-medium ml-2 text-dark-100 dark:text-elucidator-50">{{ detail?.stats.totalShare
        }}</span>
      </div>
    </div>
    <!-- <Tag :tags="frontmatter.tags" class="mb-5 flex flex-row justify-center" /> -->
    <img
      :src="detail?.img"
      alt="thumbnail-dsds" class="w-full h-md object-cover rounded-md shadow-lg" loading="lazy"
    >
    <div
      class="mt-5 mb-5 text-elucidator-500 dark:text-elucidator-50 article-content"
      style="border-bottom: 1px solid #63c0b6"
      v-html="content?.body"
    />
  </div>
</template>
