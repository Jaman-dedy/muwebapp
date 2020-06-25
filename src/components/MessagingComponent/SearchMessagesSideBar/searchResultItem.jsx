import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';
import formatTime from 'utils/formatTime';

const SearchResultItem = ({ message }) => {
  return (
    <div className="searchItem">
      <small>{formatTime(message.createdAt)}</small>
      <div className="name-message">
        <strong>{message.owner}</strong>: {'  '}{' '}
        <span>
          {` `}
          {message.body}
        </span>
      </div>
      <hr />
    </div>
  );
};

SearchResultItem.propTypes = {
  message: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SearchResultItem;
