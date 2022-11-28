import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import App from "./pages/App";
import { BrowserRouter } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <BrowserRouter>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </BrowserRouter>
);
