import React, { useState } from 'react';

import Register from 'components/Register';
import screenOne from './screenOne';
import screenThree from './screenThree';
import screenFour from './screenFour';
import screenFive from './screenFive';
import screenSix from './screenSix';
import screenSeven from './screenSeven';
import referralScreen from './referralScreen';

const RegisterContainer = () => {
  const [screenNumber, setScreenNumber] = useState(1);

  const [registrationData, setRegistrationData] = useState({
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
    ReferralPID: '',
    ContactPID: '',
    userAgrees: false,
    OTP: '',
  });
  const handleInputChange = ({ target: { name, value } }) => {
    setRegistrationData({
      ...registrationData,
      [name]: value,
    });
  };

  return (
    <Register
      registrationData={registrationData}
      setRegistrationData={setRegistrationData}
      handleInputChange={handleInputChange}
      screenNumber={screenNumber}
      setScreenNumber={setScreenNumber}
      screenOne={screenOne({
        registrationData,
        setScreenNumber,
        screenNumber,
        setRegistrationData,
      })}
      screenThree={screenThree({
        registrationData,
        setScreenNumber,
        screenNumber,
      })}
      screenFour={screenFour({
        registrationData,
        setScreenNumber,
      })}
      screenFive={screenFive({
        registrationData,
        setScreenNumber,
        screenNumber,
      })}
      screenSix={screenSix({
        registrationData,
        setScreenNumber,
      })}
      referralScreen={referralScreen({
        registrationData,
        setScreenNumber,
        setRegistrationData,
      })}
      screenSeven={screenSeven()}
    />
  );
};

export default RegisterContainer;
