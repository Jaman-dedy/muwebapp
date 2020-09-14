import React, { useState } from 'react';
import { List, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Thumbnail from 'components/common/Thumbnail';
import formatNumber from 'utils/formatNumber';

const PendingVoucherDetails = ({ item, language }) => {
  const [hasError, setHasError] = useState(false);
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
          hasError={hasError}
          setHasError={setHasError}
        />
        <p className="sub-title">
          {item.FirstName} {item.LastName}
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
            {formatNumber(item.SourceAmount, {
              locales: language,
            })}{' '}
            {item.Currency}
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
        {!item.SenderLastName && (
          <>
            <List.Item className="list-item-wrapper">
              <List.Content className="list-item-content">
                {global.translate('Phone number', 13)}
              </List.Content>
              <List.Content className="list-item-right">
                {item.PhoneNumber}
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
                  src={item.StoreCountryFlag}
                />{' '}
                {item.Country}
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
                {global.translate('Store name', 837)}
              </List.Content>
              <List.Content className="list-item-right">
                {' '}
                {item.Store}
              </List.Content>
            </List.Item>
            <List.Item className="list-item-wrapper">
              <List.Content className="list-item-content">
                {global.translate('Store address')}
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
                  src={item.StoreCountryFlag}
                />{' '}
                {item.City} {item.Country}
              </List.Content>
            </List.Item>
          </>
        )}

        {item.SenderLastName && (
          <>
            <List.Item className="list-item-wrapper">
              <List.Content className="list-item-content">
                {global.translate('Sender Name')}
              </List.Content>
              <List.Content className="list-item-right">
                {item.SenderFirstName} {item.SenderLastName}
              </List.Content>
            </List.Item>
            <List.Item className="list-item-wrapper">
              <List.Content className="list-item-content">
                {global.translate('Sender PID')}
              </List.Content>
              <List.Content className="list-item-right">
                {item.SenderPID}
              </List.Content>
            </List.Item>
          </>
        )}
      </List>
    </div>
  );
};
PendingVoucherDetails.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  language: PropTypes.string,
};

PendingVoucherDetails.defaultProps = {
  language: localStorage.getItem('language') || 'en',
};
export default PendingVoucherDetails;
