import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import { router } from "./pages/App";
import { RouterProvider } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <RouterProvider router={router} />
    </StyledEngineProvider>
  </Provider>
);
