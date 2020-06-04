import React from 'react';
import PropTypes from 'prop-types';
import LoaderComponent from 'components/common/Loader';
import Message from 'components/common/Message';
import Thumbnail from 'components/common/Thumbnail';

import './RecentlyContacted.scss';

const RecentlyContactedItems = React.memo(
  ({ items: { data, loading, error }, retryFetch }) => {
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
                  : global.translate(
                      'Something went wrong loading your recent contacts',
                    )
              }
              action={{
                onClick: () => {
                  retryFetch();
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
          {loading && (
            <LoaderComponent
              loaderContent={global.translate('Working…', 412)}
            />
          )}
        </div>
        <div className="recently-contacted">
          <p className="title">
            People you’ve recently transact with
          </p>

          {data &&
            Array.isArray(data) &&
            data.map(item => (
              <div className="item" key={item.image}>
                <Thumbnail
                  avatar={item.PictureURL}
                  style={{ height: 95, width: 95 }}
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
};

export default RecentlyContactedItems;
