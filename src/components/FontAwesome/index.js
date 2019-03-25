import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class FontAwesome extends React.Component {
  render() {
    const {
      name,
      brand,
    } = this.props;

    const classes = {};
    classes.fa = !brand;
    classes.fab = brand;
    classes['fa-'+name] = true;

    if(this.props.className)
      this.props.className.split(' ').map((classn) => {
        classes[classn] = true;
      });

    return (
      <i className={classNames(classes)}></i>
    );
  }
}

FontAwesome.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  brand: PropTypes.bool,
};

export default FontAwesome;
