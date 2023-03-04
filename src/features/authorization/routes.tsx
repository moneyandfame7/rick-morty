import { RouteProps } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { LoginPage, SignupPage, WelcomePage } from 'features/authorization/pages'

const SIGNUP_ROUTE: RouteProps = {
  id: uuidv4(),
  element: <SignupPage />,
  path: '/signup'
}

const LOGIN_ROUTE: RouteProps = {
  id: uuidv4(),
  element: <LoginPage />,
  path: '/login'
}

const WELCOME_ROUTE: RouteProps = {
  id: uuidv4(),
  element: <WelcomePage />,
  path: '/welcome'
}

export { SIGNUP_ROUTE, LOGIN_ROUTE, WELCOME_ROUTE }
