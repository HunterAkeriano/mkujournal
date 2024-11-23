import { computed, ref } from 'vue'
import { useCookiesStorage } from '@/molecules/utils/cookies.js'
import { defineStore } from 'pinia'
import { myProfile, signoutUser } from '@/atom/axios/login.js'

export const useAuthStore = defineStore('auth', () => {
  const accessStorage = useCookiesStorage('access_token')
  const refreshStorage = useCookiesStorage('refresh_token')
  const user = ref(null)
  const isSignoutLoading = ref(false)
  const signedIn = computed(() => !!user.value)

  const { value: accessToken, setValue: setAccessToken } =
    getAuthInfo(accessStorage)

  const { value: refreshToken, setValue: setRefreshToken } =
    getAuthInfo(refreshStorage)

  function setTokens(at, rt) {
    const type = 'regular'

    setAccessToken(at, type)
    setRefreshToken(rt, type)
  }

  function reset() {
    user.value = null
    setTokens(null, null, false)
  }

  async function fetchData() {
    try {
      user.value = await myProfile()
    } catch (error) {
      console.log(error)
    }
  }

  async function signout() {
    const refresh = refreshToken.value
    if (!refresh) {
      reset()
      throw 'Ви не авторизоні'
    }

    try {
      const result = await signoutUser()

      if (result) reset()
    } catch (e) {
      reset()
    }
  }

  return {
    setTokens,
    fetchData,
    user,
    isSignoutLoading,
    accessToken,
    refreshToken,
    reset,
    signedIn,
    signout,
  }
})

function getAuthInfo(storage) {
  const _token = ref(storage.getItem() || null)
  const tokenValueGetter = computed(() => _token.value)

  const setTokenValue = (value, type) => {
    storage.setItem(value, type)
    _token.value = value
  }

  return {
    value: tokenValueGetter,
    setValue: setTokenValue,
  }
}
