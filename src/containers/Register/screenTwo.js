/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import verifyPhoneNumberAction, {clearPhoneNumber} from 'redux/actions/users/verifyPhoneNumber';
import sendOTPAction from 'redux/actions/users/sendOTP';

export default ({ registrationData, setScreenNumber }) => {
  const dispatch = useDispatch();
  const {
    verifyPhoneNumber,
    sendOTP,
    userLocationData,
  } = useSelector(({ user }) => user);

  const [errors, setErrors] = useState({});
  const { countryCode, phoneNumber } = registrationData;

  const handleVerifyPhoneNumber = () => {
    verifyPhoneNumberAction(`${countryCode}${phoneNumber}`)(dispatch);
  };

  const handleSendOTP = () => {
    sendOTPAction(`${countryCode}${phoneNumber}`)(dispatch);
  };

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
    const phoneNumberError = phoneNumber
      ? ''
      : global.translate('Please provide a valid phone number.', 20);
    setErrors({
      ...errors,
      phoneNumber: phoneNumberError,
    });
    return !phoneNumberError;
  };

  const handleNext = () => {
    if (!validate()) {
      return false;
    }
    handleVerifyPhoneNumber();
    return true;
  };

  useEffect(() => {
    if (verifyPhoneNumber.isValid) {
      handleSendOTP();
      clearPhoneNumber()(dispatch);
    }
  }, [verifyPhoneNumber]);

  useEffect(() => {
    if (sendOTP.success) {
      setScreenNumber(3);
    }
  }, [sendOTP]);

  return {
    handleNext,
    validate,
    errors,
    clearError,
    verifyPhoneNumber,
    userLocationData,
  };
};
