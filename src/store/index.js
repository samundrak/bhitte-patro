import { Router, Domex } from '../domex';
import DomexRedux from '../domex-redux';
import stateRoutes from './routes';
import state from './state';

const router = new Router();
const domex = new Domex();
const domexRedux = new DomexRedux(domex);
domexRedux.enableDevtool();
const store = domexRedux.createStore(state);
domex.addRouter(router);
stateRoutes(router);

export { store };
export default domex;
