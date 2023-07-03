import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import { RouterProvider } from 'react-router-dom'
import { ContextProvider } from './context/Context'
import { router } from './routes'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>
)
