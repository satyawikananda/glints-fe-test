import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import { BASE_URL } from '@/const'
import router from '@/router'

export const useAuth = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user') as string))
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
    router.push('/')
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
    router.push('/')
  }
  return {
    login,
    logout,
    returnUrl,
    user,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot))
