import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PropertiesContextProvider } from './context/ContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PropertiesContextProvider>
      <App />
    </PropertiesContextProvider>
  </StrictMode>,
)
