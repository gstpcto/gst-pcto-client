import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { theme } from './theme';
import ProvideAuth from './ProvideAuth';


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProvideAuth>

        <App />
      </ProvideAuth>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
