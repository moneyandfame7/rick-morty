import { RouteProps } from 'react-router-dom'
import { randomUUID } from 'crypto'

const USER_ACCOUNT_ROUTE: RouteProps = {
  id: randomUUID(),
  element: '',
  path: '/account'
}

const USER_PROFILE_ROUTE: RouteProps = {
  id: randomUUID(),
  element: '',
  path: '/profile/:id'
}

const USER_FAVORITE_ROUTE: RouteProps = {
  id: randomUUID(),
  element: '',
  path: 'profile/:id/favorites'
}

export { USER_ACCOUNT_ROUTE, USER_PROFILE_ROUTE, USER_FAVORITE_ROUTE }
