import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'
import { useFormik } from 'formik'

import { useAppDispatch } from 'application/store'

import type { AuthCredentials, AuthResponse, SignupCredentials } from 'features/authorization/type'
import { useSignupMutation } from 'features/authorization/services'

import { setUser } from 'features/users/services'

import { signupValidationSchema } from 'shared/utils'
import { WELCOME_ROUTE } from '../routes'

export const useSignup = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [signup, { isSuccess, isLoading, error, isError }] = useSignupMutation()

  const onSubmit = async (values: AuthCredentials) => {
    const info = await signup(values)
    console.log('AASODOASDOAOSDO')

    if ('data' in info) {
      dispatch(setUser(info.data.user))
      console.log(info)

      return
    }
  }

  const formik = useFormik<SignupCredentials>({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: signupValidationSchema,
    onSubmit
  })
  useEffect(() => {
    if (isSuccess) {
      navigate({ pathname: WELCOME_ROUTE.path })
    }
  }, [isSuccess])

  return { formik, isLoading, isSuccess, error, isError }
}
