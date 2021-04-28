/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import dangerIcon from 'assets/images/microloan/danger-icon.svg';
import './style.scss';

const DangerMessage = ({ description, className, ...rest }) => {
  return (
    <div className={`info-message-danger ${className}`} {...rest}>
      <Image src={dangerIcon} />
      <span>{description}</span>
    </div>
  );
};

DangerMessage.propTypes = {
  description: PropTypes.string,
  className: PropTypes.string,
};
DangerMessage.defaultProps = {
  description: '',
  className: '',
};

export default DangerMessage;
