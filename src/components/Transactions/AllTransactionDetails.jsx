import React from 'react';
import { List, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Thumbnail from 'components/common/Thumbnail';
import countries from 'utils/countries';

const AllTransactionDetails = ({ item }) => {
  return (
    <div
      className="transaction-detail"
      style={{
        width: '300px',
        fontFamily: 'Montserrat',
      }}
    >
      <div className="">
        {item.Amount && item.OpsType === '+' && (
          <Icon
            className="icon-in icons-flow"
            name="long arrow alternate right"
            color="green"
          />
        )}
        {item.Amount && item.OpsType === '-' && (
          <Icon
            className="icon-out icons-flow"
            name="long arrow alternate left"
            color="red"
          />
        )}
      </div>
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
          <List.Content className="list-item-right" floated="right">
            <Image
              avatar
              style={{
                borderRadius: 0,
                maxHeight: 16,
                width: 18,
                marginBottom: 3,
              }}
              src={item.TargetCurrencyFlag}
            />
            {item.Amount}
          </List.Content>
        </List.Item>

        <List.Item className="list-item-wrapper">
          <List.Content className="list-item-content">
            {global.translate(' Transfer Date')}
          </List.Content>
          <List.Content className="list-item-right" floated="right">
            {' '}
            {item.Date}
          </List.Content>
        </List.Item>
        <List.Item className="list-item-wrapper">
          <List.Content className="list-item-content">
            {global.translate('Phone number', 13)}
          </List.Content>
          <List.Content className="list-item-right" floated="right">
            {item.ContactPhone}
          </List.Content>
        </List.Item>

        <List.Item className="list-item-wrapper">
          <List.Content className="list-item-content">
            {global.translate('Email')}
          </List.Content>
          <List.Content className="list-item-right" floated="right">
            {item.ContactEmail}
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
            {item.ContactCountryCode &&
              item.ContactCountryCode.length > 0 &&
              countries.find(
                country =>
                  country.key.toUpperCase() ===
                  item.ContactCountryCode,
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
              src={item.TargetCurrencyFlag}
            />{' '}
            {item.Fees}
          </List.Content>
        </List.Item>

        <List.Item className="list-item-wrapper">
          <List.Content className="list-item-content">
            {global.translate('External fees', 121)}
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
              src={item.TargetCurrencyFlag}
            />{' '}
            {item.ExternalFees}
          </List.Content>
        </List.Item>

        <List.Item className="list-item-wrapper">
          <List.Content className="list-item-content">
            {global.translate('Currency exchange fees', 120)}
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
              src={item.TargetCurrencyFlag}
            />{' '}
            {item.ExchangeFees}
          </List.Content>
        </List.Item>
      </List>
    </div>
  );
};
AllTransactionDetails.propTypes = {
  item: PropTypes.objectOf(PropTypes.object).isRequired,
};
export default AllTransactionDetails;
