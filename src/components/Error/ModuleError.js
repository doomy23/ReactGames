import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { get } from 'lodash';

import FontAwesome from '../FontAwesome';

class ModuleError extends React.Component {
  render() {
    const { error } = this.props;

    return (
      <div className={classNames("module--error")}>
        <h3>
          <FontAwesome name="exclamation-triangle"/>
          <span> Error {get(error, 'code', '')}!</span>
        </h3>
        <div>
          {get(error, 'message', 'An error occured, please try again')}
        </div>
      </div>
    );
  }
}

ModuleError.propTypes = {
  error: PropTypes.object
};

export default ModuleError;
