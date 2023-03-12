import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material'

import { PROTECTED_ROUTES, PUBLIC_ROUTES } from 'application'
import { useAppSelector } from 'application/store'
import { useCreateTheme } from 'application/theme'
import { selectCustomization } from 'application/theme/customization'

import { ProtectedRoute } from 'shared/components'
import { Header } from 'shared/layout'
import { SwipeableUserMenu } from 'shared/components/SwipeableUserMenu'

export const App: React.FC = () => {
  const customization = useAppSelector(selectCustomization)
  const mobile = useMediaQuery('(max-width:600px)')
  console.log(mobile)
  const theme = useCreateTheme(customization)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      {/* {mobile && <SwipeableUserMenu />} */}
      <Routes>
        {' '}
        {PROTECTED_ROUTES.map(route => (
          <Route
            index={route.index}
            path={route.path}
            key={route.id}
            element={<ProtectedRoute>{route.element}</ProtectedRoute>}
          />
        ))}
        {PUBLIC_ROUTES.map(route => (
          <Route path={route.path} key={route.id} element={route.element} />
        ))}
      </Routes>
    </ThemeProvider>
  )
}
