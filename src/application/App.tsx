import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material'

import { PROTECTED_ROUTES, PUBLIC_ROUTES } from 'application'
import { useAppSelector } from 'application/store'
import { useCreateTheme } from 'application/theme'
import { selectCustomization } from 'application/theme/customization'
import { shouldSkipGeneratingVar as muiShouldSkipGeneratingVar } from '@mui/material/styles'

import { ProtectedRoute } from 'shared/components'
import { Header } from 'shared/layout'
import './app.css'
import { useIsSomethingLoading } from './store/selectors'
import { ConfigProvider, theme as antdTheme } from 'antd'

export const App: React.FC = () => {
  const customization = useAppSelector(selectCustomization)
  const theme = useCreateTheme(customization)
  return (
    <ThemeProvider theme={theme}>
      <ConfigProvider
        theme={{
          algorithm: theme.palette.mode === 'light' ? antdTheme.defaultAlgorithm : antdTheme.darkAlgorithm,
          components: {
            Select: {
              colorBgContainer: theme.palette.mode === 'dark' ? '#000' : '#fff'
            },
            Input: {
              colorBgContainer: theme.palette.mode === 'dark' ? '#000' : '#fff'
            }
          }
        }}
      >
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
      </ConfigProvider>
    </ThemeProvider>
  )
}
