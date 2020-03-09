import React from 'react';
<<<<<<< HEAD
import PropTypes from 'prop-types';
import LoaderComponent from 'components/common/Loader';
import Message from 'components/common/Message';
import Thumbnail from 'components/common/Thumbnail';

import './RecentlyContacted.scss';

const RecentlyContactedItems = React.memo(
  ({ items: { data, loading, error }, getRecentContacts }) => {
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
          {loading && (
            <LoaderComponent
              loaderContent={global.translate('Working…', 412)}
            />
          )}
        </div>
        <div className="recently-contacted">
          <p className="title">
            People you’ve recently transact with{' '}
          </p>
          {data &&
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
=======
import { Image } from 'semantic-ui-react';
import './RecentlyContacted.scss';

const RecentlyContacted = () => {
  const items = [
    {
      name: 'Alberto Olympio',
      image:
        'https://media-exp1.licdn.com/dms/image/C5603AQHYtol3mLRtEg/profile-displayphoto-shrink_200_200/0?e=1586390400&v=beta&t=1CIHHScBj2lv6BPEAvxAjF3-7L8qqVWfKD9PslL4oIE',
    },
    {
      name: 'Trevor Noah',
      image:
        'https://celinemoneypicfiles.blob.core.windows.net/zones/SUO.png',
    },
    {
      name: 'Amanda Kayle',
      image:
        'https://celinemoneypicfiles.blob.core.windows.net/zones/AMANDA.png',
    },
    {
      name: 'Johnathan Rwabahizi',
      image:
        'data:image/jpeg;base64,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',
    },
  ];
  return (
    <div className="recently-contacted">
      <p className="title">People you’ve recently transact with</p>
      {items.map(item => (
        <div className="item" key={item.image}>
          <Image
            src={item.image}
            height={95}
            circular
            className="backIcon"
          />
          <p className="username">{item.name.substring(0, 10)}</p>
        </div>
      ))}
    </div>
  );
};

export default RecentlyContacted;
>>>>>>> send vouchers required data
