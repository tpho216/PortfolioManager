import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers/rootReducer';

// const midddleWare = applyMiddleware(thunk);
export const store = createStore(rootReducer);
