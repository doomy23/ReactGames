import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

class ContentError extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row>
        <Col>
          {this.props.error}
        </Col>
      </Row>
    );
  }
}

ContentError.propTypes = {
  error: PropTypes.string
};


export default ContentError;
