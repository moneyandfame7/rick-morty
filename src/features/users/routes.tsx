import React, { type RouteProps } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { AccountSettingsPage, ProfilePage } from 'features/users/pages'

const ACCOUNT_SETTINGS_ROUTE: RouteProps = {
  id: uuidv4(),
  element: <AccountSettingsPage />,
  path: '/settings/*'
}

const USER_PROFILE_ROUTE: RouteProps = {
  id: uuidv4(),
  element: <ProfilePage />,
  path: '/profile/:id'
}

export { ACCOUNT_SETTINGS_ROUTE, USER_PROFILE_ROUTE }
