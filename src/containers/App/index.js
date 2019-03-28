import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Route, Switch, NavLink } from 'react-router-dom';

import {
  makeSelectLoading,
  makeSelectLoaded,
  makeSelectError,
  makeSelectContentHeight,
  makeSelectLocation,
} from './selectors';
import {
  updateDimensions
} from './actions';

import {
  HOME_PATH,
  ABOUT_PATH,
} from '../../utils/routes';

import HomePage from '../HomePage';
import GamesPage from '../GamesPage';
import AboutPage from '../AboutPage';
import NotFoundPage from '../NotFoundPage';

import FontAwesome from '../../components/FontAwesome';
import ContentLoading from '../../components/Loading/ContentLoading';
import ContentError from '../../components/Error/ContentError';

class App extends React.Component {
  componentDidMount() {
    window.addEventListener("resize", this.props.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.props.updateDimensions);
  }

  render() {
    const {
      loading,
      loaded,
      error,
      contentHeight,
      location
    } = this.props;

    let content = null;
    const contentProps = {
      id: 'content',
      style: {
        height: contentHeight - 41
      }
    };

    if(error) {
      content =  (<ContentError error={error}/>);
    } else if(loading) {
      content =  (<ContentLoading/>);
    } else if(loaded) {
      content = (
        <Switch>
          <Route exact path={HOME_PATH} component={GamesPage} />
          <Route exact path={ABOUT_PATH} component={AboutPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      );
    } else {
      // No user uuid yet
      content = (
        <Switch>
          <Route exact path={HOME_PATH} component={HomePage} />
          <Route exact path={ABOUT_PATH} component={AboutPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      );
    }

    return (
      <React.Fragment>
        <header>
          <Container>
            <Row>
              <Col>
                <Nav variant="pills">
                  <Nav.Item>
                    <NavLink exact to={HOME_PATH} className="nav-link">
                      Games
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item style={{float: 'right'}}>
                    <NavLink exact to={ABOUT_PATH} className="nav-link">
                      About
                      <FontAwesome name="info-circle"/>
                    </NavLink>
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
  error: PropTypes.object,
  contentHeight: PropTypes.number,
  location: PropTypes.object,
};

const mapDispatchToProps = { updateDimensions };

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  loaded: makeSelectLoaded(),
  error: makeSelectError(),
  contentHeight: makeSelectContentHeight(),
  location: makeSelectLocation(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
