import React from "react"
import ReactDOM from "react-dom/client"
import "./styles/index.scss"
import App from "./containers/App"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.Fragment>
    <App />
  </React.Fragment>,
)
