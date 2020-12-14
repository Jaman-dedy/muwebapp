/* eslint-disable */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

import FavoriteContactsPlaceholder from 'assets/images/contacts-placeholder.svg';
import CreateContact from 'assets/images/create-contact.svg';
import Thumbnail from 'components/common/Thumbnail';
const Contacts = ({ favoriteContacts, loadingFavoriteContacts }) => {
  return (
    <>
      {favoriteContacts && (
        <div className="wrap-contacts">
          <div className="one-contact">
            <Link to="/contacts?add=true">
              <img src={CreateContact} />
              <div>{global.translate(`Add`, 112)}</div>
            </Link>
          </div>
          {favoriteContacts && favoriteContacts?.[0]?.ContactsFound !== 'NO' &&
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
                    <div>
                      {FirstName}
                    </div>
                  </Link>
                </div>
              ),
            )}
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
