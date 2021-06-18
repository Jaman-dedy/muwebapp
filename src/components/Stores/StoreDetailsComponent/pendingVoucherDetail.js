import React, { useState } from 'react';
import { List, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Thumbnail from 'components/common/Thumbnail';
import formatNumber from 'utils/formatNumber';

const PendingVoucherDetails = ({ item, language }) => {
  const [hasError, setHasError] = useState(false);
  const redeemData = item && item[0];

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
          name={
            redeemData?.Beneficiary?.FirstName
              ? redeemData?.Beneficiary?.FirstName
              : 'No Name'
          }
          secondName={
            redeemData?.Beneficiary?.LastName
              ? redeemData?.Beneficiary?.LastName
              : 'No Name'
          }
          size="mini"
          avatar={redeemData?.Beneficiary?.PictureURL}
          hasError={hasError}
          setHasError={setHasError}
        />

        <p className="sub-title" style={{ fontWeight: 'bold' }}>
          {redeemData?.Beneficiary?.FirstName}{' '}
          {redeemData?.Beneficiary?.LastName}
        </p>
      </div>

      <List divided>
        <List.Item className="list-item-wrapper">
          <List.Content className="list-item-content">
            {global.translate('Amount', 116)}:
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
              src={redeemData?.Flag}
            />{' '}
            {formatNumber(redeemData?.Amount, {
              locales: language,
            })}{' '}
            {redeemData?.Currency}
          </List.Content>
        </List.Item>

        <List.Item className="list-item-wrapper">
          <List.Content className="list-item-content">
            {global.translate('Store ID')}:
          </List.Content>
          <List.Content className="list-item-right">
            {redeemData?.StoreID}
          </List.Content>
        </List.Item>
        <List.Item className="list-item-wrapper">
          <List.Content className="list-item-content">
            {global.translate('Voucher Number')}:
          </List.Content>
          <List.Content className="list-item-right">
            {redeemData?.VoucherPIN}
          </List.Content>
        </List.Item>
        <List.Item className="list-item-wrapper">
          <List.Content className="list-item-content">
            {global.translate('Security Code')}:
          </List.Content>
          <List.Content className="list-item-right bold">
            {redeemData?.SecurityCode}
          </List.Content>
        </List.Item>
        <List.Item className="list-item-wrapper">
          <List.Content
            className="list-item-content"
            style={{ textAlign: 'center' }}
          >
            <b> {redeemData?.Description}</b>
          </List.Content>
        </List.Item>
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
