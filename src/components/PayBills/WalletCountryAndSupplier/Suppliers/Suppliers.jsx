import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ReusableDropdown from 'components/common/Dropdown/ReusableDropdown';

const Suppliers = ({ suppliers, setPayBillsData, payBillsData }) => {
  const [selectedProvider, setSelectedProvider] = useState();

  useEffect(() => {
    if (payBillsData.Supplier && !selectedProvider) {
      const supplier = suppliers.find(
        supplier => supplier.SupplierID === payBillsData.Supplier,
      );

      setSelectedProvider({
        CountryCode: supplier.CountryCode,
        Img: supplier.Logo,
        Name: supplier.Name,
        SupplierID: supplier.SupplierID,
        Title: supplier.Name,
      });
    }
    if (selectedProvider) {
      setPayBillsData({
        ...payBillsData,
        Supplier: selectedProvider.SupplierID,
        SupplierName: selectedProvider.Name,
      });
    }
  }, [selectedProvider]);

  return (
    <>
      <ReusableDropdown
        search
        customStyleSelector
        customstyle
        options={Array.isArray(suppliers) ? suppliers : []}
        setCurrentOption={setSelectedProvider}
        currentOption={selectedProvider && selectedProvider}
      />
    </>
  );
};

Suppliers.propTypes = {
  suppliers: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  setPayBillsData: PropTypes.func,
  payBillsData: PropTypes.instanceOf(Object),
};

Suppliers.defaultProps = {
  suppliers: [{}],
  setPayBillsData: () => {},
  payBillsData: {},
};

export default Suppliers;
