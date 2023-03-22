import { useAppDispatch } from 'application/store'

import { useLogoutMutation } from 'features/authorization/services'
import { removeUser } from 'features/users/services'
import { useCallback } from 'react'

export const useLogout = () => {
  const [logout, { isSuccess, isLoading }] = useLogoutMutation()

  // ;(async () => {
  //   const info = await logout()
  //   if ('data' in info) {
  //     dispatch(removeUser())

  //     return
  //   }
  // })()

  return { logout, isSuccess, isLoading }
}
