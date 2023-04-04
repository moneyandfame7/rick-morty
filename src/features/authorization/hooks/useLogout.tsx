import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from 'application/store'

import { useLogoutMutation } from 'features/authorization/services'
import { removeUser } from 'features/users/services'
import { LOGIN_ROUTE } from 'features/authorization/routes'

export const useLogout = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [logout, { isSuccess, isLoading }] = useLogoutMutation()

  const makeLogout = async () => {
    await logout()
    dispatch(removeUser())
    navigate({ pathname: LOGIN_ROUTE.path })
  }
  return { makeLogout, isSuccess, isLoading }
}
