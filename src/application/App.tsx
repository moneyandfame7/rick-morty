import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline, useMediaQuery } from '@mui/material'

import { getDesignTokens, PROTECTED_ROUTES, PUBLIC_ROUTES } from 'application'

import { Header } from 'shared/layout'
import { ProtectedRoute } from 'shared/components'

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {}
})

export const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [mode, setMode] = React.useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light')
  const theme = createTheme(getDesignTokens(mode))
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))
      }
    }),
    []
  )
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        {/*{!(pathname === "/signup" || pathname === "/login" || pathname === "/welcome") ? <MyBreadcrumbs /> : null}*/}
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
            <Route path={route.path} key={route.id} element={route.element} />
          ))}
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
