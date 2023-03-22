import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { User } from 'features/users/type'
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../../../shared/utils'
import { LocalStorageKey } from '../../../shared/constants'

interface AuthState {
  user: User | null
  acceptCookie: boolean
}

const initialState: AuthState = {
  user: getLocalStorage(LocalStorageKey.USER),
  acceptCookie: false
}

export const userSlice = createSlice({
  name: 'credentials',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      setLocalStorage(LocalStorageKey.USER, action.payload)
    },
    removeUser: state => {
      state.user = null
      removeLocalStorage(LocalStorageKey.USER)
    },
    setAcceptCookie: state => {
      state.acceptCookie = true
    }
  }
})

export const { setUser, removeUser, setAcceptCookie } = userSlice.actions

export const userReducer = userSlice.reducer
