import './assets/scss/base.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { setLocale } from 'yup'

import App from './App.vue'
import router from './plugin/router'
import { validationPlugin } from '@/molecules/utils/validation.js'
import { filterBeforeCreate, toastPlugin } from '@/molecules/utils/toast.js'
import VueToastification from 'vue-toastification'
import { useAuthMiddleware } from '@/middleware/auth-middleware.js'

const app = createApp(App)

app.use(createPinia())
app.use(validationPlugin, { setLocale })
app.use(toastPlugin, {
  plugin: VueToastification,
  options: {
    filterBeforeCreate,
  },
})
app.use(router)

router.beforeEach(useAuthMiddleware())
app.mount('#app')
