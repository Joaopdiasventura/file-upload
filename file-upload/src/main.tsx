import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'



import { createBrowserRouter,RouterProvider,Router, } from 'react-router-dom'
import PageLoginRegister from './routers/PageLoginRegister.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element:<PageLoginRegister/>

  },

])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
