import { createTheme, Theme, ThemeOptions, useMediaQuery } from '@mui/material'
import { getComponentOverrides } from 'application/theme/customization'
declare module '@mui/material/styles' {
  interface PaletteColor {
    lighter?: string
  }

  interface SimplePaletteColorOptions {
    lighter?: string
  }

  interface PaletteColor {
    border?: string
  }

  interface SimplePaletteColorOptions {
    border?: string
  }
}
export type Mode = 'dark' | 'light' | 'system' | 'blue'

export const enum FontFamily {
  DEFAULT = `"Google Sans", "Noto Sans Myanmar UI", "sans-serif"`,
  POPPINS = `"Poppins", "sans-serif"`,
  ROBOTO = `"Roboto", "sans-serif"`,
  IBM_PLEX = `"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`
}

export interface Customization {
  fontFamily: string
  fontSize: number
  borderRadius: number
  mode: Mode
  compactAlgorithm: boolean
  colorPrimary: string | null
}

export const customizationConfig: Customization = {
  fontFamily: FontFamily.DEFAULT,
  fontSize: 14,
  borderRadius: 4,
  mode: 'light',
  compactAlgorithm: false,
  colorPrimary: null
}

const getDarkPalette = (customization: Customization): ThemeOptions['palette'] => ({
  mode: 'dark',
  background: {
    default: '#000',
    paper: '#1c1c1c'
  },
  primary: {
    main: customization.colorPrimary || '#fff',
    lighter: '#5ca0e5',
    border: '#292a2b'
  }
})

const getLightPalette = (customization: Customization): ThemeOptions['palette'] => ({
  mode: 'light',
  background: {
    default: '#fff',
    paper: '#f6f6f6'
  },
  primary: {
    main: customization.colorPrimary || 'rgb(26 115 232)',
    lighter: 'rgb(91 151 230)',
    contrastText: '#fff',
    border: '#e7ebf0'
  }
})

const getBluePalette = (customization: Customization): ThemeOptions['palette'] => ({
  mode: 'dark',
  background: {
    default: 'rgb(12 29 50)',
    paper: 'rgb(14 25 40 )'
  },
  primary: {
    main: customization.colorPrimary || '#007FFF',
    lighter: 'rgb(102 178 255)',
    border: '#132f4c',
    contrastText: '#fff'
  }
})
export const getPaletteForMode = (customization: Customization, prefersDarkMode: boolean): ThemeOptions['palette'] => {
  switch (customization.mode) {
    case 'dark':
      return getDarkPalette(customization)
    case 'blue':
      return getBluePalette(customization)
    case 'light':
      return getLightPalette(customization)
    case 'system':
      return prefersDarkMode ? getDarkPalette(customization) : getLightPalette(customization)
  }
}

export const useCreateTheme = (customization: Customization) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const palette = getPaletteForMode(customization, prefersDarkMode)

  /*  For blue theme:  */
  /* Primary color #007fff */
  /* Paper background  rgb (12 29 50) */
  /* Body background rgb(14 25 40 ) ? +  */

  const themeObj: ThemeOptions = {
    palette,
    // palette: {
    //   mode: paletteMode,
    //   primary: {
    //     main: customization.colorPrimary
    //   }
    // },
    shape: {
      borderRadius: customization.borderRadius
    },
    typography: {
      fontFamily: customization.fontFamily
    }
  }

  const theme = createTheme(themeObj)
  const components = getComponentOverrides(theme)
  theme.components = components
  console.log(theme.palette.mode)

  return theme
}
