import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { User } from 'features/users/type'

interface AuthState {
  user: User | null
  acceptCookie: boolean
}

const initialState: AuthState = {
  user: null,
  acceptCookie: false
}

export const userSlice = createSlice({
  name: 'credentials',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    removeUser: state => {
      state.user = null
    },
    setAcceptCookie: state => {
      state.acceptCookie = true
    }
  }
})

export const { setUser, removeUser, setAcceptCookie } = userSlice.actions

export const userReducer = userSlice.reducer
