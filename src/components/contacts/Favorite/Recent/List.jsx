/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon, Image } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import Message from 'components/common/Message';
import Thumbnail from 'components/common/Thumbnail';
import './style.scss';
import useWindowSize from 'utils/useWindowSize';
import LoadFavorite from 'assets/images/contacts/loadFavorite.svg';

const RecentlyContactedItems = React.memo(
  ({ items: { data, loading, error }, retryFn, onItemClick }) => {
    const { width } = useWindowSize();

    const { isSendingMoney } = useSelector(
      state => state.dashboard.contactActions,
    );
    const [hasError, setHasError] = useState(false);

    const toShowIconsCheck = (items = []) => {
      if (isSendingMoney) {
        const items =
          data &&
          data.filter(contact => contact.ContactType === 'INTERNAL');
        if (items) {
          return width < 700 || items.length > 4;
        }
        return false;
      }
      if (items) {
        return width < 700 || items.length > 4;
      }
      return false;
    };

    const showScrollIcons = () => toShowIconsCheck(data) && !loading;

    const userFavorites1 =
      data &&
      data.map(({ ContactPID, ...rest }) => {
        return {
          Favorite: 'YES',
          ContactPID,
          ...rest,
          ContactType: ContactPID ? 'INTERNAL' : 'EXTERNAL',
        };
      });
    const userFavorites = isSendingMoney
      ? userFavorites1 &&
        userFavorites1.filter(item => item.ContactPID)
      : userFavorites1;

    const listContainerRef = useRef(null);

    const onArrowRightClick = () => {
      listContainerRef.current.scrollBy({
        top: 0,
        left: 200,
        behavior: 'smooth',
      });
    };

    const onArrowLeftClick = () => {
      listContainerRef.current.scrollBy({
        top: 0,
        left: -200,
        behavior: 'smooth',
      });
    };

    return (
      <>
        <div className="slide-container">
          {showScrollIcons() && (
            <Icon
              onClick={onArrowLeftClick}
              disabled={data && data.length < 3}
              className="prevNextIcon"
              name="caret left"
              size="big"
            />
          )}
          <div className="items-container" ref={listContainerRef}>
            {error && (
              <Message
                style={{ flex: 1 }}
                action={{
                  onClick: () => {
                    retryFn();
                  },
                }}
                message={
                  error[0]
                    ? global.translate(error[0].Description)
                    : global.translate(error.error, 162)
                }
              />
            )}
            {loading && !data && !error ? (
              <Image
                src={LoadFavorite}
                className="animate-placeholder"
              />
            ) : (
              userFavorites &&
              userFavorites
                .filter(item => item.PictureURL)
                .map(user => (
                  <div
                    key={user.PictureURL}
                    className="single-item-container"
                    onClick={() => onItemClick(user)}
                  >
                    <Thumbnail
                      circular
                      height={75}
                      width={75}
                      className="userpic"
                      style={{
                        height: 75,
                        width: 75,
                        fontSize: 27,
                        margin: 'auto',
                      }}
                      avatar={user.PictureURL}
                      name={user.FirstName}
                      secondName={user.LastName}
                      alt={user.FirstName}
                      hasError={hasError}
                      setHasError={setHasError}
                    />
                    <p className="single-line username">
                      {`${user.FirstName} ${user.LastName}`}
                    </p>
                  </div>
                ))
            )}
          </div>
          {showScrollIcons() && (
            <Icon
              onClick={onArrowRightClick}
              disabled={Array.isArray(data) && data.length < 3}
              className="prevNextIcon"
              name="caret right"
              size="big"
            />
          )}
        </div>
      </>
    );
  },
);

RecentlyContactedItems.propTypes = {
  items: PropTypes.objectOf(PropTypes.any).isRequired,
  retryFn: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default RecentlyContactedItems;
