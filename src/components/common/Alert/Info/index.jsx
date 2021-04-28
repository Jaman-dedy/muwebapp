import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const Info = ({ message }) => {
  return <div className="alert-info-container">{message}</div>;
};

Info.propTypes = {
  message: PropTypes.string,
};

Info.defaultProps = {
  message: '',
};

export default Info;
