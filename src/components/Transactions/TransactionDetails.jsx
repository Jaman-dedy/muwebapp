import React, {useState} from 'react';
import { Image, List, Icon } from 'semantic-ui-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Thumbnail from 'components/common/Thumbnail';
import countries from 'utils/countries';
import formatNumber from 'utils/formatNumber';

const CashListTransactionDetails = ({ item, language }) => {
  const [hasError, setHasError] = useState(false);
  const country =
    item.CountryCode &&
    item.CountryCode.length > 0 &&
    countries.find(
      country => country.key.toUpperCase() === item.CountryCode,
    );

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
            {global.translate('Amount Sent', 1259)}
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
            />
            {formatNumber(item.SourceAmount, {
              locales: language,
            })}
            {item.SourceCurrency}
          </List.Content>
        </List.Item>
        <List.Item className="list-item-wrapper">
          <List.Content className="list-item-content">
            {`${global.translate('Amount To Be Received', 397)}`}
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
              src={item.DestCurrencyFlag}
            />
            {formatNumber(item.DestAmount, {
              locales: language,
            })}
            {item.DestCurrency}
          </List.Content>
        </List.Item>

        <List.Item className="list-item-wrapper">
          <List.Content className="list-item-content">
            {global.translate('Transfer Date', 1228)}
          </List.Content>
          <List.Content className="list-item-right">
            {' '}
            {item.Date || moment(new Date()).format('YYYY/MM/DD')}
          </List.Content>
        </List.Item>
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
            {global.translate('Source Wallet', 1260)}
          </List.Content>
          <List.Content className="list-item-right">
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
            {country && country.text}
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
            {item.CollectedFees}
            {item.SourceCurrency}
          </List.Content>
        </List.Item>

        {item.StatusCode && (
          <List.Item className="list-item-wrapper">
            <List.Content className="list-item-content">
              {global.translate('Status', 339)}
            </List.Content>
            <List.Content className="list-item-right">
              {item.StatusCode === '0' && (
                <>
                  {' '}
                  <Icon name="check" />
                  {global.translate('Available for payment', 1308)}
                </>
              )}
              {item.StatusCode === '1' && (
                <>
                  {' '}
                  <Icon name="check" color="green" />
                  {global.translate('Already payed', 1309)}
                </>
              )}
              {item.StatusCode === '3' && (
                <>
                  {' '}
                  <Icon name="cancel" color="red" />
                  {global.translate('Cancelled by originator', 1310)}
                </>
              )}
            </List.Content>
          </List.Item>
        )}
      </List>
    </div>
  );
};
CashListTransactionDetails.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  language: PropTypes.string,
};

CashListTransactionDetails.defaultProps = {
  language: localStorage.getItem('language') || 'en',
};
export default CashListTransactionDetails;
