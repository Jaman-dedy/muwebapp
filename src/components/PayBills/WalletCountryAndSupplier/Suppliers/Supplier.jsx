import React from 'react';
import { Image, Checkbox } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Supplier = ({
  SupplierName,
  logo,
  SupplierID,
  Currency,
  onChange,
  clearError,
  payBillsData,
}) => {
  return (
    <div className="supplier">
      <div className="supplier-info">
        <Image src={logo} inline size="tiny" />
        <span>{SupplierName}</span>
      </div>
      <Checkbox
        type="radio"
        value={SupplierID}
        name="Supplier"
        checked={payBillsData.SupplierName === SupplierName}
        className="checkbox"
        onChange={(e, { name, value }) => {
          clearError({ target: { name } });
          onChange({
            target: { name, value },
            Currency,
            SupplierName,
          });
        }}
      />
    </div>
  );
};

Supplier.propTypes = {
  payBillsData: PropTypes.instanceOf(Object),
  SupplierName: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  SupplierID: PropTypes.string.isRequired,
  Currency: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
};

Supplier.defaultProps = {
  payBillsData: {},
};

export default Supplier;
