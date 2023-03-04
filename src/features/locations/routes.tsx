import { RouteProps } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { MainLocationPage } from './pages/Main.page'
import { SingleLocationPage } from './pages/Single.page'
import { CreateLocationPage } from './pages/Create.page'

const MAIN_LOCATION_ROUTE: RouteProps = {
  id: uuidv4(),
  element: <MainLocationPage />,
  path: '/locations'
}
const SINGLE_LOCATION_ROUTE: RouteProps = {
  id: uuidv4(),
  element: <SingleLocationPage />,
  path: '/locations/:id'
}
const CREATE_LOCATION_ROUTE: RouteProps = {
  id: uuidv4(),
  element: <CreateLocationPage />,
  path: '/create-location'
}
export { MAIN_LOCATION_ROUTE, SINGLE_LOCATION_ROUTE, CREATE_LOCATION_ROUTE }
