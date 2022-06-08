import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import { BASE_URL } from '@/const'
import router from '@/router'
import { useSnackbar } from '@/composables/useSnackbar'

export const useAuth = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user') as string))
  const isLoggedIn = ref<boolean>(false)
  let returnUrl: any

  const login = async (identifier: string, password: string) => {
    const userLogin = await fetch(`${BASE_URL}auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    })
    const response = await userLogin.json()
    user.value = response
    localStorage.setItem('user', JSON.stringify({ ...user.value, isLoggedIn: true }))
    isLoggedIn.value = true
    router.push('/')
    useSnackbar('Login successfully', {
      theme: 'light',
      position: 'center',
      timeout: 1000,
    })
  }

  const logout = async (refreshToken: string) => {
    await fetch(`${BASE_URL}auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken,
      }),
    })
    user.value = null
    localStorage.removeItem('user')
    isLoggedIn.value = false
    router.push('/')
    useSnackbar('Logout successfully', {
      theme: 'light',
      position: 'center',
      timeout: 1000,
    })
  }
  return {
    login,
    logout,
    returnUrl,
    isLoggedIn,
    user,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot))
