import EventEmitter from './EventEmitter';

class Router extends EventEmitter {
  constructor() {
    super();
    this._routes = new Map();
    Object.values(Router.METHODS).forEach((method) => {
      this._routes.set(method, new Map());
      this[method] = (route, ...middlewares) => {
        this._createRoute(method, route, middlewares);
        this.emit('route:created', {
          method,
          route,
        });
        return this;
      };
    });
  }

  _createRoute(method, route, middlewares) {
    this._routes.get(method).set(route, middlewares);
  }

  getHandlers(method, route) {
    const methodMap = this._routes.get(method);
    if (!methodMap) {
      return null;
    }

    return methodMap.get(route);
  }

  hasRoute(method, route) {
    const methodMap = this._routes.get(method);
    if (!methodMap) {
      return false;
    }
    return methodMap.has(route);
  }
}

Router.METHODS = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PATCH: 'patch',
};
export default Router;
