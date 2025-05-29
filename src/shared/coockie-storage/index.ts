import { useCookies } from '@vueuse/integrations'
import type { CookieSetOptions } from 'universal-cookie'

export type CookieItemType = 'session' | 'regular'

export function useCookiesStorage(key: string) {
  const cookies = useCookies()

  const options: CookieSetOptions = {
    path: '/',
    sameSite: 'lax',
  }

  function getItem() {
    return cookies.get(key)
  }

  function setItem(value?: string | null, type: CookieItemType = 'session') {
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
