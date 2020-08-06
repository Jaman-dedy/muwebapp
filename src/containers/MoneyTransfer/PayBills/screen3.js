import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import transferFundAction from 'redux/actions/payBills/transferFund';

export default ({ payBillsData }) => {
  const [errors, setErrors] = useState({});
  const { Amount, Pin } = payBillsData;

  const dispatch = useDispatch();

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
    const AmountError = Amount
      ? ''
      : global.translate(
          'You must enter the amount for this operation.',
          393,
        );
    const AmountErrorZero =
      Amount !== 0
        ? ''
        : global.translate('The amount can not be zero.');
    const AmountErrorNegative =
      Amount > 0
        ? ''
        : global.translate('The amount can not be less than zero.');

    const PinError = Pin
      ? ''
      : global.translate('Please provide your PIN number', 543);

    setErrors({
      ...errors,
      Amount: AmountError || AmountErrorNegative || AmountErrorZero,
      Pin: PinError,
    });
    return !(
      AmountError ||
      AmountErrorNegative ||
      AmountErrorZero ||
      PinError
    );
  };

  const handleNext = () => {
    if (!validate()) {
      return false;
    }
    // send money to the backend
    transferFundAction(payBillsData)(dispatch);
    return true;
  };

  useEffect(() => {}, []);

  return {
    handleNext,
    validate,
    errors,
    clearError,
    setErrors,
  };
};
