import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/plugin/stores/auth-storage.js'

export function useAuthMiddleware() {
  const isInitialized = ref(false)

  const authMiddleware = async (to, from, next) => {
    const authStore = useAuthStore()
    const { isSignoutLoading } = storeToRefs(authStore)

    if (authStore.accessToken && !isInitialized.value) {
      try {
        await authStore.fetchData()
      } catch {
        await authStore.reset()
      }

      isInitialized.value = true
    }

    let nextParam

    const authorizedOnly = to.matched.some((record) => {
      return record.meta.authorizedOnly
    })
    if (authorizedOnly && !authStore.signedIn) {
      nextParam = `/?redirect=${encodeURI(to.fullPath)}`
    }

    if (from.path === nextParam) {
      return next(false)
    }

    if (nextParam !== undefined) {
      return next(nextParam)
    }

    return next()
  }

  return authMiddleware
}
