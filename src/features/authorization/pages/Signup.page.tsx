import { useEffect, useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import { useSignup } from 'features/authorization/hooks'
import { ValidatedInput } from 'shared/components/ValidatedInput'
import { PasswordInput } from 'shared/components/PasswordInput'
import { useAppSelector } from '../../../application/store'
import { HOME_ROUTE } from '../../../shared/routes'
import { selectIsAuthenticated } from '../services'
import { ErrorMessage } from 'shared/components'
import { Backdrop } from 'shared/components/Backdrop'
import { Logo } from 'shared/components/Logo'

export const SignupPage = () => {
  const isUserAuthenticated = useAppSelector(selectIsAuthenticated)
  const navigate = useNavigate()
  const { formik, isLoading, error, isError } = useSignup()
  useEffect(() => {
    if (isUserAuthenticated) {
      console.log('SIGNUP PAGE REDIRECT BECAUSE >>>>> Already authenticated')
      navigate({ pathname: HOME_ROUTE.path })
    }
  }, [])
  return (
   <></>
  )
}
