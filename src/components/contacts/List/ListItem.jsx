/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { Image, Icon } from 'semantic-ui-react';
import Thumbnail from 'components/common/Thumbnail';
import './optionItems.scss';
import EllipseMenu from 'components/common/EllipseOptions';
import Logo from 'assets/images/logo.png';
import VerifiedIcon from 'assets/images/verified.png';

const ListItem = ({ item, onItemClick, moreOptions }) => {
  return (
    <>
      {item && (
        <div
          key={item.PictureURL}
          className="contact-item"
          onClick={() => onItemClick(item)}
        >
          <div className="left">
            <Thumbnail
              avatar={item.PictureURL || 'N/A'}
              showOne
              name={item.FirstName || 'Unknown'}
              secondName={item.LastName || 'User'}
              style={{
                height: 49,
                width: 49,
                borderRadius: '50% !important',
              }}
            />
            <div>
              <h4 className="nametext">
                {`${item.FirstName || 'Unknown'} ${item.LastName ||
                  'User'}`}{' '}
                {item.AccountVerified === 'YES' && (
                  <span title={global.translate('Account verified')}>
                    <Image
                      src={VerifiedIcon}
                      height={15}
                      style={{ display: 'inline' }}
                      width={15}
                      className="user-verified-icon"
                    />
                  </span>
                )}
              </h4>
              <div className="sub-text">
                {item.ContactPID ? (
                  <>
                    <Image inline src={Logo} height={15} /> &nbsp;
                    {item.ContactPID}
                  </>
                ) : (
                  <>
                    <Icon
                      className="phone-icon"
                      name="phone square"
                    />
                    <span>{item.PhoneNumber}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="right">
            <EllipseMenu options={moreOptions} currentItem={item} />
          </div>
        </div>
      )}
    </>
  );
};

ListItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
};

ListItem.defaultProps = {};
export default ListItem;
