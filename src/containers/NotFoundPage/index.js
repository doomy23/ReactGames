import React from 'react';

import ContentError from '../../components/ContentError';

class NotFound extends React.Component {
  render() {
    const error = "The page your are trying to access was not found or you don't have the rights to see it."

    return (
      <ContentError error={error}/>
    );
  }
}

export default NotFound;
