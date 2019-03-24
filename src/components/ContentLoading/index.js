import React from 'react';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';

import loaderGIF from '../../../static/img/loader.gif';

class ContentLoading extends React.Component {
  render() {
    return (
      <Row className={classNames("content--loading")}>
        <Col>
          <h1>
            Loading...
          </h1>
          <div>
            <img src={loaderGIF} alt="Please wait..."/>
          </div>
        </Col>
      </Row>
    );
  }
}

export default ContentLoading;
