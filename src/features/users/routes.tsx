import React, { RouteProps } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { UserAccountPage, UserProfilePage } from '@features/users/pages'

// TODO: зробити як на гітхаб по ?tab=favorites maybe
const USER_ACCOUNT_ROUTE: RouteProps = {
  id: uuidv4(),
  element: <UserAccountPage />,
  path: '/account'
}

const USER_PROFILE_ROUTE: RouteProps = {
  id: uuidv4(),
  element: <UserProfilePage />,
  path: '/profile/:id'
}

/*
const USER_FAVORITE_ROUTE: RouteProps = {
  id: uuidv4(),
  element: <UserFavoritePage />,
  path: 'profile/:id/favorites'
}
*/

export { USER_ACCOUNT_ROUTE, USER_PROFILE_ROUTE }
