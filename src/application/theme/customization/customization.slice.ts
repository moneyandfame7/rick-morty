import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Customization, customizationConfig, Mode } from 'application/theme'

const initialState: Customization = {
  ...customizationConfig
}

export const customizationSlice = createSlice({
  name: 'customization',
  initialState,
  reducers: {
    setFontFamily: (state, action: PayloadAction<string>) => {
      state.fontFamily = action.payload
    },
    setBorderRadius: (state, action: PayloadAction<number>) => {
      state.borderRadius = action.payload
    },
    setMode: (state, action: PayloadAction<Mode>) => {
      state.mode = action.payload
    },
    setCompactAlgorithm: (state, action: PayloadAction<boolean>) => {
      state.compactAlgorithm = action.payload
    },
    setFontSize: (state, action: PayloadAction<number>) => {
      state.fontSize = action.payload
    },
    setPrimaryColor: (state, action: PayloadAction<string>) => {
      state.colorPrimary = action.payload
    },
    resetAllSetings: state => {
      console.log('reset')

      state.borderRadius = customizationConfig.borderRadius
      state.colorPrimary = customizationConfig.colorPrimary
      state.compactAlgorithm = customizationConfig.compactAlgorithm
      state.fontFamily = customizationConfig.fontFamily
      state.fontSize = customizationConfig.fontSize
      state.mode = customizationConfig.mode
    }
  }
})

export const { setFontFamily, setBorderRadius, setMode, setPrimaryColor, setCompactAlgorithm, resetAllSetings } =
  customizationSlice.actions
export const customizationReducer = customizationSlice.reducer
