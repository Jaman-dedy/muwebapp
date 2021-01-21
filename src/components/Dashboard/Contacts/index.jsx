/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import './index.scss';
import FavoriteContactsPlaceholder from 'assets/images/contacts-placeholder.svg';
import CreateContact from 'assets/images/create-contact.svg';
import Thumbnail from 'components/common/Thumbnail';
import useWindowSize from 'utils/useWindowSize';

const Contacts = ({ favoriteContacts, loadingFavoriteContacts }) => {
  const { width } = useWindowSize();
  const slides = width > 1024 ? 4 : 3;
  return (
    <>
      {favoriteContacts && (
        <div className="wrap__contacts">
          <Slider
            infinite={false}
            slidesToScroll={slides}
            slidesToShow={slides}
          >
            <div className="one-contact">
              <Link to="/contacts?add=true">
                <img src={CreateContact} />
                <div>{global.translate(`Add`, 112)}</div>
              </Link>
            </div>
            {favoriteContacts &&
              favoriteContacts?.[0]?.ContactsFound !== 'NO' &&
              favoriteContacts.map(
                ({ FirstName, LastName, PictureURL, ContactPID }) => (
                  <div className="one-contact">
                    <Link
                      to={`/contacts?ref=send-money&PID=${ContactPID}`}
                    >
                      <Thumbnail
                        name={FirstName}
                        secondName={LastName}
                        circular
                        avatar={PictureURL}
                        width={34}
                        height={34}
                      />
                      <div>{FirstName}</div>
                    </Link>
                  </div>
                ),
              )}
          </Slider>
        </div>
      )}
      {loadingFavoriteContacts && (
        <div className="animate-placeholder">
          <img src={FavoriteContactsPlaceholder} />
        </div>
      )}
    </>
  );
};
Contacts.propTypes = {};
export default Contacts;
