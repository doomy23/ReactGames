import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { get } from 'lodash';

class ContentError extends React.Component {
  render() {
    const { error } = this.props;

    return (
      <Row className={classNames("content--error")}>
        <Col>
          <h1>
            <FontAwesome name='exclamation-triangle'/>
            Error {get(error, 'code', '')}!
          </h1>
          <div>
            {get(error, 'message', 'An error occured, please try again')}
          </div>
        </Col>
      </Row>
    );
  }
}

ContentError.propTypes = {
  error: PropTypes.object
};


export default ContentError;
