import Cookies, { type CookieAttributes } from 'js-cookie'

export const enum CookieKey {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN'
}
export const cookies = {
  get(key: CookieKey): string | undefined {
    return Cookies.get(key)
  },

  set(key: CookieKey, value: string, options: CookieAttributes): void {
    Cookies.set(key, value, options)
  },

  remove(key: CookieKey): void {
    Cookies.remove(key)
  }
}
