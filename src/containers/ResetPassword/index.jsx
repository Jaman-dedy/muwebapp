import React, { useState } from 'react';

import ResetPassword from 'components/ResetPassword';
import screenOne from './screenOne';
import screenTwo from './screenTwo';
import screenThree from './screenThree';
import screenFour from './screenFour';
import screenFive from './screenFive';
import screenSix from './screenSix';

const ResetPasswordContainer = () => {
  const [screenNumber, setScreenNumber] = useState(1);
  const [resetPasswordData, setResetPasswordData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    countryCode: '',
    digit1: '',
    digit2: '',
    digit3: '',
    digit4: '',
    digit5: '',
    digit6: '',
    personalId: '',
    password: '',
    confirmPassword: '',
    pin: '',
    confirmPin: '',
  });

  const handleInputChange = ({ target: { name, value } }) => {
    setResetPasswordData({
      ...resetPasswordData,
      [name]: value,
    });
  };

  return (
    <ResetPassword
      resetPasswordData={resetPasswordData}
      setResetPasswordData={setResetPasswordData}
      handleInputChange={handleInputChange}
      screenNumber={screenNumber}
      setScreenNumber={setScreenNumber}
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
      screenSix={screenSix()}
    />
  );
};
export default ResetPasswordContainer;
