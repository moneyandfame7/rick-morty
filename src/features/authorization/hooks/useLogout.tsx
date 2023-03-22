import { useLogoutMutation } from 'features/authorization/services'
import { useAppDispatch } from '../../../application/store'
import { removeUser } from '../../users/services'

export const useLogout = () => {
  const dispatch = useAppDispatch()
  const [logout, { isSuccess, isLoading }] = useLogoutMutation()

  const makeLogout = async () => {
    await logout()
    dispatch(removeUser())
  }
  return { makeLogout, isSuccess, isLoading }
}
