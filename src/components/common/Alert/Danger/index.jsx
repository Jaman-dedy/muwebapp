import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const AlertDanger = ({ message }) => {
  return <div className="alert-danger-container">{message}</div>;
};

AlertDanger.propTypes = {
  message: PropTypes.string,
};

AlertDanger.defaultProps = {
  message: '',
};

export default AlertDanger;
