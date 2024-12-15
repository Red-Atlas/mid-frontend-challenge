import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import { PropertiesContextProvider } from './context/ContextProvider.tsx';

import './index.css';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PropertiesContextProvider>
      <App />
    </PropertiesContextProvider>
  </StrictMode>,
)
