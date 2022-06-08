<script setup lang="ts">
import { onMounted, ref } from 'vue'
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'
import { BASE_URL } from '@/const'

const feeds = ref<Array<any>>([])
const lastId = ref<number | any>(0)

const loadData = async ($state: any) => {
  try {
    const response = await fetch(`${BASE_URL}feed?limit=10&after=${lastId.value?.id}`)
    const json = await response.json()
    if (json.length < 10) { $state.complete() }
    else {
      feeds.value.push(...json?.data)
      $state.loaded()
    }
    lastId.value = feeds.value[feeds.value.length - 1]
    console.log(lastId.value)
  }
  catch (err) {
    $state.error()
  }
}
onMounted(() => {
  console.log(feeds.value)
  // loadData()
})
</script>

<template>
  <div class="inline-grid px-4 lg:px-0">
    <h1 class="mb-5 text-3xl text-elucidator-700 dark:text-dark-repulser-400 font-bold">
      Latest Article
    </h1>
    <Latest
      image="https://glitz.beautyinsider.sg/wp-content/uploads/2022/06/9EACFFE8-6E65-4990-822C-9C8B7195EF31.png"
      alt="blog-banner" date="bla"
      title="Father’s Day 2022 Celebrate dad with these 10 feasts in Singapore that are worthy of a king"
      description="lorem ipsum" to="#"
    />
  </div>
  <div class="flex-flex-col flex-wrap mb-2 mt-12 px-4 lg:px-0">
    <div class="grid inline-grid grid-cols-2 mb-5">
      <h1 class="text-3xl font-bold text-elucidator-700 dark:text-dark-repulser-400">
        All Articles
      </h1>
    </div>
    <div class="mx-auto inline-grid gap-4 mb-5 sm:grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-10">
      <Article
        v-for="(feed, i) in feeds"
        :key="i"
        :image="feed.img"
        :alt="`img-${feed.slug}`"
        :date="new Date(`${feed.createdAt}`).toDateString()"
        :title="feed.title"
        :read-count="feed.stats.totalRead"
        :like-count="feed.stats.totalLikes"
        :share-count="feed.stats.totalShare"
        :tags="feed.tags"
        :to="`${feed.slug}`"
      />
      <InfiniteLoading :comments="feeds" @infinite="loadData" />
    </div>
  </div>
</template>
