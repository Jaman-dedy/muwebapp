import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Register from 'components/Register';
import getUserLocationDataAction from 'redux/actions/users/userLocationData';
import screenOne from './screenOne';
import screenThree from './screenThree';
import screenFour from './screenFour';
import screenFive from './screenFive';
import screenSix from './screenSix';
import screenSeven from './screenSeven';
import referralScreen from './referralScreen';

const RegisterContainer = () => {
  const dispatch = useDispatch();
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

  const { userLocationData } = useSelector(({ user }) => user);

  const handleInputChange = ({ target: { name, value } }) => {
    setRegistrationData({
      ...registrationData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (!userLocationData?.CountryCode) {
      getUserLocationDataAction()(dispatch);
    }
  }, []);

  useEffect(() => {
    if (userLocationData?.CountryCode) {
      setRegistrationData({
        ...registrationData,
        countryCode: userLocationData?.CountryCode,
      });
    }
  }, [userLocationData]);

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
