// Needed for redux-saga es6 generator support
import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, ReactReduxContext  } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { fromJS } from 'immutable';

import App from './containers/App';

import history from './utils/history';
import configureStore from './configureStore';

// Create redux store with history
const initialState = fromJS({});
const store = configureStore(initialState);

// TODO
let intl_messages = {};

const render = ({ history, context }) => {
  ReactDOM.render(
    <Provider store={store} context={context}>
      <ConnectedRouter history={history} context={context}>
        <App history={history} context={context}/>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
  );
};

render({history, ReactReduxContext});
