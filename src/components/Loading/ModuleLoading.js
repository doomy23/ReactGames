import React from 'react';
import classNames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import FontAwesome from '../FontAwesome';

class ModuleLoading extends React.Component {
  render() {
    return (
      <div className={classNames("module--loading")}>
        <h3>
          Loading...
        </h3>
        <div>
          <FontAwesome name="sync"/>
        </div>
      </div>
    );
  }
}

export default ModuleLoading;
