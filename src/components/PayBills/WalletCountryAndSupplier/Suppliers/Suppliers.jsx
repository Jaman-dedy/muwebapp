import React from 'react';
import PropTypes from 'prop-types';
import './Suppliers.scss';
import Supplier from './Supplier';

const Suppliers = ({
  suppliers,
  payBillsData,
  onChange,
  clearError,
}) => {
  return (
    <>
      {suppliers.map(
        ({ Logo, Name, SupplierID, WalletNumber, Currency }) => (
          <Supplier
            key={SupplierID}
            WalletNumber={WalletNumber}
            SupplierID={SupplierID}
            Currency={Currency}
            SupplierName={Name}
            logo={Logo}
            onChange={onChange}
            clearError={clearError}
            payBillsData={payBillsData}
          />
        ),
      )}
    </>
  );
};

Suppliers.propTypes = {
  suppliers: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  payBillsData: PropTypes.instanceOf(Object),
  onChange: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
};

Suppliers.defaultProps = {
  suppliers: [{}],
  payBillsData: {},
};

export default Suppliers;
