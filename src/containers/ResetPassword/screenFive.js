import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postResetPassword } from 'redux/actions/users/resetPassword';

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
    KYCDocSent,
    SecurityQuestionSet,
    A1,
    A2,
    A3,
    A4,
    A5,
    password,
    pin,
    OTP,
    countryCode,
  } = resetPasswordData;

  const resetPwdPayload = {
    LastName: lastName,
    DOB: resetPassword.DOBSet === 'Yes' ? DOB : '',
    PhoneNumber: `${phoneNumber}`,
    NewPIN: pin,
    NewPassword: password,
    PID: personalId,
    DOBSet: resetPassword.DOBSet,
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
    postResetPassword(resetPwdPayload)(dispatch);
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
