import { RouteProps } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { LoginPage, SignupPage, WelcomePage } from 'features/authorization/pages'
import { ForgotPasswordPage } from './pages/ForgotPassword'
import { SuccessLoginPage } from './pages/SuccessLogin.page'
import { ResetPasswordPage } from './pages/ResetPassword'

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
  element: <ForgotPasswordPage />,
  path: '/forgot'
}

const RESET_ROUTE: RouteProps = {
  id: uuidv4(),
  element: <ResetPasswordPage />,
  path: '/reset'
}

const SUCCESS_LOGIN_ROUTE: RouteProps = {
  id: uuidv4(),
  element: <SuccessLoginPage />,
  path: '/login/success'
}

export { SIGNUP_ROUTE, LOGIN_ROUTE, WELCOME_ROUTE, FORGOT_ROUTE, RESET_ROUTE, SUCCESS_LOGIN_ROUTE }
