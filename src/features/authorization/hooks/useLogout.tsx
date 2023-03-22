import { useLogoutMutation } from 'features/authorization/services'

export const useLogout = () => {
  const [logout, { isSuccess, isLoading }] = useLogoutMutation()

  return { logout, isSuccess, isLoading }
}
