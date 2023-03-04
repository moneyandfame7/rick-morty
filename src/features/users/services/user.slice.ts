import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { IUser } from 'features/users/type'
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../../../shared/utils'
import { LocalStorageKey } from '../../../shared/constants'

interface AuthState {
  user: IUser | null
}

const initialState: AuthState = {
  user: getLocalStorage(LocalStorageKey.USER)
}

export const userSlice = createSlice({
  name: 'credentials',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
      setLocalStorage(LocalStorageKey.USER, action.payload)
    },
    removeUser: state => {
      state.user = null
      removeLocalStorage(LocalStorageKey.USER)
    }
  }
})

export const { setUser, removeUser } = userSlice.actions

export const userReducer = userSlice.reducer
