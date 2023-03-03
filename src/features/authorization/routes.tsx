import { RouteProps } from 'react-router-dom'
import { randomUUID } from 'crypto'

const SIGNUP_ROUTE: RouteProps = {
  id: randomUUID(),
  element: '',
  path: '/signup'
}

const LOGIN_ROUTE: RouteProps = {
  id: randomUUID(),
  element: '',
  path: '/login'
}

const WELCOME_ROUTE: RouteProps = {
  id: randomUUID(),
  element: '',
  path: '/welcome'
}

export { SIGNUP_ROUTE, LOGIN_ROUTE, WELCOME_ROUTE }
