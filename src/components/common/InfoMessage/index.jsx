import React from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import InfoIcon from 'assets/images/info-icon.svg';
import './style.scss';

const InfoMessage = ({ description }) => {
  return (
    <div className="info-message">
      <Image src={InfoIcon} />
      <span>{description}</span>
    </div>
  );
};

InfoMessage.propTypes = {
  description: PropTypes.string,
};
InfoMessage.defaultProps = {
  description: '',
};

export default InfoMessage;
