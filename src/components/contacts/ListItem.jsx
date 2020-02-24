import React from 'react';
import { Image } from 'semantic-ui-react';
import EllipseBlack from 'assets/images/elipse_black.png';
import Thumbnail from 'components/common/Thumbnail';

const ListItem = ({ item }) => {
  return (
    <>
      {item && (
        <div className="contact-item">
          <div className="image">
            <Thumbnail
              avatar={item.PictureURL || 'N/A'}
              name={item.FirstName || 'Unknown'}
              secondName={item.LastName || 'User'}
            />
          </div>
          <div className="texts">
            <p className="nametext">{`${item.FirstName || 'Unknown'} ${item.LastName || 'User'}`}</p>
            <p className="sub-text"> Individual</p>
          </div>
          <div className="icons">
            <Image
              height={18}
              src={EllipseBlack}
              className="iconItem"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ListItem;
