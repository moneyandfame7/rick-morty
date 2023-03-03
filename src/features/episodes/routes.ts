import { RouteProps } from 'react-router-dom'
import { randomUUID } from 'crypto'

const MAIN_EPISODE_ROUTE: RouteProps = {
  id: randomUUID(),
  element: '',
  path: '/episodes'
}

const SINGLE_EPISODE_ROUTE: RouteProps = {
  id: randomUUID(),
  element: '',
  path: '/episodes/:id'
}

const CREATE_EPISODE_ROUTE: RouteProps = {
  id: randomUUID(),
  element: '',
  path: '/create-episode'
}

export { MAIN_EPISODE_ROUTE, SINGLE_EPISODE_ROUTE, CREATE_EPISODE_ROUTE }
