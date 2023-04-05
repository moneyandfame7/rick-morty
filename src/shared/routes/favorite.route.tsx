import { RouteProps } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { FavoritePage } from 'shared/pages'

export const FAVORITE_ROUTE: RouteProps = {
  id: uuidv4(),
  element: <FavoritePage />,
  path: '/favorites'
}
