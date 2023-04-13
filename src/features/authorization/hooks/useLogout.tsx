import { useNavigate } from 'react-router-dom'

import { useLogoutMutation } from '@features/authorization/services'
import { LOGIN_ROUTE } from '@features/authorization/routes'

import { useActions } from '@shared/hooks/useActions'

export const useLogout = () => {
  const navigate = useNavigate()
  const { removeUser } = useActions()
  const [logout, { isSuccess, isLoading }] = useLogoutMutation()

  const makeLogout = async () => {
    await logout()
    removeUser()
    navigate({ pathname: LOGIN_ROUTE.path })
  }
  return { makeLogout, isSuccess, isLoading }
}
