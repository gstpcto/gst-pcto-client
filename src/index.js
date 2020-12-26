import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { theme } from './theme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
