import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Customization, Mode } from '@application/theme'

const initialState: Customization = {
  mode: 'system'
}

export const customizationSlice = createSlice({
  name: 'customization',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<Mode>) => {
      state.mode = action.payload
    }
  }
})

export const { setMode } = customizationSlice.actions
export const customizationReducer = customizationSlice.reducer
