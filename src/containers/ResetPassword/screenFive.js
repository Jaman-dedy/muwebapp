import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import resetPasswordAction from 'redux/actions/users/resetPassword';
import clearResetUserFX from 'redux/actions/users/clearResetPassword';

export default ({
  resetPasswordData,
  setScreenNumber,
  screenNumber,
}) => {
  const dispatch = useDispatch();
  const { verifyOTP, resetPassword } = useSelector(
    ({ user }) => user,
  );

  const {
    personalId,
    lastName,
    phoneNumber,
    DOB,
    DOBSet,
    KYCDocSent,
    SecurityQuestionSet,
    A1,
    A2,
    A3,
    A4,
    A5,
    password,
    pin,
    countryCode,
    digit1,
    digit2,
    digit3,
    digit4,
    digit5,
    digit6,
  } = resetPasswordData;

  const OTP = `${digit1}${digit2}${digit3}${digit4}${digit5}${digit6}`;

  const resetPwdPayload = {
    LastName: lastName,
    DOB,
    PhoneNumber: `${countryCode}${phoneNumber}`,
    NewPIN: pin,
    NewPassword: password,
    PID: personalId,
    DOBSet,
    OTP,
    KYCDocSent,
    SecurityQuestionSet,
    A1,
    A2,
    A3,
    A4,
    A5,
  };

  const handleNext = () => {
    resetPasswordAction(resetPwdPayload)(dispatch);
  };

  useEffect(() => {
    if (resetPassword.success) {
      setScreenNumber(6);
    }
  }, [resetPassword]);

  return {
    setScreenNumber,
    screenNumber,
    handleNext,
    verifyOTP,
    resetPassword,
    clearResetUserFX,
  };
};
