/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import getUserLoginStatus, {
  clearLoginUserStatus,
} from 'redux/actions/users/loginStatus';
import LoginUserAction, {
  clearLoginUser,
} from 'redux/actions/users/login';
import getUserLocationDataAction from 'redux/actions/users/userLocationData';

import Login from 'components/Login';
import useGeoLocation from 'hooks/useGeoLocation';
import useDeviceType from 'hooks/useDeviceType';
import isAuth from 'utils/isAuth';
import sendOTPAction from 'redux/actions/users/sendOTP';

const LoginContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const {
    user: { userLocationData },
  } = useSelector(state => state);
  const {
    login: { error, loading: loadLoginUser },
    loginStatus: { error: userStatusError, loading: loadUserStatus },
    currentUser: { authData },
    sendOTP: { loading: sendOTPLoading },
  } = useSelector(({ user }) => user);

  const [form, setForm] = useState({});
  const [pidError, setPidError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [switchInput, setSwitchInput] = useState('');
  const [displayUsername, setDisplayUsername] = useState(true);
  const [phoneValue, setPhoneValue] = useState(null);
  const [webUserStep, setWebUserStep] = useState(false);
  const [OTPNumber, setOTPNumber] = useState('');
  const [PIN, setPIN] = useState('');
  const [ussdUserStep, setUssdUserStep] = useState(false);

  useEffect(() => {
    if (!userLocationData?.CountryCode) {
      getUserLocationDataAction()(dispatch);
    }
  }, []);

  const handleChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
    if (name === 'PID') {
      setSwitchInput(value);
    }
    clearLoginUser()(dispatch);
    clearLoginUserStatus()(dispatch);
  };

  const geoData = useGeoLocation();
  const {
    deviceType,
    deviceOs,
    osVersion,
    clientName,
    clientVersion,
  } = useDeviceType();

  const body = {
    PID: form.PID || phoneValue,
    Password: form.Password || '',
    CountryCode:
      (userLocationData && userLocationData.CountryCode) || '',
    PhoneNumber: '',
    IMEI: '',
    SerialNumber: '',
    DeviceOS: deviceOs || '',
    Description: '2U Web Authentication',
    OSVersion: osVersion || '',
    MAC: 'Not found',
    Roaming: '0',
    DeviceType: deviceType,
    AppType: 4,
    Longitude: geoData.longitude || 0,
    Latitude: geoData.latitude || 0,
    ClientName: clientName,
    ClientVersion: clientVersion,
    PIN: '',
    OTP: '',
  };
  const data = {
    PID: form?.PID || phoneValue,
  };

  useEffect(() => {
    if (form.PID !== '' || phoneValue?.length) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [form, phoneValue]);

  useEffect(() => {
    if (error) {
      setForm({ ...form, digit0: '' });
      setForm({ ...form, digit1: '' });
      setForm({ ...form, digit2: '' });
      setForm({ ...form, digit3: '' });
    }
  }, [error]);
  useEffect(() => {
    if (authData && isAuth()) {
      if (authData.Result !== 'NO') {
        if (location.state?.next) {
          history.push(location.state.next);
        } else {
          history.push('/');
        }
      }
    }
  }, [authData, history]);

  const onCheckUserStatus = () => {
    getUserLoginStatus(data)(dispatch);
  };
  const onKeyDown = e => {
    if (e.keyCode === 13) {
      if ((form?.PID || phoneValue) && !webUserStep) {
        getUserLoginStatus(data)(dispatch);
      } else {
        LoginUserAction(body)(dispatch);
      }
    }
  };
  const isNumeric = number => {
    return !isNaN(number);
  };

  useEffect(() => {
    if (switchInput?.length) {
      if (isNumeric(switchInput)) {
        setForm({
          ...form,
          PID: '',
        });
        setDisplayUsername(false);
        setPhoneValue(switchInput);
      } else {
        setDisplayUsername(true);
      }
    }
  }, [switchInput]);

  useEffect(() => {
    if (phoneValue?.length) {
      setDisplayUsername(false);
    } else {
      setDisplayUsername(true);
    }
  }, [phoneValue]);

  const onLoginHandle = () => {
    LoginUserAction(body)(dispatch);
  };

  const loginUssdUser = () => {
    LoginUserAction({ ...body, PIN, OTP: OTPNumber })(dispatch);
  };

  useEffect(() => {
    if (OTPNumber?.length < 6 || PIN?.length < 4) {
      clearLoginUser()(dispatch);
    }
  }, [PIN, OTPNumber]);
  const resendOtp = () => {
    sendOTPAction(phoneValue || authData.PhoneNumber)(dispatch);
  };

  return (
    <Login
      credentials={form}
      handleChange={handleChange}
      onCheckUserStatus={onCheckUserStatus}
      loadUserStatus={loadUserStatus}
      error={error}
      setCredentials={setForm}
      form={form}
      pidError={pidError}
      passwordError={passwordError}
      isFormValid={isFormValid}
      clearLoginUser={clearLoginUser}
      onKeyDown={onKeyDown}
      displayUsername={displayUsername}
      userLocationData={userLocationData}
      setPhoneValue={setPhoneValue}
      phoneValue={phoneValue}
      onLoginHandle={onLoginHandle}
      webUserStep={webUserStep}
      setWebUserStep={setWebUserStep}
      loadLoginUser={loadLoginUser}
      setOTPNumber={setOTPNumber}
      OTPNumber={OTPNumber}
      PIN={PIN}
      setPIN={setPIN}
      ussdUserStep={ussdUserStep}
      setUssdUserStep={setUssdUserStep}
      loginUssdUser={loginUssdUser}
      resendOtp={resendOtp}
      userStatusError={userStatusError?.error?.[0]}
      sendOTPLoading={sendOTPLoading}
    />
  );
};

export default LoginContainer;
