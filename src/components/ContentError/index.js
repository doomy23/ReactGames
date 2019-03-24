import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

class ContentError extends React.Component {
  render() {
    return (
      <Row className={classNames("content--error")}>
        <Col>
          <h1>
            <FontAwesome name='exclamation-triangle'/>
            Error !
          </h1>
          <div>
            {this.props.error}
          </div>
        </Col>
      </Row>
    );
  }
}

ContentError.propTypes = {
  error: PropTypes.string
};


export default ContentError;
