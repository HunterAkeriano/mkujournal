import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import DefaultLayout from '@/layuots/default-layout/DefaultLayout.vue'
import AuthLayout from '@/layuots/auth-layout/AuthLayout.vue'
import { useAuthStore } from '../store/auth-store'
import { MainPage } from '@/pages'
import AccountPage from '@/pages/account/AccountPage.vue'
import Login from '@/pages/auth/Login.vue'

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/admin',
    component: AuthLayout,
    children: [
      {
        path: '/login',
        name: 'login',
        component: Login,
      },
    ],
    meta: {
      isLogin: true,
    },
  },

  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '/',
        name: 'main',
        component: MainPage,
      },
      {
        path: '/account',
        name: 'account',
        component: AccountPage,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()

  await authStore.getProfile()

  if (to.meta.requiresAuth && !authStore.accessToken && !authStore.user) {
    return { name: 'login' }
  }

  if (to.meta.isLogin && authStore.accessToken && authStore.user) {
    return { name: 'main' }
  }

  return true
})

export default router
