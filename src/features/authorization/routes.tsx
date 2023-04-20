import React from 'react'
import { RouteProps } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { LoginPage, SignupPage, ForgotPasswordPage, ResetPasswordPage } from 'features/authorization/pages'
import { SuccessLoginPage } from './pages/SuccessLogin.page'
import { VerifyPage } from './pages/verify'

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

const VERIFY_ROUTE: RouteProps = {
  id: uuidv4(),
  element: <VerifyPage />,
  path: '/verify/:link'
}

export { FORGOT_ROUTE, LOGIN_ROUTE, RESET_ROUTE, SIGNUP_ROUTE, SUCCESS_LOGIN_ROUTE, VERIFY_ROUTE }
