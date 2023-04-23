import React from 'react'
import type { RouteProps } from 'react-router-dom'
import { NotFoundPage } from 'shared/pages'
import { v4 as uuidv4 } from 'uuid'

export const NOT_FOUND_ROUTE: RouteProps = {
  id: uuidv4(),
  element: <NotFoundPage />,
  path: '*'
}
