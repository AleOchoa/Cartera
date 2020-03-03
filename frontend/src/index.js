import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom'
import Router from './Router';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import theme from './theme'
import './index.css'
import MyProvider from './context'

ReactDOM.render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
      <CSSReset />
      <MyProvider>
        <Router />
      </MyProvider>
    </ThemeProvider>
    </BrowserRouter>,
    document.getElementById('root')
  )
  
serviceWorker.register();
