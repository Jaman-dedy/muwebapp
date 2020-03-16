import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import rightIcon from 'assets/images/right-icon.png';
import leftIcon from 'assets/images/left-icon.png';
import './contacts.scss';
import Thumbnail from 'components/common/Thumbnail';
import LoaderComponent from 'components/common/Loader';
import Message from 'components/common/Message';

const MyContactList = ({
  allContacts,
  onItemClick,
  contacts,
  setDestinationContact,
  retryContacts,
}) => {
  const myWalletsRef = useRef(null);
  const onArrowRightClick = () => {
    myWalletsRef.current.scrollBy({
      top: 0,
      left: 400,
      behavior: 'smooth',
    });
  };

  const onArrowLeftClick = () => {
    myWalletsRef.current.scrollBy({
      top: 0,
      left: -400,
      behavior: 'smooth',
    });
  };

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
    <div>
      {allContacts && allContacts.loading && (
        <LoaderComponent
          loaderContent={global.translate('Working...')}
        />
      )}
      {allContacts.error && !allContacts.loading && (
        <Message
          message={
            allContacts.error.error
              ? global.translate(allContacts.error.error)
              : global.translate('Something went wrong')
          }
          action={{
            onClick: () => {
              retryContacts();
            },
          }}
        />
      )}

      {!allContacts.loading && contacts && contacts.length > 0 && (
        <div className="wallet-list">
          {contacts && contacts.length > 6 && (
            <Image
              src={leftIcon}
              width={16}
              className="arrow-image"
              role="button"
              onClick={() => onArrowLeftClick()}
            />
          )}
          <div className="wallet-list-container" ref={myWalletsRef}>
            {contacts &&
              contacts.map(item => (
                <div
                  className="wallet"
                  key={item.ContactPID}
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => null}
                  onClick={e => {
                    onItemClick(e, item);
                    setDestinationContact(item);
                  }}
                >
                  <Thumbnail
                    avatar={item.PictureURL}
                    name={item.FirstName}
                    secondName={item.LastName}
                    style={{ height: 75, width: 75 }}
                  />
                  <p className="user-name">
                    {getFullName(item) && getFullName(item).length > 7
                      ? `${getFullName(item) &&
                          getFullName(item).substring(0, 7)}...`
                      : getFullName(item)}
                  </p>
                </div>
              ))}
          </div>
          {contacts && contacts.length > 6 && (
            <Image
              src={rightIcon}
              role="button"
              className="arrow-image"
              width={16}
              onClick={() => onArrowRightClick()}
            />
          )}
        </div>
      )}

      {!allContacts.loading && contacts && contacts.length === 0 && (
        <Message message={global.translate('No Contacts Found')} />
      )}
    </div>
  );
};

MyContactList.propTypes = {
  allContacts: PropTypes.objectOf(PropTypes.any).isRequired,
  onItemClick: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.any),
  setDestinationContact: PropTypes.func.isRequired,
};

MyContactList.defaultProps = {
  contacts: [],
};

export default MyContactList;
