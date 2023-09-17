import { type Theme, darken, lighten } from '@mui/material'

export const getContrastColor = (theme: Theme, coeff: number) => {
  switch (theme.palette.mode) {
    case 'dark':
      return lighten(theme.palette.background.default, coeff)
    case 'light':
      return darken(theme.palette.background.default, coeff)
  }
}
