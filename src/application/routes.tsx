import React from 'react'
import { Route, type RouteProps } from 'react-router-dom'

import {
  FORGOT_ROUTE,
  LOGIN_ROUTE,
  RESET_ROUTE,
  SIGNUP_ROUTE,
  SUCCESS_LOGIN_ROUTE,
  VERIFY_ROUTE
} from 'features/authorization/routes'
import { ACCOUNT_SETTINGS_ROUTE, USER_PROFILE_ROUTE } from 'features/users/routes'
import {
  CREATE_CHARACTER_ROUTE,
  FAVORITE_CHARACTER_ROUTE,
  MAIN_CHARACTER_ROUTE,
  SINGLE_CHARACTER_ROUTE
} from 'features/characters/routes'
import { CREATE_EPISODE_ROUTE, MAIN_EPISODE_ROUTE, SINGLE_EPISODE_ROUTE } from 'features/episodes/routes'
import { CREATE_LOCATION_ROUTE, MAIN_LOCATION_ROUTE, SINGLE_LOCATION_ROUTE } from 'features/locations/routes'
import { DASHBOARD_ROUTE, MANAGEMENT_ROUTE, STATISTICS_ROUTE } from 'features/admin/routes'

import { NOT_FOUND_ROUTE, HOME_ROUTE } from 'shared/routes'
import { ProtectedRoute } from 'features/authorization/components'
import { PrivilegedRoute } from 'shared/components'

export const PRIVILEGED_ROUTES: RouteProps[] = [
  CREATE_CHARACTER_ROUTE,
  CREATE_EPISODE_ROUTE,
  CREATE_LOCATION_ROUTE,

  /* Admin */
  DASHBOARD_ROUTE,
  MANAGEMENT_ROUTE,
  STATISTICS_ROUTE
]

export const PROTECTED_ROUTES: RouteProps[] = [
  /* Common */

  NOT_FOUND_ROUTE,
  VERIFY_ROUTE,

  /* Users */
  ACCOUNT_SETTINGS_ROUTE,
  USER_PROFILE_ROUTE,

  /* Characters */
  MAIN_CHARACTER_ROUTE,
  SINGLE_CHARACTER_ROUTE,
  FAVORITE_CHARACTER_ROUTE,

  /* Episodes */
  MAIN_EPISODE_ROUTE,
  SINGLE_EPISODE_ROUTE,
  CREATE_EPISODE_ROUTE,

  /* Locations */
  MAIN_LOCATION_ROUTE,
  SINGLE_LOCATION_ROUTE,
  CREATE_LOCATION_ROUTE
]

export const PUBLIC_ROUTES: RouteProps[] = [
  /* Authorization */
  SIGNUP_ROUTE,
  LOGIN_ROUTE,
  FORGOT_ROUTE,
  RESET_ROUTE,
  SUCCESS_LOGIN_ROUTE,

  /* Others */
  HOME_ROUTE
]

const getProtectedRoutes = () =>
  PROTECTED_ROUTES.map(route => (
    <Route
      index={route.index}
      path={route.path}
      key={route.id}
      element={<ProtectedRoute>{route.element}</ProtectedRoute>}
    />
  ))

const getPublicRoutes = () =>
  PUBLIC_ROUTES.map(route => <Route path={route.path} key={route.id} element={route.element} index={route.index} />)

const getPrivilegedRoutes = () =>
  PRIVILEGED_ROUTES.map(route => (
    <Route
      path={route.path}
      key={route.id}
      element={
        <ProtectedRoute>
          <PrivilegedRoute>{route.element}</PrivilegedRoute>
        </ProtectedRoute>
      }
    />
  ))

export { getPublicRoutes, getProtectedRoutes, getPrivilegedRoutes }
