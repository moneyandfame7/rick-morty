import { RouteProps } from 'react-router-dom'
import { randomUUID } from 'crypto'

const MAIN_CHARACTER_ROUTE: RouteProps = {
  id: randomUUID(),
  element: '',
  path: '/characters'
}

const SINGLE_CHARACTER_ROUTE: RouteProps = {
  id: randomUUID(),
  element: '',
  path: '/characters/:id'
}

const CREATE_CHARACTER_ROUTE: RouteProps = {
  id: randomUUID(),
  element: '',
  path: '/create-character'
}

export { MAIN_CHARACTER_ROUTE, SINGLE_CHARACTER_ROUTE, CREATE_CHARACTER_ROUTE }
