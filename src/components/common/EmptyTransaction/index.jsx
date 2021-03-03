import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const EmptyTransactions = ({ message }) => {
  return (
    <div className="empty-transactions__card">
      <p className="empty-transactions__message">{message}</p>
    </div>
  );
};

EmptyTransactions.propTypes = {
  message: PropTypes.string.isRequired,
};

export default EmptyTransactions;
