import {
  FORGOT_ROUTE,
  LOGIN_ROUTE,
  RESET_ROUTE,
  SIGNUP_ROUTE,
  SUCCESS_LOGIN_ROUTE
} from 'features/authorization/routes'

const authorizationRoutes: Array<string | undefined> = [
  SIGNUP_ROUTE.path,
  LOGIN_ROUTE.path,
  FORGOT_ROUTE.path,
  SUCCESS_LOGIN_ROUTE.path,
  RESET_ROUTE.path
]
export const getIsAuthorizationRoute = (pathname: string) => {
  return authorizationRoutes.includes(pathname)
}
