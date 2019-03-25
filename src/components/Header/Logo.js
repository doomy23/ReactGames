import React from 'react';
import { Row, Col } from 'react-bootstrap';

import logoPng from '../../../static/img/doomys-logo.png';

class Logo extends React.Component {
  render() {
    return (
      <h1 className="logo">
        <img src={logoPng} alt="D00MYsGames - A React.JS Multiplayer Games Platform Project"/>
      </h1>
    );
  }
}

export default Logo;
