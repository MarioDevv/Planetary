import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { PlanetProvider } from './Context/PlanetContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PlanetProvider>
      <App />
    </PlanetProvider>
  </React.StrictMode>,
)
