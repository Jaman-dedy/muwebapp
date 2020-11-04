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
