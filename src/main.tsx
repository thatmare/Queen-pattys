import React from 'react'
import ReactDOM from 'react-dom/client'
import { Login, Logo, IconsFood } from './Login.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <section className='LoginForm'>
      <Logo />
      <Login />
      <IconsFood />
    </section>
  </React.StrictMode>,
)
