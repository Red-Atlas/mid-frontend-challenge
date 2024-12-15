import { ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import GlobalSnackbar from './components/global-snackbar-store/global-snackbar-store';
import './index.css';
import AppRoutes from './routes';
import store from './store';
import "./styles/fonts.css";
import theme from './theme';


const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
      <GlobalSnackbar />
        <React.StrictMode>
         <AppRoutes/>
        </React.StrictMode>
      </Provider>
    </ThemeProvider>

  );
}

