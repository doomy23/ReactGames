import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  Row,
  Col
} from 'react-bootstrap';

import {
  makeSelectOnlineUsersLoading,
  makeSelectOnlineUsersLoaded,
  makeSelectOnlineUsersError,
  makeSelectOnlineUsers
} from './selectors';
import {
  makeSelectCurrentUser
} from '../../containers/App/selectors';
import {
  loadOnlineUsers
} from './actions';

import Websocket from '../../utils/websocket';

import FontAwesome from '../../components/FontAwesome';
import ModuleLoading from '../../components/Loading/ModuleLoading';
import ModuleError from '../../components/Error/ModuleError';

class OnlineModule extends React.Component {
  componentDidMount() {
    const {
      loading,
      loaded
    } = this.props;

    //if(!loading && !loaded)
      //this.props.loadOnlineUsers();

    let socket = {};//Websocket();

    if(socket.connected) {
      this.setState({ websocket });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps, this.props);

    if(this.props.loaded && !prevProps.loaded) {
      // Bind websocket to events about online users
      console.log("bind");

    } else if(this.props.error && prevProps.error === null) {
      // Unbind websocket events
      console.log("unbind");
    }
  }

  componentWillUnmount() {
    if(this.props.loaded) {
      // Unbind websocket events
      console.log("unbind");
    }
  }

  render() {
    const {
      loading,
      loaded,
      error,
      users,
      currentUser
    } = this.props;

    console.log(this.props);

    let content = null;

    if(error) {
      content = <ModuleError error={error}/>;
    } else if(loading) {
      content = <ModuleLoading/>;
    } else {
      const userRows = [];

      users.forEach((user, key) => {
        const userRow = (
          <div key={key+1} className="user">
            {user.name}
          </div>
        );
        userRows.push(userRow);
      });

      content = (
        <React.Fragment>
          {userRows}
        </React.Fragment>
      );
    }

    return (
      <Col id="online" xs={12}>
        <h2>Online users</h2>
        {content}
      </Col>
    );
  }
}

OnlineModule.propTypes = {
  loadOnlineUsers: PropTypes.func,

  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  error: PropTypes.object,
  // The array in the store is received as a List object or a array
  users: PropTypes.any,
  currentUser: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectOnlineUsersLoading(),
  loaded: makeSelectOnlineUsersLoaded(),
  error: makeSelectOnlineUsersError(),
  users: makeSelectOnlineUsers(),
  currentUser: makeSelectCurrentUser()
});

export default connect(
  mapStateToProps,
  { loadOnlineUsers }
)(OnlineModule);
