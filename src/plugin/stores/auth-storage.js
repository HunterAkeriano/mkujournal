import { computed, ref } from 'vue'
import { useCookiesStorage } from '@/molecules/utils/cookies.js'
import { defineStore } from 'pinia'
import { myProfile, signoutUser } from '@/atom/axios/login.js'

export const useAuthStore = defineStore('auth', () => {
  const accessStorage = useCookiesStorage('access_token')
  const refreshStorage = useCookiesStorage('refresh_token')
  const rememberMeStorage = useCookiesStorage('remember_me')
  const user = ref(null)
  const isSignoutLoading = ref(false)
  const signedIn = computed(() => !!user.value)

  const { value: accessToken, setValue: setAccessToken } =
    getAuthInfo(accessStorage)

  const { value: refreshToken, setValue: setRefreshToken } =
    getAuthInfo(refreshStorage)

  const { value: rememberMe, setValue: setRememberMe } =
    getRememberMeInfo(rememberMeStorage)

  function setTokens(at, rt, rm) {
    const remember = rm !== undefined ? rm : rememberMe.value
    const type = remember ? 'regular' : 'session'

    setAccessToken(at, type)
    setRefreshToken(rt, type)
    setRememberMe(remember, type)
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

function getRememberMeInfo(storage) {
  const _rememberMeValue = ref(storage.getItem() || null)
  const rememberMeValueGetter = computed(() => _rememberMeValue.value)

  const setRememberMeValue = (value, type) => {
    storage.setItem(value ? 'true' : null, type)
    _rememberMeValue.value = value || false
  }

  return {
    value: rememberMeValueGetter,
    setValue: setRememberMeValue,
  }
}
