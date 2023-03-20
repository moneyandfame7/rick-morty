import { useQueryParams } from 'shared/hooks'
import jwt_decode from 'jwt-decode'
import { useEffect } from 'react'
import { useAppDispatch } from 'application/store'
import { setUser } from 'features/users/services'
import { User } from 'features/users/type'
import { useNavigate } from 'react-router-dom'
import { HOME_ROUTE } from 'shared/routes'

export const SocialPage = () => {
  const navigate = useNavigate()
  const token = useQueryParams().get('token')
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (token) {
      const user: User = jwt_decode(token)
      console.log(user)

      dispatch(setUser(user))
      if (user) {
        navigate({ pathname: HOME_ROUTE.path })
      }
    }
  }, [token])
  return <h1>{token}</h1>
}
