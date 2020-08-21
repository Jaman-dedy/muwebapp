import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setResetPasswordDataAction } from 'redux/actions/users/resetPassword';

import ResetPassword from 'components/ResetPassword';
import screenOne from './screenOne';
import screenTwo from './screenTwo';
import screenThree from './screenThree';
import screenFour from './screenFour';
import screenFive from './screenFive';
import screenSix from './screenSix';

const ResetPasswordContainer = () => {
  const dispatch = useDispatch();
  const { resetPassword } = useSelector(({ user }) => user);
  const [screenNumber, setScreenNumber] = useState(1);
  const [resetPasswordData, setResetPasswordData] = useState({
    personalId: '',
    lastName: '',
    phoneNumber: '',
    DOB: '',
    DOBSet: 'No',
    KYCDocSent: 'No',
    SecurityQuestionSet: 'No',
    A1: '',
    A2: '',
    A3: '',
    A4: '',
    A5: '',
    password: '',
    confirmPassword: '',
    pin: '',
    confirmPin: '',
    OTP: '',
    digit1: '',
    digit2: '',
    digit3: '',
    digit4: '',
    digit5: '',
    digit6: '',
  });

  const handleInputChange = ({ target: { name, value } }) => {
    console.log(name, value);
    setResetPasswordData({
      ...resetPasswordData,
      [name]: value,
    });

    if (name === 'DOBSet') {
      setResetPasswordDataAction({ DOBSet: value })(dispatch);
    }
  };

  useEffect(() => {
    console.log(resetPassword);
  }, [resetPassword]);

  return (
    <ResetPassword
      resetPasswordData={resetPasswordData}
      setResetPasswordData={setResetPasswordData}
      handleInputChange={handleInputChange}
      screenNumber={screenNumber}
      setScreenNumber={setScreenNumber}
      resetPasswordRdx={resetPassword}
      screenOne={screenOne({
        resetPasswordData,
        setScreenNumber,
        screenNumber,
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
      })}
      screenFour={screenFour({
        resetPasswordData,
        setScreenNumber,
      })}
      screenFive={screenFive({
        resetPasswordData,
        setScreenNumber,
      })}
      screenSix={screenSix({
        resetPasswordData,
        setScreenNumber,
      })}
    />
  );
};
export default ResetPasswordContainer;
