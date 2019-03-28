import React from 'react';

import ContentError from '../../components/Error/ContentError';

class NotFound extends React.Component {
  render() {
    const error = {
      code: 404,
      message: "The page your are trying to access was not found or you don't have the rights to see it"
    };

    return (
      <ContentError error={error}/>
    );
  }
}

export default NotFound;
