import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IUser } from '../type'

interface AuthState {
  user: IUser | null
}

const initialState: AuthState = {
  user: null
}

export const userSlice = createSlice({
  name: 'credentials',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
    },
    removeUser: state => {
      state.user = null
    }
  }
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer
