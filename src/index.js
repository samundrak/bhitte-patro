import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Domex } from './domex';
import DomexRedux from './domex-redux';
import { Provider } from 'react-redux';
import state from './store/state';
import './index.css';
import App from './App';
import stateRoutes from './store/routes';
import registerServiceWorker from './registerServiceWorker';

const router = new Router();
const domex = new Domex();
const domexRedux = new DomexRedux(domex);
domexRedux.enableDevtool();
const store = domexRedux.createStore(state);
domex.addRouter(router);
stateRoutes(router);

ReactDOM.render(
  <Provider store={store}>
    <App domex={domex} />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
if (module.hot) {
  module.hot.accept();
}
