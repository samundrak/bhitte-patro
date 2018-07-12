import Router from './Router';
import Request from './Request';
import Response from './Response';
import EventEmitter from './EventEmitter';

class Resource extends EventEmitter {
  constructor(doxpress, routers) {
    super();
    this.doxpress = doxpress;
    this._routers = routers;
    Object.values(Router.METHODS).forEach(method => {
      this[method] = (route, options) => {
        return this._execute(method, route, options);
      };
    });
  }
  synchronousPromiseResolver(promises, onEachResolve = () => null) {
    const copyOfPromises = [...promises];
    const promisesAnswer = [];

    return new Promise((resolve, reject) => {
      const prResolver = function(promise, index = 0) {
        if (!promises.length || !promise) {
          return resolve(promisesAnswer);
        }
        promise()
          .then(data => {
            promisesAnswer.push(data);
            prResolver(copyOfPromises.shift(), index + 1);
            onEachResolve(null, data, index);
          })
          .catch(err => {
            onEachResolve(err, null, index);
            reject(err);
          });
      };
      prResolver(copyOfPromises.shift());
    });
  }
  _execute(method, route, options = {}) {
    return new Promise((resolve, reject) => {
      const { data = {}, params = {} } = options;

      if (method === Router.METHODS.GET && Object.keys(data).length) {
        throw new Error('Data with method get is not allowed.');
      }
      const request = new Request();
      const response = new Response();

      request.state = this.doxpress.getState();
      response.setResolver(resolve);
      request.body = data;
      request.query = params;
      const router = this._routers.find(router =>
        router.hasRoute(method, route),
      );
      if (!router) {
        return reject(new Error(`Error: ${route} not found`));
      }
      const handlers = router.getHandlers(method, route);
      this.synchronousPromiseResolver(
        handlers.map(handler => () => handler(request, response)),
        (err, result, index) => {
          this.emit('handle:executed', {
            err,
            result,
            method,
            route,
            meta: {
              current: index + 1,
              total: handlers.length,
            },
          });
          // on every promise resolve or on rejectction
          // console.log(result);
        },
      ).catch(err => {
        reject(err);
        this.emit('handle:executed', {
          err,
          method,
          route,
        });
      });
    });
  }
}
export default Resource;
