import React, { useState, useEffect }  from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import moment from 'moment';
import validateImg from 'helpers/image/validateImg';
import logo from 'assets/images/logo_web.svg';
import formatNumber from 'utils/formatNumber';


const VoucherReceiptContent = ({ data }) => {

  const [storeLogo, setStoreLogo] = useState('');

  useEffect(() => {
    if (data && data.Store) {
      validateImg(data.Store.StoreLogo).then(
        function fulfilled(img) {
          setStoreLogo(data.Store.StoreLogo);
        },
      );
    }
  }, [data]);

  return (
    <div className="receipt-content medium-padding small-margin flex flex-column flex-grow-1">
   {data && data.VoucherAlreadyUsed === 'YES' && (
        <div className="receipt-background-text flex justify-content-center align-items-center center-align">
          <span className="uppercase opacity-2">
            {global.translate('Duplicate')}
          </span>
        </div>
      )} 

      <div className="flex flex-row justify-content-space-between align-items-top medium-padding">
        <div className="flex bold flex-row justify-content-space-between align-items-center">
          <span>
            {data && data.Store && data.Store.StoreLogo && (
              <div className="receipt-store-logo">
               {storeLogo && <Image src={storeLogo} />}
              </div>
            )}
          </span>
          <div className="flex flex-column store-info">
            <span>{data?.Store?.StoreName}</span>
            <span>
              {data?.Address}, {data?.Store?.City},{' '}
              {data?.Store?.Country}{' '}
            </span>
            <span>
             {data && data.Store && data.Store.PhonePrefix && `Tel: + ${data?.Store?.PhonePrefix} ${data?.Store?.Phone}`} 
            </span>
          </div>
        </div>
        <div className="our-info">
          <Image src={logo} className="our-info__logo" />
          <div style={{ marginLeft: '-50px', position: 'relative' }}>
            <span>
              {global.translate('Date')}:{' '}
              {moment().format(' D/MM/YYYY h:mm:ss A')}
            </span>
          </div>
        </div>
      </div>
      <div>
        <div className="receipt-type">
          {global.translate('Voucher')}
        </div>
      </div>

      <div>
        <div className="flex flex-row">
          <div className="width-50-percent small-v-padding medium-h-padding parties-info-sender">
            <div className="height-50-percent flex flex-column medium-margin-bottom">
              <span className="bold medium-text small-margin-bottom">
                {global.translate('Sender')}
              </span>
              <span className="capitalize medium-text text-grey-color">
                {data?.Sender?.FirstName || ''}{' '}
                {data?.Sender?.LastName || ''}{' '}
              </span>
            
              <span className="medium-margin-bottom text-grey-color ">
              {data &&
                  data.Sender &&
                  data.Sender.PhonePrefix &&
                  `Tel: + ${data?.Sender?.PhonePrefix} ${data?.Sender?.Phone}`}
              </span>
            </div>
          </div>
          <div className="width-50-percent small-v-padding medium-h-padding parties-info">
            <div className="height-50-percent flex flex-column">
              <span className="bold medium-text small-margin-bottom">
                {global.translate('Recipient')}
              </span>

              <span className="capitalize medium-text text-grey-color">
                {data?.Beneficiary?.FirstName || ''}{' '}
                {data?.Beneficiary?.LastName || ''}
              </span>

             

              <span className="medium-margin-bottom text-grey-color">
              {data &&
                  data.Beneficiary &&
                  data.Beneficiary.PhonePrefix &&
                  `Tel: + ${data?.Beneficiary?.PhonePrefix} ${data?.Beneficiary?.Phone}`}

              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-content-space-between voucher-info">
          <div className="flex flex-column justify-content-center">
            <div className="flex flex-column small-v-padding medium-h-padding">
              <span className="bold ">Voucher Number</span>
              <span className="text-grey-color">
                {' '}
                {data?.VoucherPIN}
              </span>
            </div>
            <div className="flex flex-column small-v-padding medium-h-padding">
              <span className="bold ">Security Code</span>
              <span className="text-grey-color">
                {' '}
                {data?.SecurityCode}
              </span>
            </div>
            <div className="flex flex-column small-v-padding medium-h-padding">
              <span className="bold ">Amount</span>
              <span className="voucher-receipt-amount">
                {formatNumber(data?.AmountToBeReceived, {
                  locales: localStorage.language || undefined,
                  decimals: 2,
                })}{' '}
                {String(data?.AmountToBeReceived || '').split(' ')[1]}
              </span>
            </div>
          </div>
          <div className="flex flex-column  align-items-center QR-container">
            <Image
              src={data?.VoucherQRCode}
              className="center medium-h-padding"
              style={{ height: '130px' }}
            />
            <span>{global.translate('Voucher QR Code')}</span>
          </div>
        </div>
        <div className="flex flex-row parties-signatures ">
          <div className="flex flex-column width-50-percent parties-signatures__box medium-h-padding">
            <div className="flex flex-column">
              <span className="bold">Customer</span>
              <span className="text-grey-color">Signature</span>
              <div className="receipt-divider" />
            </div>
          </div>
          <div className="flex flex-column width-50-percent parties-signatures__box medium-h-padding">
            <div className="flex flex-column">
              <span className="bold">{data?.Store?.StoreName}</span>
              <span className="text-grey-color">
                Signature & Stamp
              </span>
              <div className="receipt-divider" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

VoucherReceiptContent.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
};

VoucherReceiptContent.defaultProps = {
  data: {},
};

export default VoucherReceiptContent;
