import React from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { get } from 'lodash';
import {
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';

import {
  makeSelectCurrentUser,
} from '../App/selectors';
import {
  updateUserName,
} from '../App/actions';
import reducer from '../App/reducer';

import FontAwesome from '../../components/FontAwesome';

import userDefaultJPEG from '../../../static/img/user-default.jpg';

class UserModule extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      overEditingName: false,
      editingName: false,
      validated: false,
      userNameValid: true
    };
  }

  handleToggleOverEditingName(event) {
    this.setState({
      overEditingName: !this.state.overEditingName
    });
  }

  handleEditingName(event) {
    this.setState({
      editingName: true
    });
  }

  handleSubmitName(event) {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    const userName = get(this.refs, 'userName.value', '');
    let userNameValid = undefined;

    if (form.checkValidity() === false || userName.length < 5) {
      userNameValid = false;

    } else {
      userNameValid = true;

      this.props.updateUserName(userName);
    }

    this.setState({
      overEditingName: false,
      editingName: false,
      validated: true,
      userNameValid
    });
  }

  render() {
    const {
      currentUser
    } = this.props;
    const {
      overEditingName,
      editingName,
      validated,
      userNameValid
    } = this.state;

    return (
      <Col id="user" xs={12} className={classNames('clearfix')}>
        <div className="image">
          <img src={currentUser.image || userDefaultJPEG}/>
        </div>
        <div className="name">
        {editingName ? (
          <Form
            noValidate
            validated={validated}
            onSubmit={event => this.handleSubmitName.bind(this)(event)}>
            <Form.Group controlId="formUserName">
              <Form.Control
                ref="userName"
                type="text"
                name="userName"
                defaultValue={currentUser.name}
                isValid={userNameValid}
                isInvalid={!userNameValid}
                required/>
              <Form.Control.Feedback type="invalid">
                Please choose a username of at least 5 characters.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        ) : (
          <h2
            onClick={event => this.handleEditingName.bind(this)(event)}
            onPointerEnter={event => this.handleToggleOverEditingName.bind(this)(event)}
            onPointerLeave={event => this.handleToggleOverEditingName.bind(this)(event)}>
            <FontAwesome className="status--online" name="circle"/>
            {currentUser.name}
            {overEditingName ? (
              <FontAwesome className="edit" name="edit"/>
            ) : null}
          </h2>
        )}
        </div>
      </Col>
    );
  }
}

UserModule.propTypes = {
  updateUserName: PropTypes.func,
  currentUser: PropTypes.object
};

const mapDispatchToProps = { updateUserName };

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser()
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserModule);
