import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import verifyOTPAction from 'redux/actions/users/verifyOTP';

export default ({
  resetPasswordData,
  setScreenNumber,
  screenNumber,
}) => {
  const dispatch = useDispatch();
  const { verifyOTP } = useSelector(({ user }) => user);

  const [errors, setErrors] = useState({});
  const {
    countryCode,
    phoneNumber,
    digit1,
    digit2,
    digit3,
    digit4,
    digit5,
    digit6,
  } = resetPasswordData;

  const OTP = `${digit1}${digit2}${digit3}${digit4}${digit5}${digit6}`;

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
    const digit1Error = digit1 ? '' : 'Please Enter your digit 1';

    const digit2Error = digit2 ? '' : 'Please Enter your digit 2';

    const digit3Error = digit3 ? '' : 'Please Enter your digit 3';

    const digit4Error = digit4 ? '' : 'Please Enter your digit 4';

    const digit5Error = digit5 ? '' : 'Please Enter your digit 5';

    const digit6Error = digit6 ? '' : 'Please Enter your digit 6';

    setErrors({
      ...errors,
      digit1: digit1Error,
      digit2: digit2Error,
      digit3: digit3Error,
      digit4: digit4Error,
      digit5: digit5Error,
      digit6: digit6Error,
    });
    return !(
      digit1Error ||
      digit2Error ||
      digit3Error ||
      digit4Error ||
      digit5Error ||
      digit6Error
    );
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
