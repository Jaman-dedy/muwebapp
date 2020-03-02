import React from 'react';
import { Image } from 'semantic-ui-react';

const ListItem = ({ item }) => {
  return (
    <>
      {item && (
        <div className="contact-item">
          <div className="image">
            thumbnail
            {/*   <Thumbnail
              avatar={item.PictureURL || 'N/A'}
              name={item.FirstName || 'Unknown'}
              secondName={item.LastName || 'User'}
            /> */}
          </div>
          <div className="texts">
            <p className="nametext">{`${item.FirstName ||
              'Unknown'} ${item.LastName || 'User'}`}</p>
            <p className="sub-text"> Individual</p>
          </div>
          <div className="icons">
            Image
            {/* <Image
              height={18}
              src={EllipseBlack}
              className="iconItem"
            /> */}
          </div>
        </div>
      )}
    </>
  );
};

export default ListItem;
