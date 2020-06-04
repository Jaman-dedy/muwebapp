import React from 'react';
import PropTypes from 'prop-types';
import Thumbnail from 'components/common/Thumbnail';
import './optionItems.scss';

const ListItem = ({ item }) => {
  return (
    <>
      {item && (
        <div key={item.PictureURL} className="contact-item">
          <div className="image">
            <Thumbnail
              avatar={item.PictureURL || 'N/A'}
              name={item.FirstName || 'Unknown'}
              secondName={item.LastName || 'User'}
              style={{ height: 40, width: 40 }}
            />
          </div>
          <div className="texts">
            <p className="nametext">{`${item.FirstName ||
              'Unknown'} ${item.LastName || 'User'}`}</p>
            <small className="sub-text">
              {' '}
              {item.ContactPID || 'Individual'}
            </small>
          </div>
        </div>
      )}
    </>
  );
};

ListItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ListItem;
