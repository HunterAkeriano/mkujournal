import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import {
  useApi,
  RequestAccumulator,
  CookieItemType,
  ProfileInfoGet200Response,
  ProfileApi,
} from '@/shared'

import { AuthApi, useCookiesStorage } from '@/shared'

const USER_IS_NOT_LOGGED_IN_ERROR = new Error('user is not logged in')

export const useAuthStore = defineStore('auth', () => {
  const authApi = useApi(AuthApi)
  const profileApi = useApi(ProfileApi)
  const user = ref<ProfileInfoGet200Response | null>(null)

  const accessStorage = useCookiesStorage('access_token')
  const refreshStorage = useCookiesStorage('refresh_token')

  const { value: accessToken, setValue: setAccessToken } =
    getAuthInfo(accessStorage)
  const { value: refreshToken, setValue: setRefreshToken } =
    getAuthInfo(refreshStorage)

  const refreshTokensRequestAccumulator = new RequestAccumulator(
    async () =>
      await authApi.authRefreshTokenPost({
        authRefreshTokenPostRequest: { refreshToken: refreshToken.value || '' },
      })
  )

  function setTokens(accessToken?: string | null, refreshToken?: string | null) {
    setAccessToken(accessToken, 'regular')
    setRefreshToken(refreshToken, 'regular')
  }

  async function refreshTokens() {
    const refresh = refreshToken.value
    if (!refresh) {
      throw USER_IS_NOT_LOGGED_IN_ERROR
    }

    try {
      const { data } = await refreshTokensRequestAccumulator.request()

      setTokens(data?.accessToken, data?.refreshToken)
    } catch (e) {
      reset()
      throw e
    }
  }

  function reset() {
    setTokens(null, null)
  }

  function getProfile() {
    //todo: написать детейл профиля
  }

  return {
    accessToken,
    refreshTokens,
    profileApi,
    user,
    getProfile,
    setTokens
  }
})

function getAuthInfo(storage: ReturnType<typeof useCookiesStorage>) {
  const _token = ref(storage.getItem() || null)
  const tokenValueGetter = computed<string | null>(() => _token.value)

  const setTokenValue = (value?: string | null, type?: CookieItemType) => {
    storage.setItem(value, type)
    _token.value = value
  }

  return {
    value: tokenValueGetter,
    setValue: setTokenValue,
  }
}
