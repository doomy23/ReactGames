import React from 'react';
import {
  Row,
  Col
} from 'react-bootstrap';

import UserModule from '../UserModule';
import OnlineModule from '../OnlineModule';

class GamesPage extends React.Component {
  render() {
    return (
      <Row>
        <Col id="games" md={8}>
          <h1>Games</h1>

        </Col>
        <Col md={4}>
          <Row>
            <UserModule/>
            <OnlineModule/>
            <Col id="chat" xs={12}>
              <h2>Chat</h2>

            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default GamesPage;
