import React from 'react'
import { getDesignTokens } from '../utils/theme'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline, useMediaQuery } from '@mui/material'
import Header from '../shared/layout/Header/default/Header'
import '../App.scss'
import { Route, Routes } from 'react-router-dom'
import { protectedRoutes, publicRoutes } from '../routes/routesConfig'
import { ProtectedRoute } from '../components/ProtectedRoute'

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {}
})
// TODO: протестировать тему, кликая на кнопку смены темы по несколько раз
// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: routesConfig.map(route => ({
//       index: route.path === "/",
//       path: route.path === "/" ? undefined : route.path,
//       element: route.element,
//     })),
//   },
// ]);

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  // const location = useLocation();
  // const currentOutlet = useOutlet();
  // const { nodeRef } = routesConfig.find(route => route.path === location.pathname) ?? {};

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
        {/*     <SwitchTransition>
          <CSSTransition key={location.pathname} nodeRef={nodeRef} timeout={300} classNames='page' unmountOnExit>
            {() => (
              <div
                ref={nodeRef}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "20px",
                  margin: "0 50px",
                  padding: 0,
                }}
                className='page'
              >*/}
        <Routes>
          {protectedRoutes.map(route => (
            <Route
              index={route.index}
              path={route.path}
              key={route.id}
              element={<ProtectedRoute>{route.element}</ProtectedRoute>}
            />
          ))}
          {publicRoutes.map(route => (
            <Route path={route.path} key={route.id} element={route.element} />
          ))}
        </Routes>
        {/*{currentOutlet}*/}
        {/*          </div>
            )}
          </CSSTransition>
        </SwitchTransition>*/}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
