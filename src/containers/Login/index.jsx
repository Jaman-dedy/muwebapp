/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import loginUser, { clearLoginUser } from 'redux/actions/users/login';
import getUserLocationDataAction from 'redux/actions/users/userLocationData';

import Login from 'components/Login';
import useGeoLocation from 'hooks/useGeoLocation';
import useDeviceType from 'hooks/useDeviceType';
import isAuth from 'utils/isAuth';

const LoginContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const {
    user: { userLocationData },
  } = useSelector(state => state);

  useEffect(() => {
    if (!userLocationData?.CountryCode) {
      getUserLocationDataAction()(dispatch);
    }
  }, []);

  const [form, setForm] = useState({});
  const [pidError, setPidError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
    if (name === 'PID') {
      setPidError(null);
    }
    if (name === 'Password') {
      setPasswordError(null);
    }
    clearLoginUser()(dispatch);
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
    PID: form.PID || '',
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
  };

  useEffect(() => {
    if (body.PID !== '' && body.Password) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [body]);

  const { error, loading } = useSelector(
    ({ user: { login } }) => login,
  );
  const { authData } = useSelector(state => state.user.currentUser);
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

  const handleSubmit = () => {
    if (!body.PID.length > 0) {
      setPidError(
        global.translate('Please provide a valid Username', 2071),
      );
      return;
    }

    setPidError(null);
    if (!body.Password > 0) {
      setPasswordError(
        global.translate(
          'Please provide a valid Password. It must contains at least 8 digits and at least one special character such as (!@#$%&*).',
          46,
        ),
      );
      return;
    }
    setPasswordError(null);
    loginUser(body)(dispatch);
  };
  const onKeyDown = e => {
    if (e.keyCode === 13) {
      if (!body.PID.length > 0) {
        setPidError(
          global.translate('Please provide a valid Username', 2071),
        );
        return;
      }
      setPasswordError(null);
      loginUser(body)(dispatch);
    }
  };

  return (
    <Login
      credentials={form}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      loading={loading}
      error={error}
      setCredentials={setForm}
      form={form}
      pidError={pidError}
      passwordError={passwordError}
      isFormValid={isFormValid}
      clearLoginUser={clearLoginUser}
      onKeyDown={onKeyDown}
    />
  );
};

export default LoginContainer;
