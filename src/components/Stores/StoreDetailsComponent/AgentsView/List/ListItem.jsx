/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image, Icon } from 'semantic-ui-react';
import Thumbnail from 'components/common/Thumbnail';
import './optionItems.scss';
import { useSelector, useDispatch } from 'react-redux';

import Logo from 'assets/images/logo.png';
import VerifiedIcon from 'assets/images/verified.png';
import ConfirmModal from 'components/common/ConfirmModal';

const ListItem = ({
  item,
  onItemClick,
  moreOptions,
  isModalOpened,
  setIsModalOpened,
  onDelete,
  thisItem,
}) => {
  const [hasError, setHasError] = useState(false);

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
              hasError={hasError}
              setHasError={setHasError}
            />
            <div>
              <h4 className="nametext">
                {`${item.FirstName || 'Unknown'} ${item.LastName ||
                  'User'}`}{' '}
                {item.AccountVerified === 'YES' && (
                  <span
                    title={global.translate('Account verified', 1458)}
                  >
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
            <Icon
              name="trash alternate outline"
              size="large"
              style={{ color: '#202124' }}
              onClick={() => {
                setIsModalOpened(true);
              }}
            />
          </div>

          <ConfirmModal
            close={() => setIsModalOpened(false)}
            isOpened={isModalOpened}
            onClickYes={onDelete}
            onClickNo={() => {
              setIsModalOpened(false);
            }}
            message={`${global.translate('Remove', 415)}  ${
              thisItem.FirstName
            } ${thisItem.LastName} ?`}
          />
        </div>
      )}
    </>
  );
};

ListItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  onDelete: PropTypes.func,
  thisItem: PropTypes.objectOf(PropTypes.any),
};

ListItem.defaultProps = {
  onDelete: () => {},
  thisItem: {},
};
export default ListItem;
