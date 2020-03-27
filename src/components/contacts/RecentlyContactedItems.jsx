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
    isSendingMoney,
    setSendMoneyOpen,
  }) => {
    const userData =
      data &&
      data
        .filter(item => item !== null)
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
          {error && !error[0] && (
            <Message
              message={
                error.error
                  ? global.translate(error.error)
                  : 'Something went wrong loading your recent contacts'
              }
              action={{
                onClick: () => {
                  getRecentContacts();
                },
              }}
            />
          )}

          {error && error[0] && (
            <Message
              error={false}
              message={
                error[0].Description ===
                'No Transaction found for this period.'
                  ? global.translate(
                      'No Transaction found for this period.',
                    )
                  : global.translate(
                      'Something went wrong loading your recent contacts',
                    )
              }
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
          {loading && (
            <LoaderComponent
              loaderContent={global.translate('Working…', 412)}
            />
          )}
        </div>
        <div className="image-container">
          {!error &&
            userData &&
            userData.length !== 0 &&
            userData.map((item, index) => (
              <div
                key={index.toString()}
                className="item"
                key={item.image}
                onClick={
                  isSendingCash || isSendingMoney
                    ? () => {
                        setDestinationContact(item);

                        isSendingCash
                          ? setSendCashOpen(true)
                          : setSendMoneyOpen(true);
                      }
                    : null
                }
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
