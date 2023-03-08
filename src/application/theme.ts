import { theme, ThemeConfig } from 'antd'

export type Mode = 'dark' | 'light'
export type Placement = 'left' | 'right'

export const enum FontFamily {
  ROBOTO = `"Roboto", "sans-serif"`,
  INTER = `"Inter", "sans-serif"`,
  POPPINS = `"Poppins", "sans-serif"`,
  DEFAULT = `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
  'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
  'Noto Color Emoji'`,
  OPEN_SANS = `"Open Sans", "sans-serif"`
}
export interface Customization {
  fontFamily: string
  fontSize: number
  borderRadius: number
  mode: Mode
  compactAlgorithm: boolean
  colorPrimary: string
  drawerPlacement: Placement
}

export const customizationConfig: Customization = {
  fontFamily: FontFamily.DEFAULT,
  fontSize: 14,
  borderRadius: 12,
  mode: 'light',
  compactAlgorithm: false,
  colorPrimary: '#1677ff',
  drawerPlacement: 'right'
}

export const generateTheme = (customize: Customization): ThemeConfig => {
  const { darkAlgorithm, defaultAlgorithm, compactAlgorithm } = theme

  const colorMode = customize.mode === 'dark' ? darkAlgorithm : defaultAlgorithm
  const algorithms = [colorMode]
  if (customize.compactAlgorithm) {
    algorithms.push(compactAlgorithm)
  }
  return {
    algorithm: algorithms,
    token: {
      borderRadius: customize.borderRadius,
      fontFamily: customize.fontFamily,
      colorPrimary: customize.colorPrimary
    }
  }
}
