import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({ item }) => {
  return (
    <>
      {item && (
        <div className="contact-item">
          <div className="image">thumbnail</div>
          <div className="texts">
            <p className="nametext">{`${item.FirstName ||
              'Unknown'} ${item.LastName || 'User'}`}</p>
            <p className="sub-text"> Individual</p>
          </div>
          <div className="icons">Image</div>
        </div>
      )}
    </>
  );
};
ListItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ListItem;
