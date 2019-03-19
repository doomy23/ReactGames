/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'connected-react-router/immutable';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(preloadedState) {
  const store = createStore(
    createReducer(),
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
      ),
    ),
  )

  return store
}
