import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Container, Row, Col, Nav } from 'react-bootstrap';

import {
  makeSelectLoading,
  makeSelectError,
  makeSelectCurrentUser,
  makeSelectContentHeight
} from './selectors';
import {
  loadUser,
  updateDimensions
} from './actions';
import reducer from './reducer';

import ContentLoading from '../../components/ContentLoading';
import ContentError from '../../components/ContentError';

class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener("resize", this.props.updateDimensions);

    // Get the user id from API
    if(!this.props.currentUser)
      this.props.loadUser();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.props.updateDimensions);
  }

  render() {
    const {
      loading,
      error,
      currentUser,
      contentHeight
    } = this.props;
    let content = null;

    if(error) {
      content =  (<ContentError error={error}/>);
    } else if(loading || !currentUser) {
      content =  (<ContentLoading/>);
    } else {
      content = this.props.children;
    }

    const contentProps = {
      id: 'content',
      style: {
        height: contentHeight - 41
      }
    };

    return (
      <React.Fragment>
        <header>
          <Container>
            <Row>
              <Col>
                <Nav
                  activeKey="/home"
                  onSelect={selectedKey => alert(`selected ${selectedKey}`)}
                >
                  <Nav.Item>
                    <Nav.Link href="#/home">Active</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="link-2">Link</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
            </Row>
          </Container>
        </header>
        <Container {...contentProps}>
          {content}
        </Container>
      </React.Fragment>
    );
  }
}

AppWrapper.propTypes = {
  loadUser: PropTypes.func,
  updateDimensions: PropTypes.func,

  loading: PropTypes.bool,
  error: PropTypes.string,
  currentUser: PropTypes.string,
  contentHeight: PropTypes.number,

  children: PropTypes.any
};

const mapDispatchToProps = { loadUser, updateDimensions };

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  currentUser: makeSelectCurrentUser(),
  contentHeight: makeSelectContentHeight()
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppWrapper);
