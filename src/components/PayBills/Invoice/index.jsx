import React from 'react';
import PropTypes from 'prop-types';
import { Input, TextArea } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';

import './Invoice.scss';

const Invoice = ({ screen2, handleInputChange, payBillsData }) => {
  const { errors, clearError } = screen2;
  return (
    <div className="invoice">
      <div className="invoice-label">
        <span>{global.translate('Fill your Invoice', 691)}</span>
      </div>
      <Input
        name="ClientNumber"
        error={!!errors.ClientNumber || false}
        value={payBillsData.ClientNumber}
        onChange={e => {
          clearError(e);
          handleInputChange(e);
        }}
        placeholder={global.translate('Customer number', 694)}
      />
      <Input
        name="InvoiceNumber"
        error={!!errors.InvoiceNumber || false}
        value={payBillsData.InvoiceNumber}
        onChange={e => {
          clearError(e);
          handleInputChange(e);
        }}
        placeholder={global.translate('Invoice Number', 695)}
      />
      <div className="calendar_input">
        <DateInput
          name="InvoiceDate"
          placeholder="DD-MM-YYYY"
          error={!!errors.InvoiceDate || false}
          value={payBillsData.InvoiceDate}
          iconPosition="left"
          icon="calendar alternate outline"
          closable
          onChange={(_, { name, value }) => {
            clearError({ target: { name, value } });
            handleInputChange({ target: { name, value } });
          }}
          popupPosition="top left"
          animation="fade"
          dateFormat="DD-MM-YYYY"
        />
      </div>
      <Input
        name="Description"
        error={!!errors.Description || false}
        value={payBillsData.Description}
        onChange={e => {
          clearError(e);
          handleInputChange(e);
        }}
        placeholder={global.translate('Description', 119)}
      />
      <Input
        name="Reference"
        error={!!errors.Reference || false}
        value={payBillsData.Reference}
        onChange={e => {
          clearError(e);
          handleInputChange(e);
        }}
        placeholder={global.translate('Reference', 124)}
      />
      <TextArea
        name="SupplierNote"
        error={errors.SupplierNote || ''}
        value={payBillsData.SupplierNote}
        onChange={e => {
          clearError(e);
          handleInputChange(e);
        }}
        placeholder={global.translate(
          'Send a note to the supplier',
          696,
        )}
      />
    </div>
  );
};

Invoice.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  screen2: PropTypes.instanceOf(Object).isRequired,
  payBillsData: PropTypes.instanceOf(Object).isRequired,
};

export default Invoice;
