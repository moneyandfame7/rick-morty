import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { PRIVILEGED_ROUTES, PROTECTED_ROUTES, PUBLIC_ROUTES } from '@application'
import { useAppSelector } from '@application/store'
import { useCreateTheme } from '@application/theme'
import { selectCustomization } from '@application/theme/customization'

import { ProtectedRoute } from '@features/authorization/components'

import { Header } from '@shared/layout'
import { CookieBanner } from '@shared/components/extra'
import { PrivilegedRoute } from '@shared/components/PrivilegedRoute'

export const App: React.FC = () => {
  const customization = useAppSelector(selectCustomization)
  const theme = useCreateTheme(customization)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      {/*<SettingDrawer />*/}
      <CookieBanner />
      <Routes>
        {PROTECTED_ROUTES.map(route => (
          <Route
            index={route.index}
            path={route.path}
            key={route.id}
            element={<ProtectedRoute>{route.element}</ProtectedRoute>}
          />
        ))}
        {PUBLIC_ROUTES.map(route => (
          <Route path={route.path} key={route.id} element={route.element} index={route.index} />
        ))}
        {PRIVILEGED_ROUTES.map(route => (
          <Route
            path={route.path}
            key={route.id}
            element={
              <ProtectedRoute>
                <PrivilegedRoute>{route.element}</PrivilegedRoute>
              </ProtectedRoute>
            }
          />
        ))}
      </Routes>
    </ThemeProvider>
  )
}
