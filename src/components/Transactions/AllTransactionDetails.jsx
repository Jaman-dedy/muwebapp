import React from 'react';
import { List, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Thumbnail from 'components/common/Thumbnail';
import countries from 'utils/countries';
import formatNumber from 'utils/formatNumber';

const AllTransactionDetails = ({ item, language }) => {
  const setCountry = item => {
    if (!item) return '';

    if (!item.ContactCountryCode) return '';
    if (item.ContactCountryCode === '') return '';

    if (!Array.isArray(countries)) return '';

    return countries.find(
      country =>
        country.key &&
        country.key.toUpperCase() === item.ContactCountryCode,
    ).text;
  };

  return (
    <div
      className="transaction-detail"
      style={{
        width: '300px',
        fontFamily: 'Montserrat',
      }}
    >
      <div
        className="section-head"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Thumbnail
          style={{
            height: 75,
            width: 75,
            borderRadius: '50%',
          }}
          name={
            item.ContactFirstName ? item.ContactFirstName : 'No Name'
          }
          secondName={
            item.ContactLastName ? item.ContactLastName : 'No Name'
          }
          size="mini"
          avatar={item.ContactPictureURL}
        />
        <p className="sub-title">
          {item.ContactFirstName} {item.ContactLastName}
        </p>
      </div>

      <List divided>
        <List.Item className="list-item-wrapper">
          <List.Content className="list-item-content">
            {global.translate('Amount', 116)}
          </List.Content>
          <List.Content className="list-item-right">
            <Image
              avatar
              style={{
                borderRadius: 0,
                maxHeight: 16,
                width: 18,
                marginBottom: 3,
              }}
              src={item.SourceCurrencyFlag}
            />{' '}
            {formatNumber(item.Amount, {
              locales: language,
            })}
          </List.Content>
        </List.Item>

        <List.Item className="list-item-wrapper">
          <List.Content className="list-item-content">
            {global.translate('Transfer Date')}
          </List.Content>
          <List.Content className="list-item-right">
            {' '}
            {item.Date}
          </List.Content>
        </List.Item>
        <List.Item className="list-item-wrapper">
          <List.Content className="list-item-content">
            {global.translate('Phone number', 13)}
          </List.Content>
          <List.Content className="list-item-right">
            {item.ContactPhone}
          </List.Content>
        </List.Item>

        <List.Item className="list-item-wrapper">
          <List.Content className="list-item-content">
            {global.translate('Email')}
          </List.Content>
          <List.Content className="list-item-right">
            {item.ContactEmail}
          </List.Content>
        </List.Item>

        <List.Item className="list-item-wrapper">
          <List.Content className="list-item-content">
            {global.translate('Country', 275)}
          </List.Content>
          <List.Content className="list-item-right">
            <Image
              avatar
              style={{
                borderRadius: 0,
                maxHeight: 16,
                width: 18,
                marginBottom: 3,
              }}
              src={item.CountryFlag}
            />{' '}
            {setCountry(item)}
          </List.Content>
        </List.Item>

        <List.Item className="list-item-wrapper">
          <List.Content className="list-item-content">
            {global.translate('Description', 119)}{' '}
          </List.Content>
          <List.Content className="list-item-right">
            {item.Description}
          </List.Content>
        </List.Item>

        <List.Item className="list-item-wrapper">
          <List.Content className="list-item-content">
            {global.translate('Reference', 124)}
          </List.Content>
          <List.Content className="list-item-right">
            {item.Reference}
          </List.Content>
        </List.Item>
        <List.Item className="list-item-wrapper">
          <List.Content className="list-item-content">
            {global.translate('Fees', 117)}
          </List.Content>
          <List.Content className="list-item-right">
            <Image
              avatar
              style={{
                borderRadius: 0,
                maxHeight: 16,
                width: 18,
                marginBottom: 3,
              }}
              src={item.SourceCurrencyFlag}
            />{' '}
            {item.Fees}
          </List.Content>
        </List.Item>

        <List.Item className="list-item-wrapper">
          <List.Content className="list-item-content">
            {global.translate('External fees', 121)}
          </List.Content>
          <List.Content className="list-item-right">
            <Image
              avatar
              style={{
                borderRadius: 0,
                maxHeight: 16,
                width: 18,
                marginBottom: 3,
              }}
              src={item.SourceCurrencyFlag}
            />{' '}
            {item.ExternalFees}
          </List.Content>
        </List.Item>

        <List.Item className="list-item-wrapper">
          <List.Content className="list-item-content">
            {global.translate('Currency exchange fees', 120)}
          </List.Content>
          <List.Content className="list-item-right">
            <Image
              avatar
              style={{
                borderRadius: 0,
                maxHeight: 16,
                width: 18,
                marginBottom: 3,
              }}
              src={item.SourceCurrencyFlag}
            />{' '}
            {item.ExchangeFees}
          </List.Content>
        </List.Item>
      </List>
    </div>
  );
};
AllTransactionDetails.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  language: PropTypes.string,
};

AllTransactionDetails.defaultProps = {
  language: localStorage.getItem('language') || 'en',
};
export default AllTransactionDetails;
