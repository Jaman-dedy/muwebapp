import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import checkPassword from 'utils/checkPassword';
import { postResetPassword } from 'redux/actions/users/resetPassword';

import { postResetPasswordPrequalification } from 'redux/actions/users/resetPasswordPrequalification';

export default ({ resetPasswordData, screenNumber, PIN }) => {
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0); // passwordStrength in percentage
  const dispatch = useDispatch();

  const { verifyOTP, resetPasswordPrequalification } = useSelector(
    ({ user }) => user,
  );

  const formatDate = value => {
    return `0${value}`.substr(-2);
  };

  const {
    personalId,
    phoneNumber,
    DOB,
    password,
  } = resetPasswordData;

  const clearError = () => {
    setErrors({});
  };

  useEffect(() => {
    if (PIN.length !== 6) {
      clearError();
    }
  }, [PIN]);
  useEffect(() => {
    if (verifyOTP.error) {
      setErrors(verifyOTP.error);
    }
  }, [verifyOTP.error]);

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
  }, [resetPasswordData]);

  /**
   * @returns {bool} true if no error
   */
  const validate = () => {
    const passwordError = password
      ? ''
      : global.translate('New password');

    setErrors({
      ...errors,
      password: passwordError,
    });
    return !passwordError;
  };

  const resendOTP = () => {
    const date = resetPasswordData.DOB;

    const fullDate = `${date.getFullYear()}-${formatDate(
      date.getMonth() + 1,
    )}-${formatDate(date.getDate())}`;
    const payload = {
      ...resetPasswordData,
      DOB: fullDate,
      phoneNumber,
    };
    postResetPasswordPrequalification(payload)(dispatch);
  };

  const handleNext = () => {
    const fullDate = `${DOB?.getFullYear()}-${formatDate(
      DOB?.getMonth() + 1,
    )}-${formatDate(DOB?.getDate())}`;

    const resetPwdPayload = {
      DOB: fullDate,
      PhoneNumber: `${phoneNumber}`,
      NewPassword: password,
      PID: personalId,
      OTP: PIN,
    };
    if (validate()) {
      postResetPassword(resetPwdPayload)(dispatch);
    }
  };

  return {
    handleNext,
    validate,
    errors,
    clearError,
    passwordStrength,
    resendOTP,
    resetPasswordPrequalification,
  };
};
