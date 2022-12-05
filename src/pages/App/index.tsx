import React from "react";
import Header from "../../layouts/Header";
import { createBrowserRouter } from "react-router-dom";
import { routesConfig } from "../../routes/routesConfig";
import Wrapper from "../../layouts/Wrapper";
import { useLocation, useOutlet } from "react-router";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { teal, deepOrange, orange, cyan } from "@mui/material/colors";

import "./App.scss";
import { Container, CssBaseline, useMediaQuery } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    neutral?: Palette["primary"];
  }
  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
  }
}
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
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette:
          mode === "light"
            ? {
                mode,
                background: {
                  default: "#f7f7f8",
                  paper: "#fff",
                },
                neutral: {
                  main: "#bdbdbd",
                },
              }
            : {
                mode,
                primary: {
                  main: "#a697ce",
                },
                neutral: {
                  main: "#424242",
                },
                background: {
                  default: "#000",
                  paper: "#131318",
                },
              },
      }),
    [mode]
  );
  // const theme = React.useMemo(
  //   () =>
  //     createTheme({
  //       palette: {
  //         mode,
  //       },
  //     }),
  //   [mode]
  // );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Container maxWidth='xl' component='main'>
          <SwitchTransition>
            <CSSTransition key={location.pathname} nodeRef={nodeRef} timeout={300} classNames='page' unmountOnExit>
              {() => (
                <div ref={nodeRef} className='page'>
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
