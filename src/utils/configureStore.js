/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'connected-react-router/immutable';
import createSagaMiddleware from 'redux-saga';

import createRootReducer from '../reducers';
import sagas from '../sagas'
import history from './history';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(preloadedState) {
  const middlewares = [sagaMiddleware, routerMiddleware(history)];
  const enhancers = [applyMiddleware(...middlewares)];
  const composeEnhancer = compose;

  const store = createStore(
    createRootReducer(history),
    fromJS(preloadedState),
    composeEnhancer(...enhancers),
  );

  // Extensions
  store.runSaga = sagaMiddleware.run(sagas);

  return store
}
