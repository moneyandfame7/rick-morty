import React from 'react'
import { type RouteProps } from 'react-router-dom'
import { HomePage } from 'shared/pages'
import { v4 as uuidv4 } from 'uuid'

export const HOME_ROUTE: RouteProps = {
  id: uuidv4(),
  index: true,
  element: <HomePage />,
  path: '/'
}
