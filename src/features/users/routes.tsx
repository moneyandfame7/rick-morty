import React, { RouteProps } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { UserAccountSettingsPage, UserProfilePage } from 'features/users/pages'

// TODO: зробити як на гітхаб по ?tab=favorites maybe
const USER_ACCOUNT_SETTINGS_ROUTE: RouteProps = {
  id: uuidv4(),
  element: <UserAccountSettingsPage />,
  path: '/settings'
}

const USER_PROFILE_ROUTE: RouteProps = {
  id: uuidv4(),
  element: <UserProfilePage />,
  path: '/profile/:id'
}

export { USER_ACCOUNT_SETTINGS_ROUTE, USER_PROFILE_ROUTE }
