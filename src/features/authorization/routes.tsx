import { RouteProps } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { LoginPage, SignupPage, WelcomePage } from 'features/authorization/pages'
import { ForgotPassword } from './pages/ForgotPassword'
import { SocialPage } from './pages/Social.page'

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

const FORGOT_ROUTE: RouteProps = {
  id: uuidv4(),
  element: <ForgotPassword />,
  path: '/forgot'
}

const SOCIAL_ROUTE: RouteProps = {
  id: uuidv4(),
  element: <SocialPage />,
  path: '/social'
}

export { SIGNUP_ROUTE, LOGIN_ROUTE, WELCOME_ROUTE, FORGOT_ROUTE, SOCIAL_ROUTE }
