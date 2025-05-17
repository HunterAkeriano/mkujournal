import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { MainPage } from '@/pages'

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    name: 'home',
    component: MainPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
