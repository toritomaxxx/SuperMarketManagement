import React from 'react'
import ReactDOM from 'react-dom/client'
import { ContextProvider } from './context/Context'
import Routers from './routes'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ContextProvider>
      <Routers />
    </ContextProvider>
  </React.StrictMode>
)
