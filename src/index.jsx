import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore, { _store } from './store/configureStore.js'
import axios from 'axios';

// if (process.env.NODE_ENV === 'production')
axios.defaults.baseURL = 'http://localhost:1337/';
// else
// axios.defaults.baseURL = 'http://68.178.165.197:3000/';


import './styles/index.css';
// import './styles/tailwind.css';

import App from './App';
// import reportWebVitals from './reportWebVitals';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme'


// const store = configureStore();
const store = _store;

console.log("==============> : ", theme);

const rootNode = document.getElementById('root');
// const rootNode = document.querySelector('body');
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
  , rootNode);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
