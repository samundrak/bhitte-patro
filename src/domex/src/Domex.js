import EventEmitter from './EventEmitter';
import Resource from './Resource';

class Domex extends EventEmitter {
  constructor(props) {
    super(props);
    this._routers = [];
    this.resource = new Resource(this, this._routers);
    this.resource.on(
      'handle:executed',
      this.handleEachHandlerExecution.bind(this)
    );
    this.handleNewRouteCreation = this.handleNewRouteCreation.bind(this);
  }

  addRouter(router) {
    router.on('route:created', this.handleNewRouteCreation);
    this._routers.push(router);
  }
  handleNewRouteCreation(data) {
    // console.log('new route data', data);
  }
  handleEachHandlerExecution(data) {
    if (data.meta && data.meta.current === data.meta.total) {
      this.emit('handler:message', data);
    }
  }
}
export default Domex;
