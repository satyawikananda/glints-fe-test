<script setup lang="ts">
import { onClickOutside, onKeyStroke, useToggle } from '@vueuse/core'
import { ref } from 'vue'
import { useAuth } from '@/stores/auth'

// https://vueuse.org/shared/useToggle/
const [search, setSearch] = useToggle()
const [open, setOpen] = useToggle()

// https://vueuse.org/core/onKeyStroke/
onKeyStroke('Escape', () => {
  open.value = false
})

const navbottom = ref(null)
onClickOutside(navbottom, (e) => {
  open.value = false
})

const getLocalStorage = localStorage.getItem('user')
const dataLocalStorage = ref(JSON.parse(getLocalStorage as string))
const authStore = useAuth()

const onLogout = async () => {
  try {
    const data = await authStore.logout(dataLocalStorage.value?.refreshToken)
    console.log(data)
  }
  catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <nav
    class="z-10 text-elucidator-700 dark:text-dark-repulser-400 relative h-20 px-4" role="navigation"
    aria-label="navbar"
  >
    <div class="max-w-screen-lg mx-auto h-full flex flex-row items-center space-x-4">
      <div class="logo flex-1">
        <router-link to="/" class="font-bold lg:tracking-wide text-2xl">
          Glints Test
        </router-link>
      </div>
      <div class="flex flex-wrap items-center">
        <router-link
          class="mr-5 py-1.5 px-3 rounded-md text-elucidator-700 dark:text-dark-repulser-400 dark:hover:text-elucidator-300 hover:text-gray-900 hidden lg:block"
          to="/" active-class="bg-gray-200 dark:bg-gray-500 dark:text-dark-repulser-200"
        >
          Home
        </router-link>
        <div
          v-if="authStore.isLoggedIn"
          class="mr-5 py-1.5 px-3 rounded-md text-elucidator-700 dark:text-dark-repulser-400 dark:hover:text-elucidator-300 hover:text-gray-900 hidden lg:block cursor-pointer" @click="onLogout"
        >
          Logout
        </div>
        <router-link
          v-else
          class="mr-5 py-1.5 px-3 rounded-md text-elucidator-700 dark:text-dark-repulser-400 dark:hover:text-elucidator-300 hover:text-gray-900 hidden lg:block"
          to="/login" active-class="bg-gray-200 dark:bg-gray-500 dark:text-dark-repulser-200"
        >
          Login
        </router-link>
        <carbon-menu
          class="cursor-pointer text-elucidator-700 dark:text-dark-repulser-400 ml-5 sm:block lg:hidden"
          tabindex="0" @click="setOpen"
        />
      </div>
    </div>
  </nav>

  <!-- Nav bottom -->
  <nav
    v-if="open" ref="navbottom"
    class="py-4 px-8 bg-elucidator-100 dark:bg-elucidator-600 fixed bottom-0 z-99 inset-x-0 rounded-t-lg shadow-lg overflow-x-hidden overflow-y-hidden lg:hidden"
    :class="open ? 'block translate-y-0' : 'hidden translate-y-full'"
  >
    <ul class="flex flex-col">
      <router-link to="/" class="bg-elucidator-50 dark:bg-elucidator-500 p-2 mb-2 rounded-md">
        <li class="flex flex-row flex-wrap items-center dark:text-elucidator-100">
          <carbon-home class="mr-2" />Home
        </li>
      </router-link>
      <router-link to="/login" class="bg-elucidator-50 dark:bg-elucidator-500 p-2 mb-2 rounded-md">
        <li class="flex flex-row flex-wrap items-center dark:text-elucidator-100">
          <carbon-table-of-contents class="mr-2" />Login
        </li>
      </router-link>
    </ul>
  </nav>
</template>

<style lang="scss">
.active-class {
    @apply p-2 mb-2 rounded-md bg-elucidator-200 dark: bg-elucidator-700;
}
</style>
