import React from "react";
import { useLocation, useOutlet } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { routesConfig } from "./routes/routesConfig";
import { getDesignTokens } from "./utils/theme";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, CssBaseline, useMediaQuery } from "@mui/material";
import MyBreadcrumbs from "./components/Breadcrumbs";
import Header from "./layout/Header";

import "./App.scss";

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routesConfig.map(route => ({
      index: route.path === "/",
      path: route.path === "/" ? undefined : route.path,
      element: route.element,
    })),
  },
]);

function App() {
  const location = useLocation();
  const currentOutlet = useOutlet();
  const { nodeRef } = routesConfig.find(route => route.path === location.pathname) ?? {};

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = React.useState<"light" | "dark">(prefersDarkMode ? "dark" : "light");
  const theme = createTheme(getDesignTokens(mode));
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <MyBreadcrumbs />
        <Container sx={{ width: "100%", padding: 0 }}>
          <SwitchTransition>
            <CSSTransition key={location.pathname} nodeRef={nodeRef} timeout={300} classNames='page' unmountOnExit>
              {() => (
                <div
                  ref={nodeRef}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                    margin: "20px 0 50px",
                    padding: 0,
                  }}
                  className='page'
                >
                  {currentOutlet}
                </div>
              )}
            </CSSTransition>
          </SwitchTransition>
        </Container>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
