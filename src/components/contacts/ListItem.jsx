/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import Thumbnail from 'components/common/Thumbnail';
import TransactionsImage from 'assets/images/transactionsimage.png';
import ViewHistoryImage from 'assets/images/viewhistory2.png';
import ChatImage from 'assets/images/chat.png';
import DeleteContactImage from 'assets/images/deletecontact2.png';
import ContactInfoImage from 'assets/images/contactInfo2.png';
import EllipseMenu from 'components/common/EllipseOptions';
import { openChatList } from 'redux/actions/dashboard/dashboard';

import VerifiedIcon from 'assets/images/verified.png';

const ListItem = ({
  item,
  isSendingCash,
  setSendCashOpen,
  setDestinationContact,
  isSendingMoney,
  setSendMoneyOpen,
  setIsDeletingContact,
  setContact,
  setIsDetail,
}) => {
  const [hasError, setHasError] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const options = [
    {
      image: TransactionsImage,
      name: global.translate(
        isSendingCash ? 'Send cash' : 'Transfer Money',
        65,
      ),

      onClick: () => {
        setDestinationContact(item);
        if (isSendingCash) {
          setSendCashOpen(true);
          setSendMoneyOpen(false);
        }
        if (isSendingMoney) {
          setSendMoneyOpen(true);
          setSendCashOpen(false);
        }
        if (!isSendingMoney && !isSendingCash) {
          setSendMoneyOpen(true);
          setSendCashOpen(false);
        }
      },
    },
    {
      image: ViewHistoryImage,
      name: global.translate('View Transactions'),

      onClick: () => {
        history.push({
          pathname: '/transactions',
          search: '?ref=contact',
          state: {
            contact: item,
            isSendingCash,
          },
        });
      },
    },
    {
      image: ContactInfoImage,
      name: global.translate('Contact Info'),
      onClick: () => {
        setIsDetail(true);
      },
    },
    {
      image: DeleteContactImage,
      name: global.translate('Delete Contact'),
      onClick: () => {
        if (typeof setIsDeletingContact === 'function') {
          setIsDeletingContact(true);
        }
      },
    },
  ];
  return (
    <>
      {item && (
        <div
          onMouseEnter={() => {
            setContact(item);
          }}
          key={item.PictureURL}
          className="contact-item"
          onClick={() => {
            setContact(item);
            setDestinationContact(item);
            if (isSendingCash) {
              setSendCashOpen(true);
            } else {
              setSendMoneyOpen(true);
            }
          }}
        >
          <div className="image">
            <Thumbnail
              avatar={item.PictureURL || 'N/A'}
              name={item.FirstName || 'Unknown'}
              secondName={item.LastName || 'User'}
              style={{ height: 40, width: 40 }}
              hasError={hasError}
              setHasError={setHasError}
            />
          </div>
          <div className="texts">
            <p className="nametext">
              {`${item.FirstName || 'Unknown'} ${item.LastName ||
                'User'}`}
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
            </p>
            <span className="sub-text">
              {item.ContactPID || 'Individual'}
            </span>
          </div>

          <EllipseMenu
            options={
              !isSendingCash
                ? [
                    {
                      image: ChatImage,
                      name: global.translate('Chat'),
                      onClick: () => {
                        openChatList(dispatch);
                      },
                    },
                    ...options,
                  ]
                : options
            }
          />
        </div>
      )}
    </>
  );
};

ListItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  isSendingCash: PropTypes.bool,
  setSendCashOpen: PropTypes.bool,
  setDestinationContact: PropTypes.func,
  isSendingMoney: PropTypes.bool,
  setSendMoneyOpen: PropTypes.func,
  setIsDeletingContact: PropTypes.func,
  setContact: PropTypes.func,
  setIsDetail: PropTypes.func,
};

ListItem.defaultProps = {
  isSendingCash: false,
  setSendCashOpen: false,
  setIsDeletingContact: () => {},
  setContact: () => {},
  setIsDetail: () => {},
  setDestinationContact: () => {},
  isSendingMoney: false,
  setSendMoneyOpen: () => {},
};
export default ListItem;
