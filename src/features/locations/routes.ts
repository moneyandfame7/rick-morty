import { RouteProps } from 'react-router-dom'
import { randomUUID } from 'crypto'

const MAIN_LOCATION_ROUTE: RouteProps = {
  id: randomUUID(),
  element: '',
  path: '/locations'
}
const SINGLE_LOCATION_ROUTE: RouteProps = {
  id: randomUUID(),
  element: '',
  path: '/locations/:id'
}
const CREATE_LOCATION_ROUTE: RouteProps = {
  id: randomUUID(),
  element: '',
  path: '/create-location'
}
export { MAIN_LOCATION_ROUTE, SINGLE_LOCATION_ROUTE, CREATE_LOCATION_ROUTE }
