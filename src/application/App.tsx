import React from 'react'
import { Routes } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { getPrivilegedRoutes, getProtectedRoutes, getPublicRoutes } from 'application'
import { useAppSelector } from 'application/store'
import { useCreateTheme } from 'application/theme'
import { selectCustomization } from 'application/theme/customization'

import { Header } from 'shared/layout'
import { CookieBanner } from 'shared/components/extra'

export const App: React.FC = () => {
  const customization = useAppSelector(selectCustomization)
  const theme = useCreateTheme(customization)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <CookieBanner />
      <Routes>
        {getPublicRoutes()}
        {getProtectedRoutes()}
        {getPrivilegedRoutes()}
      </Routes>
    </ThemeProvider>
  )
}
