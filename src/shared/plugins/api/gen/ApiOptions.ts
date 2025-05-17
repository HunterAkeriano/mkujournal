import { ApiOptions } from '@/shared/plugins/api'
import { useAuthStore } from '@/shared/store/auth-store'

export function useApiOptions(): ApiOptions {
  const authStore = useAuthStore()

  return {
    apiBaseUrl: 'https://www.mku-journal.online',
    getAccessToken: () => authStore.accessToken || '',
    refreshTokens: () => authStore.refreshTokens(),
    handleReload: () => window.location.reload(),
  }
}
