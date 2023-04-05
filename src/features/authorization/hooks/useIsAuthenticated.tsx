import Cookies from 'js-cookie'
import { CookieKey } from 'shared/constants'

export const useIsAuthenticated = () => {
  const token = Cookies.get(CookieKey.ACCESS_TOKEN)
  return !!token
}
