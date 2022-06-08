<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  image: string
  alt: string
  tags: Array<string>
  date: string
  title: string
  to: string
  readCount: number
  likeCount: number
  shareCount: number
}>()

// const tags = computed(() => {
//   const tagName: string[] = []
//   props.tags.map(tag => tagName.push(tag))

//   return tagName
// })

console.log(props.tags)
</script>

<template>
  <router-link :to="`/article/${to}`" class="max-w-lg rounded shadow-lg card-hover flex flex-col">
    <img :src="$props.image" class="h-xs object-cover w-full" :alt="$props.alt" loading="lazy">
    <div class="article-content flex content-between flex-1 flex-col dark:bg-elucidator-100 py-2 px-4">
      <div class="article-content-top flex-1">
        <span class="text-elucidator-700 mb-2 text-xs p-1 dark:text-elucidator-700">{{
          $props.date
        }}</span>
        <h1 class="text-xl text-elucidator-800 font-bold p-1 mb-1">
          {{ $props.title }}
        </h1>
      </div>
      <div class="article-content-bottom">
        <Tag :tags="$props.tags" class="mb-5 flex flex-wrap flex-row justify-start" />
      </div>
      <hr>
      <div class="flex flex-wrap justify-end mt-2">
        <div class="flex flex-row items-center flex-wrap">
          <ic-baseline-remove-red-eye class="text-elucidator-800 text-xs" />
          <span class="text-xs font-medium ml-2 text-elucidator-800">{{ $props.readCount }}</span>
        </div>
        <div class="flex flex-row items-center flex-wrap ml-2">
          <carbon-thumbs-up-filled class="text-elucidator-800 text-xs" />
          <span class="text-xs font-medium ml-2 text-elucidator-800">{{ $props.likeCount }}</span>
        </div>
        <div class="flex flex-row items-center flex-wrap ml-2">
          <ion-md-share class="text-elucidator-800 text-xs" />
          <span class="text-xs font-medium ml-2 text-elucidator-800">{{ $props.shareCount }}</span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<style lang="scss">
.card-hover {
    transition: all 0.3s ease;
    position: relative;
    top: 0;

    &:hover {
        top: -10px;
    }
}
</style>
