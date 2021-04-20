import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setResetPasswordDataAction } from 'redux/actions/users/resetPassword';
import ResetPassword from 'components/ResetPassword';
import verifyOTPAction from 'redux/actions/users/verifyOTP';
import sendOTP from 'redux/actions/users/sendOTP';
import screenOne from './screenOne';
import screenTwo from './screenTwo';
import screenThree from './screenThree';
import screenFive from './screenFive';
import screenSix from './screenSix';

const ResetPasswordContainer = () => {
  const dispatch = useDispatch();
  const { resetPassword, verifyOTP } = useSelector(
    ({ user }) => user,
  );
  const [screenNumber, setScreenNumber] = useState(1);

  const [PIN, setPIN] = useState('');
  const [newPIN, setNewPIN] = useState('');
  const [resendOTP, setResendOTP] = useState(false);

  const [resetPasswordData, setResetPasswordData] = useState({
    personalId: '',
    phoneNumber: '',
    DOB: '',
    password: '',
    pin: '',
  });

  useEffect(() => {
    if (PIN.length === 6)
      verifyOTPAction(resetPasswordData.personalId, PIN)(dispatch);
  }, [PIN]);
  useEffect(() => {
    if (resendOTP) {
      sendOTP(resetPasswordData.phoneNumber)(dispatch);
    }
  }, [resendOTP]);

  const handleInputChange = ({ target: { name, value } }) => {
    setResetPasswordData({
      ...resetPasswordData,
      [name]: value,
    });

    if (name === 'DOBSet') {
      setResetPasswordDataAction({ DOBSet: value })(dispatch);
    }
  };

  return (
    <ResetPassword
      resetPasswordData={resetPasswordData}
      setResetPasswordData={setResetPasswordData}
      handleInputChange={handleInputChange}
      screenNumber={screenNumber}
      setScreenNumber={setScreenNumber}
      resetPasswordRdx={resetPassword}
      verifyOTP={verifyOTP}
      resendOTP={setResendOTP}
      screenOne={screenOne({
        resetPasswordData,
        setScreenNumber,
        screenNumber,
        setResetPasswordData,
      })}
      screenTwo={screenTwo({
        resetPasswordData,
        setScreenNumber,
        screenNumber,
      })}
      screenThree={screenThree({
        resetPasswordData,
        setScreenNumber,
        screenNumber,
        PIN,
      })}
      screenFive={screenFive({
        resetPasswordData,
        setScreenNumber,
      })}
      screenSix={screenSix({
        resetPasswordData,
        setScreenNumber,
      })}
      PIN={PIN}
      setPIN={setPIN}
      newPIN={newPIN}
      setNewPIN={setNewPIN}
    />
  );
};
export default ResetPasswordContainer;
