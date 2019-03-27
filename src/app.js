// Needed for redux-saga es6 generator support
import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, ReactReduxContext } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { Router } from 'react-router-dom';

import history from './utils/history';
import store from './utils/store';
import App from './containers/App';

// Add favicon.ico to the dist root
import '../static/favicon.ico';

// Tells MiniCssExtractPlugin to add css statics
import '../static/css/bootstrap.min.css';
import '../static/fontawesome/css/all.min.css';
import '../static/css/default.css';

// TODO: Intl
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
