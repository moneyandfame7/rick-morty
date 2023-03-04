import { RouteProps } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { HomePage } from 'shared/pages'

export const HOME_ROUTE: RouteProps = {
  index: true,
  id: uuidv4(),
  element: <HomePage />,
  path: '/'
}
