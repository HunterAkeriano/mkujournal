import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/shared/router/router'
import { usePluginOptionsStorage } from '@/shared/store/plugin-store'
import { useApiOptions } from '@/shared/plugins/api/gen/ApiOptions'

const app = createApp(App)
const store = createPinia()

app.use(router)
app.use(store)

const optionsStorage = usePluginOptionsStorage()
optionsStorage.setApiOptionsGetter(useApiOptions)

app.mount('#app')
