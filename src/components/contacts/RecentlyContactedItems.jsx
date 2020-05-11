/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-expressions */
import React from 'react';
import PropTypes from 'prop-types';
import LoaderComponent from 'components/common/Loader';
import Message from 'components/common/Message';
import Thumbnail from 'components/common/Thumbnail';

const RecentlyContactedItems = React.memo(
  ({
    items: { data, loading, error },
    getRecentContacts,
    isSendingCash,
    setSendCashOpen,
    setDestinationContact,
    setSendMoneyOpen,
  }) => {
    const userData =
      data &&
      data
        .filter(item => item && item.FirstName)
        .map(({ DestPhoneNum = '', ...rest }) => {
          return { PhoneNumber: DestPhoneNum, ...rest };
        });

    const getFullName = data => {
      if (data.FirstName === '' && data.LastName === '') {
        if (data.ContactPID !== '') {
          return data.ContactPID;
        }
        return 'No Name';
      }
      return `${data.FirstName}  ${data.LastName}`;
    };
    return (
      <>
        <div className="errorLoaderSection">
          {loading && (
            <LoaderComponent
              loaderContent={global.translate('Working…', 412)}
            />
          )}
          {userData && userData.length === 0 && (
            <Message
              error={false}
              message={global.translate(
                'No Transaction found for this period.',
              )}
            />
          )}
          {error && (
            <Message
              action={{
                onClick: () => {
                  getRecentContacts();
                },
              }}
              message={
                error[0]
                  ? global.translate(error[0].Description)
                  : global.translate(error.error, 162)
              }
            />
          )}
        </div>

        <div className="image-container">
          {!loading &&
            data &&
            data[0] &&
            !data[0].Error &&
            userData &&
            userData.length !== 0 &&
            userData.map((item, index) => (
              <div
                key={index.toString()}
                className="item"
                onClick={() => {
                  setDestinationContact(item);
                  if (isSendingCash) {
                    setSendCashOpen(true);
                  } else {
                    setSendMoneyOpen(true);
                  }
                }}
              >
                <Thumbnail
                  avatar={item.PictureURL}
                  height={75}
                  style={{ height: 75, width: 75 }}
                  name={
                    // eslint-disable-next-line no-nested-ternary
                    item.FirstName !== ''
                      ? item.FirstName
                      : item.ContactPID !== ''
                      ? item.ContactPID
                      : 'No Name'
                  }
                  secondName={
                    item.LastName !== ''
                      ? item.LastName
                      : 'No Name set'
                  }
                  circular
                  className="userpic"
                />
                <p className="username">
                  {getFullName(item) && getFullName(item).length > 10
                    ? `${getFullName(item) &&
                        getFullName(item).substring(0, 10)}...`
                    : getFullName(item)}
                </p>
              </div>
            ))}
        </div>
      </>
    );
  },
);

RecentlyContactedItems.propTypes = {
  items: PropTypes.objectOf(PropTypes.any).isRequired,
  getRecentContacts: PropTypes.func.isRequired,
  isSendingCash: PropTypes.bool.isRequired,
  setSendCashOpen: PropTypes.func.isRequired,
  setDestinationContact: PropTypes.func.isRequired,
  isSendingMoney: PropTypes.bool.isRequired,
  setSendMoneyOpen: PropTypes.func.isRequired,
};

export default RecentlyContactedItems;
