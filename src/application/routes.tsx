import { RouteProps } from 'react-router-dom'

import {
  FORGOT_ROUTE,
  LOGIN_ROUTE,
  RESET_ROUTE,
  SIGNUP_ROUTE,
  SUCCESS_LOGIN_ROUTE
} from 'features/authorization/routes'
import { USER_ACCOUNT_ROUTE, USER_PROFILE_ROUTE } from 'features/users/routes'
import { CREATE_CHARACTER_ROUTE, MAIN_CHARACTER_ROUTE, SINGLE_CHARACTER_ROUTE } from 'features/characters/routes'
import { CREATE_EPISODE_ROUTE, MAIN_EPISODE_ROUTE, SINGLE_EPISODE_ROUTE } from 'features/episodes/routes'
import { CREATE_LOCATION_ROUTE, MAIN_LOCATION_ROUTE, SINGLE_LOCATION_ROUTE } from 'features/locations/routes'
import { NOT_FOUND_ROUTE, HOME_ROUTE, FAVORITE_ROUTE, ADMIN_ROUTE } from 'shared/routes'

export const PRIVILEGED_ROUTES: RouteProps[] = [
  CREATE_CHARACTER_ROUTE,
  CREATE_EPISODE_ROUTE,
  CREATE_LOCATION_ROUTE,
  ADMIN_ROUTE
]

export const PROTECTED_ROUTES: RouteProps[] = [
  /* Common */
  FAVORITE_ROUTE,
  NOT_FOUND_ROUTE,

  /* Users */
  USER_ACCOUNT_ROUTE,
  USER_PROFILE_ROUTE,

  /* Characters */
  MAIN_CHARACTER_ROUTE,
  SINGLE_CHARACTER_ROUTE,
  CREATE_CHARACTER_ROUTE,

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
