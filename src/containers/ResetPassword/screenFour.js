/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import countryCurrenciesAction from 'redux/actions/users/countryCurrencies';

export default ({ resetPasswordData, setScreenNumber }) => {
  const [errors, setErrors] = useState({});
  const { pin, confirmPin } = resetPasswordData;

  const dispatch = useDispatch();
  const { registerUser, countryCurrencies } = useSelector(
    ({ user }) => user,
  );

  const clearError = ({ target: { name } }) => {
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleGetCountryCurrencies = () => {
    countryCurrenciesAction(resetPasswordData.countryCode)(dispatch);
  };

  const checkSequence = thisPin => {
    const numbers = '0123456789';
    const numbersRev = '9876543210';

    return (
      numbers.indexOf(String(thisPin)) === -1 &&
      numbersRev.indexOf(String(thisPin)) === -1
    );
  };

  const checkDigitsEquality = thisPin => {
    const pattern = RegExp('^(\\d)(?!\\1+$)\\d{3}$');

    if (pattern.test(thisPin)) {
      return true;
    }
    return false;
  };

  /**
   * @returns {bool} true if no error
   */
  const validate = () => {
    const pinError = pin
      ? ''
      : global.translate('Please Enter your PIN', 2143);

    const pinLengthError =
      pin.length === 4
        ? ''
        : global.translate('Please Fill all the PIN fields', 1266);

    const pinCharacterError =
      pin.search(/[A-Z]/) === -1 &&
      pin.search(/[a-z]/) === -1 &&
      pin.search(/[@!#$%^&*]/) === -1
        ? ''
        : global.translate('PIN should only contain numbers', 1723);

    const confirmPinError = confirmPin
      ? ''
      : 'Please confirm your PIN';

    const confirmationError =
      pin === confirmPin
        ? ''
        : global.translate('Your PIN numbers do not match.', 741);

    const sequenceError = checkSequence(pin)
      ? ''
      : global.translate(
          'Consecutive numbers are not allowed.',
          2144,
        );

    const equalityError = !checkDigitsEquality(pin)
      ? global.translate('Your PIN is very weak!', 1708)
      : '';

    setErrors({
      ...errors,
      pin:
        pinError ||
        pinLengthError ||
        pinCharacterError ||
        sequenceError ||
        equalityError,
      confirmPin: confirmPinError,
      confirmation: confirmPinError ? '' : confirmationError,
    });
    return !(
      pinError ||
      pinLengthError ||
      confirmPinError ||
      confirmationError ||
      sequenceError ||
      equalityError
    );
  };

  const handleNext = () => {
    if (validate()) {
      setScreenNumber(5);
    }
  };

  useEffect(() => {
    if (registerUser.success) {
      handleGetCountryCurrencies();
    }
  }, [registerUser]);

  useEffect(() => {
    if (countryCurrencies.success) {
      setScreenNumber(7);
    }
  }, [countryCurrencies]);

  return {
    handleNext,
    validate,
    errors,
    clearError,
    registerUser,
  };
};
