/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import InfoIcon from 'assets/images/info-icon.svg';
import './style.scss';

const InfoMessage = ({ description, className, ...rest }) => {
  return (
    <div className={`info-message ${className}`} {...rest}>
      <Image src={InfoIcon} />
      <span>{description}</span>
    </div>
  );
};

InfoMessage.propTypes = {
  description: PropTypes.string,
  className: PropTypes.string,
};
InfoMessage.defaultProps = {
  description: '',
  className: '',
};

export default InfoMessage;
