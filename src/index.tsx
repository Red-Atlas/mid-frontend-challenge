import React from 'react';
import ReactDOM from 'react-dom/client';
import MapLayout from './components/map-layout/map-layout';
import './index.css';
import store from './store';
import { Provider } from 'react-redux';
import PropertiesList from './components/properties-list/properties-list';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import "./styles/fonts.css"; 


const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <React.StrictMode>
          <MapLayout />
          <PropertiesList />
        </React.StrictMode>
      </Provider>
    </ThemeProvider>

  );
}

