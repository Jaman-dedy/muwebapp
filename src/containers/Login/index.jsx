/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import loginUser, { clearLoginUser } from 'redux/actions/users/login';
import getUserLocationDataAction from 'redux/actions/users/userLocationData';
import Login from 'components/Login';
import useGeoLocation from './useGeoLocation';
import useDeviceType from './useDeviceType';

const LoginContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

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
  const [pinError, setPinError] = useState(null);
  const { digit0, digit1, digit2, digit3 } = form;

  const handleChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };
  const PIN = `${digit0}${digit1}${digit2}${digit3}`;

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
    PIN: PIN || '',
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

  const pinIsValid = () => body.PIN.length === 4;
  useEffect(() => {
    if (body.PID !== '' && body.Password !== '' && pinIsValid()) {
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
    if (error) {
      setForm({ ...form, digit0: '' });
      setForm({ ...form, digit1: '' });
      setForm({ ...form, digit2: '' });
      setForm({ ...form, digit3: '' });
    }
  }, [error]);
  useEffect(() => {
    if (authData) {
      if (authData.Result !== 'NO') {
        history.push('/');
      }
    }
  }, [authData, history]);

  const handleSubmit = () => {
    if (!body.PID.length > 0) {
      setPidError(
        global.translate('Please provide a valid Username'),
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
    if (body.PIN.length !== 4) {
      setPinError(
        global.translate('Please provide your PIN number.', 543),
      );
      return;
    }
    setPinError(null);
    loginUser(body)(dispatch);
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
      pinError={pinError}
      isFormValid={isFormValid}
      clearLoginUser={clearLoginUser}
    />
  );
};

export default LoginContainer;
