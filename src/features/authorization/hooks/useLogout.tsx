import { useAppDispatch } from 'application/store'
import { useLogoutMutation } from 'features/authorization/services'
import { removeUser } from 'features/users/services'

export const useLogout = () => {
  const dispatch = useAppDispatch()
  const [logout, { isSuccess, isLoading }] = useLogoutMutation()

  const makeLogout = async () => {
    await logout()
    dispatch(removeUser())
  }
  return { makeLogout, isSuccess, isLoading }
}
