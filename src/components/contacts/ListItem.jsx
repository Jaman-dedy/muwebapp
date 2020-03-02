import React from 'react';
import { Image, Dropdown, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Thumbnail from 'components/common/Thumbnail';
import TransactionsImage from 'assets/images/transactions.png';
import ViewHistoryImage from 'assets/images/viewhistory2.png';
import DeleteContactImage from 'assets/images/deletecontact2.png';
import ContactInfoImage from 'assets/images/contactInfo2.png';
import './optionItems.scss';

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
            <p className="nametext">{`${item.FirstName ||
              'Unknown'} ${item.LastName || 'User'}`}</p>
            <p className="sub-text"> Individual</p>
          </div>

          <div className="icons">
            <Dropdown
              icon={
                <Icon name="ellipsis vertical" size="large" link />
              }
            >
              <Dropdown.Menu
                className="options"
                style={{
                  marginLeft: -245,
                  marginTop: -40,
                  width: 240,
                  padding: '10px 0px',
                }}
              >
                {[
                  {
                    image: TransactionsImage,
                    name: global.translate('Send Money', 65),
                  },
                  {
                    image: ViewHistoryImage,
                    name: global.translate('View History'),
                  },
                  {
                    image: ContactInfoImage,
                    name: global.translate('Contact Info'),
                  },
                  {
                    image: DeleteContactImage,
                    name: global.translate('Delete Contact'),
                  },
                ].map(item => (
                  <div className="innerOptions">
                    <Image
                      src={item.image}
                      height={20}
                      className="iconItem"
                    />
                    <p className="itemName">{item.name}</p>
                  </div>
                ))}
              </Dropdown.Menu>
            </Dropdown>
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
