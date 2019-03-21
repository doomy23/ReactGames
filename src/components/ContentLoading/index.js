import React from 'react';
import { Row, Col } from 'react-bootstrap';

class ContentLoading extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row>
        <Col>
          Loading...
        </Col>
      </Row>
    );
  }
}

export default ContentLoading;
