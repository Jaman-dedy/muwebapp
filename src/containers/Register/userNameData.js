/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import verifyPIDAction, {
  clearUsername,
} from 'redux/actions/users/verifyPID';
import checkPassword from 'utils/checkPassword';
import registerUserAction from 'redux/actions/users/registerUser';
import countryCurrenciesAction from 'redux/actions/users/countryCurrencies';

export default ({
  registrationData,
  setScreenNumber,
  screenNumber,
  setRegistrationData,
}) => {
  const { verifyPID, registerUser, countryCurrencies } = useSelector(
    ({ user }) => user,
  );

  const [errors, setErrors] = useState({});
  const [PINNumber, setPINNumber] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { personalId, password, pin, ReferralPID } = registrationData;

  const dispatch = useDispatch();

  const handleVerifyPID = () => {
    verifyPIDAction(personalId)(dispatch);
  };
  const clearError = ({ target: { name } }) => {
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  useEffect(() => {
    if (PINNumber.length !== 0) {
      setRegistrationData({ ...registrationData, pin: PINNumber });
    }
  }, [PINNumber]);
  useEffect(() => {
    if (screenNumber === 3) {
      const strength = checkPassword(password);
      let pswdStrength = 0;
      Object.keys(strength).map(type => {
        if (strength[type]) pswdStrength += 25;
        return true;
      });
      setPasswordStrength(pswdStrength);
    }
  }, [registrationData]);

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
    const personalIdError = personalId
      ? ''
      : global.translate('Please provide a valid Username', 2071);

    const personalIdSpecialCharacterError =
      personalId.search(/[@!#$%^&*]/) === -1
        ? ''
        : global.translate(
            'Your personal Id should not contain special characters',
          );

    const noSpaceAllowedError =
      /\s/.test(personalId) === false
        ? ''
        : global.translate(
            'Your personal Id should not contain spaces',
          );
    const passwordError = password
      ? ''
      : global.translate('Please Enter your password', 2085);
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
      password: passwordError,
      personalId:
        personalIdError ||
        personalIdSpecialCharacterError ||
        noSpaceAllowedError,
      pin:
        pinError ||
        pinLengthError ||
        pinCharacterError ||
        sequenceError ||
        equalityError,
    });
    return !(
      pinError ||
      pinLengthError ||
      passwordError ||
      personalIdError ||
      personalIdSpecialCharacterError ||
      noSpaceAllowedError ||
      sequenceError ||
      equalityError
    );
  };

  const handleNext = () => {
    if (!validate()) {
      return false;
    }
    setScreenNumber(4);
    return true;
  };
  const handleOnBlur = () => {
    if (personalId) {
      handleVerifyPID();
    }
  };

  const handleClearUsername = () => {
    clearUsername()(dispatch);
  };
  const handleSubmit = () => {
    registerUserAction({
      ...registrationData,
      ContactPID: registrationData?.ReferralPID,
    })(dispatch);
  };
  const handleGetCountryCurrencies = () => {
    countryCurrenciesAction(registrationData.countryCode)(dispatch);
  };

  useEffect(() => {
    if (registerUser.success) {
      handleGetCountryCurrencies();
    }
  }, [registerUser]);

  useEffect(() => {
    if (countryCurrencies.success) {
      setScreenNumber(5);
    }
  }, [countryCurrencies]);

  return {
    handleNext,
    validate,
    errors,
    clearError,
    verifyPID,
    passwordStrength,
    registerUser,
    setErrors,
    handleOnBlur,
    handleClearUsername,
    setPINNumber,
    PINNumber,
    handleSubmit,
  };
};
