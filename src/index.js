import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import domex, { store } from './store';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter store={store}>
      <App domex={domex} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

Object.defineProperty(window, 'bhittePatroEvents', {
  enumerable: false,
  configurable: false,
  value: {},
});
registerServiceWorker();
if (module.hot) {
  module.hot.accept();
}
