import './assets/scss/base.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { setLocale } from 'yup'

import App from './App.vue'
import router from './plugin/router'
import { validationPlugin } from '@/molecules/utils/validation.js'

const app = createApp(App)

app.use(createPinia())
app.use(validationPlugin, { setLocale })
app.use(router)

app.mount('#app')
