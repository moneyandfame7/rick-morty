import React from 'react'
import { RouteProps } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { AdminPage } from 'shared/pages'

export const ADMIN_ROUTE: RouteProps = {
  id: uuidv4(),
  element: <AdminPage />,
  path: '/admin'
}
