import React, { useState } from 'react';

import Register from 'components/Register';
import screenOne from './screenOne';
import screenTwo from './screenTwo';
import screenThree from './screenThree';
import screenFour from './screenFour';
import screenFive from './screenFive';
import screenSix from './screenSix';
import screenSeven from './screenSeven';
import referralScreen from './referralScreen';

const RegisterContainer = () => {
  const [screenNumber, setScreenNumber] = useState(1);
  const [isPhoneNumberInvalid, setIsPhoneNumberInvalid] = useState(
    false,
  );
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
    if (name === 'phoneNumber' && value.length >= 13) {
      return true;
    }
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
        isPhoneNumberInvalid,
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
