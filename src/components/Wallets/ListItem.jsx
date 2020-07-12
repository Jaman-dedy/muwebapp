import React from 'react';

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

export default ListItem;
