import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import { setMode } from '@application/theme/customization'
import { addToFavorite, removeFromFavorite } from '@features/characters/services'
import { setUser, removeUser, updateUser, setAcceptCookie } from '@features/users/services'

const rootActions = {
  addToFavorite,
  removeFromFavorite,
  setMode,
  setUser,
  updateUser,
  removeUser,
  setAcceptCookie
}
export const useActions = () => {
  const dispatch = useDispatch()
  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}
