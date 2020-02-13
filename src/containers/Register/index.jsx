import React, { useState } from 'react';

import Register from 'components/Register';
import screenOne from './screenOne';
import screenTwo from './screenTwo';
import screenThree from './screenThree';
import screenFour from './screenFour';
import screenFive from './screenFive';
import screenSix from './screenSix';
import screenSeven from './screenSeven';

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
      })}
      screenTwo={screenTwo({
        registrationData,
        setScreenNumber,
        screenNumber,
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
      })}
      screenSix={screenSix({
        registrationData,
        setScreenNumber,
      })}
      screenSeven={screenSeven()}
    />
  );
};

export default RegisterContainer;
