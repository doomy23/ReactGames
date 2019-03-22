import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';

import {
  makeSelectLoading,
  makeSelectLoaded,
  makeSelectError,
  makeSelectCurrentUser,
  makeSelectContentHeight
} from './selectors';
import {
  updateDimensions
} from './actions';
import reducer from './reducer';

import HomePage from '../HomePage';
import GamesPage from '../GamesPage';
import NotFoundPage from '../NotFoundPage';

import ContentLoading from '../../components/ContentLoading';
import ContentError from '../../components/ContentError';

class App extends React.Component {
  componentDidMount() {
    window.addEventListener("resize", this.props.updateDimensions);

    // Get the user id from API
    /*if(!this.props.currentUser)
      this.props.loadUser();*/
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.props.updateDimensions);
  }

  render() {
    const {
      loading,
      loaded,
      error,
      currentUser,
      contentHeight
    } = this.props;
    let content = null;

    if(error) {
      content =  (<ContentError error={error}/>);
    } else if(loading) {
      content =  (<ContentLoading/>);
    } else if(loaded) {
      content = (
        <Switch>
          <Route exact path="/" component={GamesPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      );
    } else {
      // No user uuid yet
      content = (
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      );
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
                  variant="pills"
                  activeKey="games"
                  onSelect={selectedKey => alert(`selected ${selectedKey}`)}
                >
                  <Nav.Item key="games">
                    <Nav.Link eventKey="games">Games</Nav.Link>
                  </Nav.Item>
                  <Nav.Item key="about" style={{float: 'right'}}>
                    <Nav.Link eventKey="about">About</Nav.Link>
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

App.propTypes = {
  updateDimensions: PropTypes.func,

  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  error: PropTypes.string,
  currentUser: PropTypes.string,
  contentHeight: PropTypes.number,
};

const mapDispatchToProps = { updateDimensions };

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  loaded: makeSelectLoaded(),
  error: makeSelectError(),
  currentUser: makeSelectCurrentUser(),
  contentHeight: makeSelectContentHeight()
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
