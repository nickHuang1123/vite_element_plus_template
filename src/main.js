import { createApp } from 'vue'

import './assets/styles/main.scss'

import App from './App.vue'

import router from './router'
import '@/router/middleware'

import { createPinia } from 'pinia'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.mount('#app')
