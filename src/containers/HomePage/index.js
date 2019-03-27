import React from 'react';
import PropTypes from 'prop-types'
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
  loadUser
} from '../App/actions';
import reducer from '../App/reducer';

import Logo from '../../components/Header/Logo';

class HomePage extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      validated: false,
      userNameValid: undefined
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    const userName = get(this.refs, 'userName.value', '');
    let userNameValid = undefined;

    if (form.checkValidity() === false || userName.length < 5) {
      userNameValid = false;

    } else {
      userNameValid = true;

      this.props.loadUser(userName);
    }

    this.setState({
      validated: true,
      userNameValid
    });
  }

  render() {
    const {
      validated,
      userNameValid
    } = this.state;

    return (
      <Row>
        <Col>
          <Logo/>
          <Row className="justify-content-md-center">
            <Col id="home" sm="12" md="8" lg="7">
              <Form
                noValidate
                validated={validated}
                onSubmit={event => this.handleSubmit(event)}>
                <Form.Group as={Row} controlId="formUserName">
                  <Col xs={12}>
                    <Form.Control
                      ref="userName"
                      size="lg"
                      type="text"
                      placeholder={"Enter your username".toUpperCase()}
                      name="userName"
                      isValid={userNameValid}
                      isInvalid={!userNameValid && typeof userNameValid !== 'undefined'}
                      required/>
                    <Form.Control.Feedback type="invalid">
                      Please choose a username of at least 5 characters.
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Button id="formUserNameSubmit" variant="outline-success" size="lg" type="submit">
                  Enter
                </Button>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

HomePage.propTypes = {
  loadUser: PropTypes.func,
  validated: PropTypes.bool
};

export default connect(
  null,
  { loadUser }
)(HomePage);
