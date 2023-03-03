import React from "react";
import ReactDOM from "react-dom/client";
import App from "./application/App";
import "./styles/index.scss";
import { StyledEngineProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./application/store/store";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {/*<RouterProvider router={router} />*/}
    </StyledEngineProvider>
  </Provider>
);
