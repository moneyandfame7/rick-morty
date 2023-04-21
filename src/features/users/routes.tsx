import React, { type RouteProps } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { UserAccountSettingsPage } from 'features/users/pages'
import { ProfilePage } from './pages/profile'

// TODO: зробити як на гітхаб по ?tab=favorites maybe
const ACCOUNT_SETTINGS_ROUTE: RouteProps = {
  id: uuidv4(),
  element: <UserAccountSettingsPage />,
  path: '/settings'
}

const USER_PROFILE_ROUTE: RouteProps = {
  id: uuidv4(),
  element: <ProfilePage />,
  path: '/profile/:id'
}

export { ACCOUNT_SETTINGS_ROUTE, USER_PROFILE_ROUTE }
