// Needed for redux-saga es6 generator support
import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, ReactReduxContext } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { Router } from 'react-router-dom';

import history from './utils/history';
import configureStore from './configureStore';

import App from './containers/App';

// Tells MiniCssExtractPlugin to add css statics
import '../static/css/bootstrap.min.css';
import '../static/css/default.css';

// Create redux store with history
const initialState = {};
const store = configureStore(initialState);

// TODO
//let intl_messages = {};

const render = (history) => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Router history={history}>
          <App />
        </Router>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
  );
};

render(history);
