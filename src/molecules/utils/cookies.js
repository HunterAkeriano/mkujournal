import { useCookies } from '@vueuse/integrations'

export function useCookiesStorage(key) {
  const cookies = useCookies()

  const options = {
    path: '/',
    sameSite: 'lax',
  }

  function getItem() {
    return cookies.get(key)
  }

  function setItem(value, type = 'session') {
    if (value === null) {
      removeItem()
      return
    }

    const localOptions = { ...options }

    if (type === 'regular') {
      localOptions.maxAge = 2592000 // 30 days
    }

    cookies.set(key, value, localOptions)
  }

  function removeItem() {
    cookies.remove(key, options)
  }

  return { getItem, setItem, removeItem }
}
