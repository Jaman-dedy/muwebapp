import React from 'react';
import { Image, List } from 'semantic-ui-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Thumbnail from 'components/common/Thumbnail';
import countries from 'utils/countries';

const CashListTransactionDetails = ({ item }) => {
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
          }}
          name={item.FirstName ? item.FirstName : 'No Name'}
          secondName={item.LastName ? item.LastName : 'No Name'}
          size="mini"
          avatar={item.PictureURL}
        />
        <p className="sub-title">
          {item.FirstName} {item.LastName}
        </p>
      </div>

      <List divided>
        <List.Item className="list-item-wrapper">
          <List.Content className="list-item-content">
            {global.translate('Amount Sent')}
          </List.Content>
          <List.Content className="list-item-right" floated="right">
            <Image
              avatar
              style={{
                borderRadius: 0,
                maxHeight: 16,
                width: 18,
                marginBottom: 3,
              }}
              src={item.SourceCurrencyFlag}
            />
            {item.SourceAmount}
            {item.SourceCurrency}
          </List.Content>
        </List.Item>
        <List.Item className="list-item-wrapper">
          <List.Content className="list-item-content">
            {`${global.translate('Amount To Be Received ')}`}
          </List.Content>
          <List.Content className="list-item-right" floated="right">
            <Image
              avatar
              style={{
                borderRadius: 0,
                maxHeight: 16,
                width: 18,
                marginBottom: 3,
              }}
              src={item.DestCurrencyFlag}
            />
            {item.DestAmount}
            {item.DestCurrency}
          </List.Content>
        </List.Item>

        <List.Item className="list-item-wrapper">
          <List.Content className="list-item-content">
            {global.translate(' Transfer Date')}
          </List.Content>
          <List.Content className="list-item-right" floated="right">
            {' '}
            {item.Date || moment(new Date()).format('YYYY/MM/DD')}
          </List.Content>
        </List.Item>
        <List.Item className="list-item-wrapper">
          <List.Content className="list-item-content">
            {global.translate('Phone number', 13)}
          </List.Content>
          <List.Content className="list-item-right" floated="right">
            {item.PhoneNumber}
          </List.Content>
        </List.Item>

        <List.Item className="list-item-wrapper">
          <List.Content className="list-item-content">
            {global.translate('Source Wallet')}
          </List.Content>
          <List.Content className="list-item-right" floated="right">
            <Image
              style={{
                borderRadius: 0,
                maxHeight: 16,
                width: 18,
                marginBottom: 3,
              }}
              avatar
              src={item.SourceCurrencyFlag}
            />{' '}
            {item.SourceAccountNumber}
          </List.Content>
        </List.Item>

        <List.Item className="list-item-wrapper">
          <List.Content className="list-item-content">
            {global.translate('Country', 275)}
          </List.Content>
          <List.Content className="list-item-right" floated="right">
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
            {item.CountryCode &&
              item.CountryCode.length > 0 &&
              countries.find(
                country =>
                  country.key.toUpperCase() === item.CountryCode,
              ).text}
          </List.Content>
        </List.Item>

        <List.Item className="list-item-wrapper">
          <List.Content className="list-item-content">
            {global.translate('Description', 119)}{' '}
          </List.Content>
          <List.Content className="list-item-right" floated="right">
            {item.Description}
          </List.Content>
        </List.Item>

        <List.Item className="list-item-wrapper">
          <List.Content className="list-item-content">
            {global.translate('Reference', 124)}
          </List.Content>
          <List.Content className="list-item-right" floated="right">
            {item.Reference}
          </List.Content>
        </List.Item>
        <List.Item className="list-item-wrapper">
          <List.Content className="list-item-content">
            {global.translate('Fees', 117)}
          </List.Content>
          <List.Content className="list-item-right" floated="right">
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
            {item.CollectedFees}
            {item.SourceCurrency}
          </List.Content>
        </List.Item>
      </List>
    </div>
  );
};
CashListTransactionDetails.propTypes = {
  item: PropTypes.objectOf(PropTypes.object).isRequired,
};
export default CashListTransactionDetails;
