import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../../views/HomeView.vue'
import UserProfile from '@/views/profile/UserProfile.vue'
import { useModalStorage } from '@/plugin/stores/modal-storage.js'
import ResetPassword from '@/views/ResetPassword.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: UserProfile,
    },
    {
      path: '/reset-password/:id',
      name: 'reset-password',
      meta: {
        nonAuthorizedOnly: true,
      },
      component: ResetPassword,
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/Test.vue'),
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    if (to.path === from.path) return
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach((to, from) => {
  if (to.path === from.path) return
  const modalStore = useModalStorage()
  modalStore.close()
})

export default router
