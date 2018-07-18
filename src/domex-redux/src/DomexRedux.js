import { createStore, combineReducers } from 'redux';

class DomexRedux {
  constructor(domex) {
    this.domex = domex;
    this.store = null;
    this.state = {};
    this._queue = new Map();
    this.domex.on(
      'handler:message',
      this.handleRouterHandlerMessage.bind(this),
    );
    this.domex.state = {};
  }

  setState(state) {
    this.state = state;
  }

  _createReducer(state, action) {
    state = state || this.state;
    const newState = Object.assign({}, action.data);
    return Object.assign({}, state, newState);
  }

  createActions({
    method, route, data, result,
  }) {
    return {
      type: `${method}_${route}`,
      data: result,
    };
  }

  createStore(state = {}) {
    this.state = state;
    this.store = createStore(
      combineReducers({
        app: this._createReducer.bind(this),
      }),
      this.devtool(),
    );
    Object.defineProperty(this.domex, 'getState', {
      configurable: false,
      value: () => this.store.getState(),
    });
    return this.store;
  }

  enableDevtool() {
    this.enableDevtool = true;
  }

  devtool() {
    if (this.enableDevtool) {
      return (
        window.__REDUX_DEVTOOLS_EXTENSION__
        && window.__REDUX_DEVTOOLS_EXTENSION__()
      );
    }
    return () => null;
  }

  handleRouterHandlerMessage(data) {
    if (this.store && this.store.dispatch) {
      this.store.dispatch(this.createActions(data));
    }
  }
}

export default DomexRedux;
