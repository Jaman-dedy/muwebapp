import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import countryCurrenciesAction from 'redux/actions/users/countryCurrencies';
import registerUserAction from 'redux/actions/users/registerUser';

export default ({ registrationData, setScreenNumber }) => {
  const [errors, setErrors] = useState({});
  const { pin, confirmPin } = registrationData;

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

  const handleRegistration = () => {
    registerUserAction(registrationData)(dispatch);
  };

  const handleGetCountryCurrencies = () => {
    countryCurrenciesAction(registrationData.countryCode)(dispatch);
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
      : 'Please provide a valid PIN number. It must contains 4 digits.';

    const pinLengthError =
      pin.length === 4
        ? ''
        : 'Please provide a valid PIN number. It must contains 4 digits.';

    const pinCharacterError =
      pin.search(/[A-Z]/) === -1 &&
      pin.search(/[a-z]/) === -1 &&
      pin.search(/[@!#$%^&*]/) === -1
        ? ''
        : 'PIN should only contain numbers';

    const confirmPinError = confirmPin
      ? ''
      : 'Confirm  your PIN number';

    const confirmationError =
      pin === confirmPin ? '' : 'The PIN number do not match.';

    const sequenceError = checkSequence(pin)
      ? ''
      : 'Consecutive numbers are not allowed.';

    const equalityError = !checkDigitsEquality(pin)
      ? 'Your PIN is very week!'
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
    if (!validate()) {
      return false;
    }
    handleRegistration();
    return true;
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
