import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import verifyOTPAction from 'redux/actions/users/verifyOTP';

export default ({
  registrationData,
  setScreenNumber,
  screenNumber,
}) => {
  const dispatch = useDispatch();
  const { verifyOTP } = useSelector(({ user }) => user);

  const [errors, setErrors] = useState({});
  const { countryCode, phoneNumber, OTP } = registrationData;

  const handleVerifyOTP = () => {
    verifyOTPAction(`${countryCode}${phoneNumber}`, OTP)(dispatch);
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
    const otpError = OTP
      ? ''
      : 'Please enter the OTP code sent via SMS';

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
      setScreenNumber(4);
    }
  }, [verifyOTP]);

  return {
    setScreenNumber,
    screenNumber,
    handleNext,
    validate,
    errors,
    clearError,
    verifyOTP,
  };
};
