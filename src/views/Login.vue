<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/stores/auth'

const identifier = ref<string>()
const password = ref<string>()
const authStore = useAuth()

const onSubmit = async () => {
  try {
    const data = await authStore.login(identifier.value as string, password.value as string)
    return console.log(data)
  }
  catch (err) {
    return console.log(err)
  }
}
</script>

<template>
  <div class="flex flex-wrap justify-center">
    <div class="flex flex-wrap flex-col justify-center shadow rounded bg-dark-repulser-50 w-3/5">
      <h1 class="text-center text-dark-repulser-800">
        Login
      </h1>
      <form class="flex flex-wrap flex-col justify-center mx-auto p-2" @submit.prevent="onSubmit">
        <label for="username" class="mb-2">Username</label>
        <input v-model="identifier" class="rounded shadow mt-1 p-2" type="text" name="username">
        <label for="password" class="mb-2">Password</label>
        <input v-model="password" class="rounded shadow mt-1 p-2" type="password" name="password">
        <input class="mt-2 bg-elucidator-600 rounded shadow text-white p-2 cursor-pointer" type="submit" value="Login">
      </form>
    </div>
  </div>
</template>
