/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Thumbnail from 'components/common/Thumbnail';
import TransactionsImage from 'assets/images/transactionsimage.png';
import ViewHistoryImage from 'assets/images/viewhistory2.png';
import ChatImage from 'assets/images/chat.png';
import DeleteContactImage from 'assets/images/deletecontact2.png';
import ContactInfoImage from 'assets/images/contactInfo2.png';
import './optionItems.scss';
import EllipseMenu from 'components/common/EllipseOptions';

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
  const history = useHistory();
  const options = [
    {
      image: TransactionsImage,
      name: global.translate(
        isSendingCash ? 'Send Cash' : 'Send Money',
        65,
      ),

      onClick: () => {
        setDestinationContact(item);
        if (isSendingCash) {
          setSendCashOpen(true);
        }
        if (isSendingMoney) {
          setSendMoneyOpen(true);
        }
        if (!isSendingMoney && !isSendingCash) {
          setSendMoneyOpen(true);
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
        setContact(item);
      },
    },
    {
      image: DeleteContactImage,
      name: global.translate('Delete Contact'),
      onClick: () => {
        if (typeof setIsDeletingContact === 'function') {
          setIsDeletingContact(true);
          setContact(item);
        }
      },
    },
  ];
  return (
    <>
      {item && (
        <div
          key={item.PictureURL}
          className="contact-item"
          onClick={() => {
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
          <EllipseMenu
            options={
              !isSendingCash
                ? [
                    {
                      image: ChatImage,
                      name: global.translate('Chat'),
                      onClick: () => {
                        setContact(item);
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
