<script setup lang="ts">
import { capitalizeStr } from '@/utils'

const props = defineProps<{
  tags: Array<string | any>
  name: string
}>()
</script>

<template>
  <div>
    <div
      v-for="(tag, i) in tags"
      :key="i"
      class="text-elucidator-400 p-1 text-xs bg-elucidator-500 dark:bg-elucidator-700 rounded-xl m-1"
    >
      <span class="p-2 text-white dark:text-elucidator-50">{{ capitalizeStr(tag.name) }}</span>
    </div>
  </div>
</template>

<style lang="scss">
.card-hover {
  transition: all 0.3s ease;
  position: relative;
  top: 0;

  &:hover {
    top: -5px;
  }
}
</style>
