import React from 'react';

import ReactDOM from 'react-dom';

import App from './App';

import './assets/styles/index.scss';
import 'react-toastify/dist/ReactToastify.css';
import { CookiesProvider } from 'react-cookie';

// eslint-disable-next-line no-extend-native
Number.prototype.format = function () {
  return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

ReactDOM.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>,
  document.getElementById('root'),
);
