import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { PROTECTED_ROUTES, PUBLIC_ROUTES, generateTheme } from 'application'
import { ProtectedRoute } from 'shared/components'
import { Header } from 'shared/layout'
import { useAppSelector } from './store'
import { selectCustomization } from './theme/customization.selector'
import { SettingDrawer } from 'shared/components/SettingDrawer'
import 'antd/dist/reset.css'
import './app.css'
import { ConfigProvider } from 'antd'
export const App = () => {
  const customization = useAppSelector(selectCustomization)

  return (
    <ConfigProvider theme={generateTheme(customization)}>
      <Header />
      <SettingDrawer />
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
    </ConfigProvider>
  )
}
