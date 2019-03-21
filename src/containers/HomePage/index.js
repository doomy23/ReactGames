import React from 'react';

import AppWrapper from '../App/wrapper';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppWrapper>
        <article>
          <h1>
            Accueil
          </h1>
        </article>
      </AppWrapper>
    );
  }
}

export default HomePage;
