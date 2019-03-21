import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Container, Row, Col } from 'react-bootstrap';

import {
  makeSelectLoading,
  makeSelectError,
  makeSelectCurrentUser
} from './selectors';
import { loadUser } from './actions';
import reducer from './reducer';

import ContentLoading from '../../components/ContentLoading';
import ContentError from '../../components/ContentError';

class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Get the user id from API
    if(!this.props.currentUser)
      this.props.loadUser();
  }

  render() {
    const { loading, error, currentUser } = this.props;
    let content = null;

    if(error) {
      content =  (<ContentError error={error}/>);
    } else if(loading || !currentUser) {
      content =  (<ContentLoading/>);
    } else {
      content = this.props.children;
    }

    return (
      <React.Fragment>
        <header>
          <Container>
            <Row>
              <Col>Col 1</Col>
            </Row>
          </Container>
        </header>
        <Container>
          {content}
        </Container>
      </React.Fragment>
    );
  }
}

AppWrapper.propTypes = {
  loadUser: PropTypes.func,

  loading: PropTypes.bool,
  error: PropTypes.string,
  currentUser: PropTypes.string,
  
  children: PropTypes.any
};

const mapDispatchToProps = { loadUser };

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  currentUser: makeSelectCurrentUser()
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppWrapper);
