import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import HomePage from '../HomePage';
import NotFoundPage from '../NotFoundPage';

export default ({history, context}) => {
  return (
    <Router history={history} context={context}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </Router>
  );
}
