import { CookieKey, cookies } from '@features/authorization/services'

export const useIsAuthenticated = () => {
  const token = cookies.get(CookieKey.ACCESS_TOKEN)
  return !!token
}
