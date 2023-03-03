import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'
import { useFormik } from 'formik'
import { signupValidationSchema } from '../../../utils/auth'
import { useSignupMutation } from '../services/api.slice'
import { useAppDispatch } from '../../../application/store'
import { setUser } from '../../users/services/user.slice'
import type { IAuthCredentials, IAuthResponse } from '../type'

export const useSignup = () => {
  const navigate = useNavigate()
  const [signupCredentials, setSignupCredentials] = useState<IAuthResponse>()
  const [error, setError] = useState<FetchBaseQueryError | SerializedError>()
  const dispatch = useAppDispatch()

  const [signup, { isSuccess, isLoading }] = useSignupMutation()

  const handleSignup = async (values: IAuthCredentials) => {
    const info = await signup(values)
    if ('data' in info) {
      setSignupCredentials(info.data)
      return
    }
    setError(info.error)
  }
  const onSubmit = async (values: IAuthCredentials) => {
    await handleSignup(values)
  }
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validateOnBlur: true,
    validationSchema: signupValidationSchema,
    onSubmit
  })
  useEffect(() => {
    if (isSuccess) {
      navigate('/welcome')
      if (signupCredentials) {
        dispatch(setUser(signupCredentials.user))
      }
    }
  }, [isSuccess, signupCredentials])

  return { signupCredentials, error, formik, isLoading, isSuccess }
}
