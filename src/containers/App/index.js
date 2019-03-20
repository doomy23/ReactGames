import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Router, Switch, Route } from 'react-router-dom';

import { loadUser } from './actions';

import HomePage from '../HomePage';
import NotFoundPage from '../NotFoundPage';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Get the user id from API
    this.props.loadUser();
  }

  render() {
    return (
      <Router history={this.props.history}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  loadUser: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.any,
  currentUser: PropTypes.string
};

export default connect(
  (state) => {
    return {
      loading: state.loading,
      error: state.error,
      currentUser: state.currentUser
    }
  },
  { loadUser }
)(App)
