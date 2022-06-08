import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'

import 'virtual:windi.css'
import '@/styles/styles.scss'
import nProgress from 'nprogress'
import App from './App.vue'
import router from './router'
// import { setup } from '@/services/setupInterceptor'

const app = createApp(App)
const head = createHead()

router.beforeEach(() => {
  nProgress.start()
})

router.afterEach(() => {
  nProgress.done()
})

app.use(createPinia())
// setup()
app.use(router)
app.use(head)

app.mount('#app')
