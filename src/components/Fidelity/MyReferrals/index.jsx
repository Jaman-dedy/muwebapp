import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { Image, Pagination, Input } from 'semantic-ui-react';
import { Input, Message } from 'semantic-ui-react';

import Pagination from 'components/common/Pagination';
import Loader from 'components/common/Loader';
import ContactItem from './ListItem';

import './MyReferrals.scss';

const MyReferrals = ({ referrals }) => {
  const { data, error, loading } = referrals;
  const [contactsToShow, setContactsToShow] = useState([]);
  const [allContacts, setAllContacts] = useState(data || []);
  const [refereesCount, setRefereesCount] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  const onPageChange = itemsToShow => {
    setContactsToShow(itemsToShow);
  };

  useEffect(() => {
    if (data) {
      setAllContacts(data);
      setRefereesCount(data.length);
      let points = 0;
      data.forEach(({ Points }) => {
        points += Number(Points) || 0;
      });
      setTotalPoints(points);
    }
  }, [data]);

  const handleKeyUp = e => {
    e.persist();
    const search = e.target.value;
    if (search.trim().length > 0) {
      const found = data.filter(
        item =>
          (item.FirstName &&
            item.FirstName.toLowerCase().startsWith(
              search.toLowerCase(),
            )) ||
          (item.LastName &&
            item.LastName.toLowerCase().startsWith(
              search.toLowerCase(),
            )) ||
          (item.PhoneNumber &&
            item.PhoneNumber.toLowerCase().startsWith(
              search.toLowerCase(),
            )) ||
          (item.ContactPID &&
            item.ContactPID.toLowerCase().startsWith(
              search.toLowerCase(),
            )),
      );
      setAllContacts(found);
    } else {
      setAllContacts(data);
    }
  };

  return (
    <div className="referrals-container">
      <div className="referrals-search">
        <div className="referral-status">
          <div>
            <span>{global.translate('Referees count')}: </span>
            <span className="count">{refereesCount}</span>
          </div>
          <div>
            <span>{global.translate('Total points')}: </span>
            <span className="count">{totalPoints}</span>
          </div>
        </div>
        {data && data[0] && data[0].ContactsFound !== 'NO' && (
          <Input
            icon="search"
            iconPosition="left"
            placeholder={global.translate('Search', 278)}
            onKeyUp={handleKeyUp}
            className="searchField"
          />
        )}
      </div>
      {!loading && allContacts.length === 0 && (
        <Message
          message={global.translate('No contacts found')}
          error={false}
        />
      )}
      {data && data[0] && data[0].Error && (
        <Message
          message={global.translate(data[0].Description)}
          error={false}
        />
      )}
      <div className="contact-list">
        {!error && (
          <>
            {loading && (
              <Loader
                loaderContent={global.translate('Working...', 412)}
              />
            )}
            {contactsToShow
              .filter(item => !item.Error)
              .map(item => (
                <ContactItem item={item} key={item.PictureURL} />
              ))}
          </>
        )}
      </div>
      {!loading && !error && (
        <Pagination
          data={allContacts}
          onPageChange={onPageChange}
          itemsPerPage={5}
        />
      )}
    </div>
  );
};

MyReferrals.propTypes = {
  referrals: PropTypes.instanceOf(Object).isRequired,
};

MyReferrals.defaultProps = {};

export default MyReferrals;
