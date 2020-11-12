import React from 'react';
import PropTypes from 'prop-types';

import './VoucherReceipt.scss';
import VoucherReceiptContent from './VoucherReceiptContent';

const VoucherReceipt = ({ data, receiptRef }) => {
  return (
    <div
      className="Receipt"
      ref={receiptRef}
      style={{ border: '1px solid #fff' }}
    >
      <div className="receipt-container flex flex-column justify-content-space-between width-100-percent height-100-percent">
      {data && data.VoucherAlreadyUsed === 'YES' && (
        <div className="receipt-background-text-preview flex justify-content-center align-items-center center-align">
          <span className="uppercase text-grey opacity-2">
            {global.translate('Duplicate')}
          </span>
        </div>
      )}
        <VoucherReceiptContent data={data} />
        <div className="receipt-divider" />
        <VoucherReceiptContent data={data} />
      </div>
    </div>
  );
};

VoucherReceipt.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  receiptRef: PropTypes.instanceOf(Object),
};

VoucherReceipt.defaultProps = {
  data: {},
  receiptRef: {},
};

export default VoucherReceipt;
