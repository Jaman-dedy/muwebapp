/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import verifyOTPAction, {
  clearVerifyOTP,
} from 'redux/actions/users/verifyOTP';
import verifyPhoneNumberAction from 'redux/actions/users/verifyPhoneNumber';

export default ({
  registrationData,
  setScreenNumber,
  screenNumber,
}) => {
  const dispatch = useDispatch();
  const { verifyOTP, verifyPhoneNumber } = useSelector(
    ({ user }) => user,
  );

  const [shouldVerifyOtp, setShouldVerifyOtp] = useState(false);
  const [OTPNumber, setOTPNumber] = useState('');
  const [errors, setErrors] = useState({});
  const { countryCode, phoneNumber } = registrationData;

  const handleVerifyOTP = () => {
    verifyOTPAction(
      `${countryCode}${phoneNumber}`,
      OTPNumber,
    )(dispatch);
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
    const otpError = OTPNumber
      ? ''
      : global.translate(
          'Please enter the verification code sent via SMS',
          2088,
        );

    setErrors({ ...errors, OTP: otpError });

    return !otpError;
  };
  const handleNext = () => {
    if (!validate()) {
      return false;
    }
    handleVerifyOTP();
    return true;
  };

  useEffect(() => {
    if (verifyOTP.isValid) {
      setScreenNumber(3);
    }
  }, [verifyOTP]);
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      if (OTPNumber.length === 6) {
        setShouldVerifyOtp(true);
      } else {
        setShouldVerifyOtp(false);
        clearVerifyOTP()(dispatch);
        setErrors(null);
      }
    }
  };
  useEffect(() => {
    if (shouldVerifyOtp) {
      verifyOTPAction(phoneNumber, OTPNumber)(dispatch);
    }
  }, [shouldVerifyOtp]);
  useEffect(() => {
    if (OTPNumber?.length === 6) {
      setShouldVerifyOtp(true);
    } else {
      setShouldVerifyOtp(false);
      clearVerifyOTP()(dispatch);
      setErrors(null);
    }
  }, [OTPNumber]);

  const resendOtp = () => {
    verifyPhoneNumberAction(phoneNumber)(dispatch);
  };

  return {
    setScreenNumber,
    screenNumber,
    handleNext,
    validate,
    errors,
    clearError,
    verifyOTP,
    shouldVerifyOtp,
    handleKeyDown,
    resendOtp,
    verifyPhoneNumber,
    setOTPNumber,
    OTPNumber,
  };
};
