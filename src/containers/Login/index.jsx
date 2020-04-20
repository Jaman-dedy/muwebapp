import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DeviceDetector from 'device-detector-js';
import loginUser, { clearLoginUser } from 'redux/actions/users/login';
import getUserLocationDataAction from 'redux/actions/users/userLocationData';
import Login from 'components/Login';

const LoginContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [geoData, setGeoData] = useState({});
  const deviceDetector = new DeviceDetector();
  const { userAgent } = navigator;
  const { os, client, device } = deviceDetector.parse(userAgent);
  const getDeviceType = () => {
    if (device.type === 'tablet') {
      return 2;
    }
    if (os.name === 'GNU/Linux') {
      return 6;
    }
    if (device.type === 'smartphone') {
      return 1;
    }
    if (os.name === 'Windows') {
      return 5;
    }
    if (os.name === 'Mac') {
      return 4;
    }
    return 0;
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        res => {
          const { latitude, longitude } = res.coords;
          setGeoData({ latitude, longitude });
        },
        () => {
          setGeoData({ latitude: 0, longitude: 0 });
        },
      );
    }
    return { latitude: 0, longitude: 0 };
  };

  useEffect(() => {
    getLocation();
    getUserLocationDataAction()(dispatch);
  }, []);
  const {
    user: { userLocationData },
  } = useSelector(state => state);
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

  const body = {
    PID: form.PID || '',
    Password: form.Password || '',
    PIN: PIN || '',
    CountryCode:
      (userLocationData && userLocationData.CountryCode) || '',
    PhoneNumber: '',
    IMEI: '',
    SerialNumber: '',
    DeviceOS: os.name || '',
    Description: '2U Web Authentication',
    OSVersion: os.version || '',
    MAC: 'Not found',
    Roaming: '0',
    DeviceType: getDeviceType(),
    AppType: 4,
    Longitude: geoData.longitude || 0,
    Latitude: geoData.latitude || 0,
    ClientName: client.name,
    ClientVersion: client.version,
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

  const { isAuthenticated } = useSelector(
    state => state.user.currentUser,
  );
  useEffect(() => {
    if (error) {
      setForm({ ...form, digit0: undefined });
      setForm({ ...form, digit1: undefined });
      setForm({ ...form, digit2: undefined });
      setForm({ ...form, digit3: undefined });
    }
  }, [error]);

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated, history]);

  const handleSubmit = () => {
    if (!body.PID.length > 0) {
      setPidError('Please provide a valid Personal ID');
      return;
    }

    setPidError(null);
    if (!body.Password > 0) {
      setPasswordError(
        'Please provide a valid Password. It must contains at least 8 digits and at least one special character such as (!@#$%&*).',
        46,
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
      pidError={pidError}
      passwordError={passwordError}
      pinError={pinError}
      isFormValid={isFormValid}
      clearLoginUser={clearLoginUser}
    />
  );
};

export default LoginContainer;
