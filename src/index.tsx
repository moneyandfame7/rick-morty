import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { StyledEngineProvider } from '@mui/material'

import { App } from 'application'
import { persistor, store } from 'application/store'
import { PersistGate } from 'redux-persist/integration/react'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StyledEngineProvider>
    </PersistGate>
  </Provider>
)
