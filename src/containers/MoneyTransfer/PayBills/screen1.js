import { useState } from 'react';

export default ({ payBillsData, setScreenNumber }) => {
  const [errors, setErrors] = useState({});
  const { Supplier } = payBillsData;

  const clearError = e => {
    const { name } = e?.target || {};
    if (!name) {
      setErrors({});
      return;
    }

    setErrors({
      ...errors,
      [name]: '',
    });
  };

  /**
   * @returns {bool} true if no error
   */
  const validate = () => {
    const supplierError = Supplier
      ? ''
      : global.translate('Please select your supplier', 690);

    setErrors({
      ...errors,
      Supplier: supplierError,
    });
    return !supplierError;
  };

  const handleNext = () => {
    if (!validate()) {
      return false;
    }
    setScreenNumber(2);
    return true;
  };

  return {
    handleNext,
    validate,
    errors,
    clearError,
  };
};
