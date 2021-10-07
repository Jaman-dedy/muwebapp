import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import Register from 'components/Register';
import getUserLocationDataAction from 'redux/actions/users/userLocationData';
import identityData from './identityData';
import verifyOtp from './verifyOtp';
import userNameData from './userNameData';
import congratulationPage from './congratulationPage';

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
    DateOfBirth: '',
  });

  const { userLocationData } = useSelector(({ user }) => user);

  const location = useLocation();
  const queryParams = queryString.parse(location.search);

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
  const { referrer } = queryParams;

  useEffect(() => {
    if (referrer?.length) {
      setRegistrationData({
        ...registrationData,
        ReferralPID: referrer,
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
      identityData={identityData({
        registrationData,
        setScreenNumber,
        screenNumber,
        setRegistrationData,
      })}
      verifyOtp={verifyOtp({
        registrationData,
        setScreenNumber,
        screenNumber,
      })}
      userNameData={userNameData({
        registrationData,
        setScreenNumber,
        setRegistrationData,
      })}
      congratulationPage={congratulationPage()}
    />
  );
};

export default RegisterContainer;
