/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import registerUserAction from 'redux/actions/users/registerUser';

export default ({ registrationData, setScreenNumber }) => {
  const [errors, setErrors] = useState({});
  const { pin, confirmPin, ReferralPID } = registrationData;
  const dispatch = useDispatch();

  const { registerUser } = useSelector(({ user }) => user);
  const clearError = ({ target: { name } }) => {
    setErrors({
      ...errors,
      [name]: '',
    });
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
      : global.translate(
          'Please provide a valid PIN number. It must contains 4 digits.',
          944,
        );

    const pinLengthError =
      pin.length === 4
        ? ''
        : global.translate(
            'Please provide a valid PIN number. It must contains 4 digits.',
            944,
          );

    const pinCharacterError =
      pin.search(/[A-Z]/) === -1 &&
      pin.search(/[a-z]/) === -1 &&
      pin.search(/[@!#$%^&*]/) === -1
        ? ''
        : global.translate('PIN should only contain numbers', 1723);

    const confirmPinError = confirmPin
      ? ''
      : global.translate('Confirm  your PIN number', 941);

    const confirmationError =
      pin === confirmPin
        ? ''
        : global.translate('Your PIN numbers do not match.', 741);

    const sequenceError = checkSequence(pin)
      ? ''
      : global.translate(
          'Consecutive numbers are not allowed.',
          1707,
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
    if (!validate()) {
      return false;
    }
    setScreenNumber(6);
    return true;
  };
  const registerNow = stat => {
    if (ReferralPID === '') {
      delete registrationData.ContactPID;
      delete registrationData.ReferralPID;
      return registerUserAction(registrationData)(dispatch);
    }
  };

  return {
    handleNext,
    validate,
    errors,
    clearError,
    registerNow,
    registerUser,
  };
};
