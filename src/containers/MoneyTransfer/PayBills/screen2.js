import { useState, useEffect } from 'react';

export default ({ payBillsData, setScreenNumber }) => {
  const [errors, setErrors] = useState({});
  const {
    ClientNumber,
    InvoiceNumber,
    InvoiceDate,
    Description,
    Reference,
  } = payBillsData;

  const clearError = ({ target: { name } }) => {
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  /**
   * @returns {bool} true if no error
   */
  const validate = () => {
    const ClientNumberError = ClientNumber
      ? ''
      : global.translate('Please Provide your customer number.', 699);

    const InvoiceNumberError = InvoiceNumber
      ? ''
      : global.translate('Please provide the invoice number.', 700);

    const InvoiceDateError = InvoiceDate
      ? ''
      : global.translate('Please provide the invoice date.', 700);

    const DescriptionError = Description
      ? ''
      : global.translate('Provide Enter description here', 434);

    const ReferencesError = Reference
      ? ''
      : global.translate('Please provide the reference', 433);

    setErrors({
      ...errors,
      ClientNumber: ClientNumberError,
      InvoiceNumber: InvoiceNumberError,
      InvoiceDate: InvoiceDateError,
      Description: DescriptionError,
      Reference: ReferencesError,
    });
    return !(
      ClientNumberError ||
      InvoiceNumberError ||
      InvoiceDateError ||
      DescriptionError ||
      ReferencesError
    );
  };

  const handleNext = () => {
    if (!validate()) {
      return false;
    }
    setScreenNumber(3);
    return true;
  };

  useEffect(() => {}, []);

  return {
    handleNext,
    validate,
    errors,
    clearError,
  };
};
