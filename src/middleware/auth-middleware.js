import { ref } from 'vue'
import { useAuthStore } from '@/plugin/stores/auth-storage.js'
import { storeToRefs } from 'pinia'

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

    const nonAuthorizedOnly = to.matched.some(
      (record) => record.meta.nonAuthorizedOnly
    )
    if (nonAuthorizedOnly && authStore.signedIn && !isSignoutLoading.value) {
      nextParam = '/'
    }

    // if (from.path === nextParam) {
    //   return next(false)
    // }

    if (nextParam !== undefined) {
      return next(nextParam)
    }

    return next()
  }

  return authMiddleware
}
