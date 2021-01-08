import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { theme } from './theme';
import ProvideAuth from './ProvideAuth';

ReactDOM.render(
  <React.StrictMode>
    <ProvideAuth>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ProvideAuth>
  </React.StrictMode>,
  document.getElementById('root')
);
