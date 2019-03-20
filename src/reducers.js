/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';

import history from './utils/history';
import AppReducer from './containers/App/reducer';
//import languageProviderReducer from 'containers/LanguageProvider/reducer';

export default (history) => combineReducers({
  app: AppReducer,
  router: connectRouter(history)
})
