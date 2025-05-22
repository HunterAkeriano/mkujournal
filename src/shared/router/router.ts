import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { MainPage } from '@/pages'
import Login from '@/pages/auth/Login.vue'

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    name: 'home',
    component: MainPage,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
