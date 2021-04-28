import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  postResetPassword,
  clearResetPasswordData,
} from 'redux/actions/users/resetPassword';
import { postResetPasswordPrequalification } from 'redux/actions/users/resetPasswordPrequalification';
import verifyOTP, {
  clearVerifyOTP,
} from 'redux/actions/users/verifyOTP';

export default () => {
  const [newPIN, setNewPIN] = useState('');
  const [OTP, setOTP] = useState('');
  const [step, setStep] = useState(1);
  const [newPassword, setNewPassword] = useState('');
  const [phone, setPhone] = useState({});

  const dispatch = useDispatch();

  const [disableProceed, setDisableProceed] = useState(true);

  const { data } = useSelector(({ user: { userData } }) => userData);
  const verifySentOTP = useSelector(
    ({ user: { verifyOTP } }) => verifyOTP,
  );

  const resetPassword = useSelector(
    ({ user: { resetPassword } }) => resetPassword,
  );

  // get user's main phone number
  useEffect(() => {
    if (data && data?.Phones) {
      const mainPhone = data?.Phones?.find(
        phone => phone.Primary === 'YES',
      );
      setPhone(mainPhone);
    }
  }, [data]);

  useEffect(() => {
    if (verifySentOTP?.isValid) {
      setStep(3);
    }
  }, [verifySentOTP]);

  useEffect(() => {
    if (verifySentOTP?.error && OTP.length !== 6) {
      clearVerifyOTP()(dispatch);
    }
  }, [OTP, verifySentOTP, dispatch]);

  useEffect(() => {
    if (OTP.length === 6) {
      verifyOTP(data?.PID, OTP)(dispatch);
    }
  }, [data?.PID, OTP, dispatch]);

  const resetPreQualification = useSelector(
    ({ user: { resetPasswordPrequalification } }) =>
      resetPasswordPrequalification,
  );

  useEffect(() => {
    if (resetPreQualification?.success) {
      setStep(2);
    }
  }, [resetPreQualification]);

  const handleResetPINPreQualification = useCallback(() => {
    const resetPINPayload = {
      DOB: data?.DateOfBirth,
      phoneNumber: data?.MainPhone,
      personalId: data?.PID,
    };

    postResetPasswordPrequalification(resetPINPayload)(dispatch);
  }, [data, dispatch]);

  useEffect(() => {
    if (step === 2 && OTP.length === 6) {
      setDisableProceed(false);
    } else if (step === 3 && newPIN.length === 4) {
      setDisableProceed(false);
    } else if (step === 3 && newPassword.length >= 8) {
      setDisableProceed(false);
    } else {
      setDisableProceed(true);
    }
    if (step === 1) {
      setNewPIN('');
      setNewPassword('');
      setDisableProceed(false);
    }
  }, [newPIN, OTP, step, newPassword]);

  const clearResetSuccess = useCallback(() => {
    clearResetPasswordData()(dispatch);
    setStep(1);
  }, [dispatch]);

  const handleSubmit = () => {
    const resetPINPayload = {
      DOB: data.DateOfBirth,
      PhoneNumber: data?.MainPhone,
      PID: data.PID,
      OTP,
      NewPassword: newPassword,
    };

    if (newPIN) {
      resetPINPayload.NewPIN = newPIN;
    }
    if (newPassword) {
      resetPINPayload.NewPassword = newPassword;
    }

    postResetPassword(resetPINPayload)(dispatch);
  };
  useEffect(() => {
    if (resetPassword?.success) {
      clearResetSuccess();
    }
  }, [resetPassword, clearResetSuccess]);

  useEffect(() => {
    if (step === 2) {
      clearVerifyOTP()(dispatch);
    } else if (step === 1) {
      clearResetPasswordData()(dispatch);
    }
  }, [step, dispatch]);

  return {
    newPIN,
    setNewPIN,
    OTP,
    setOTP,
    handleSubmit,
    phone,
    loadOnChangePIN: resetPassword?.loading,

    disableProceed,
    handleResetPINPreQualification,
    resetPassword,
    step,
    setStep,
    resetPreQualification,
    newPassword,
    setNewPassword,
    clearResetSuccess,
    verifySentOTP,
  };
};

// twice xw
// card is not active yet.
