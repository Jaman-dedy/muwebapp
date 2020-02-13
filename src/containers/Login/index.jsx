import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import loginUser, { clearLoginUser } from 'redux/actions/users/login';

import Login from 'components/Login';

const LoginContainer = () => {
  const [form, setForm] = useState({});
  const [pidError, setPidError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const [pinError, setPinError] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const { digit0, digit1, digit2, digit3 } = form;

  const handleChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  const PIN = `${digit0}${digit1}${digit2}${digit3}`;
  const body = {
    PID: form.PID || '',
    Password: form.Password || '',
    PIN: PIN || '',
  };
  const pinIsValid = () => body.PIN.length === 4;
  useEffect(() => {
    if (body.PID !== '' && body.Password !== '' && pinIsValid()) {
      setIsFormValid(true);
    }
  }, [body]);

  const { error, loading } = useSelector(
    ({ user: { login } }) => login,
  );

  const { isAuthenticated } = useSelector(
    state => state.user.currentUser,
  );

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated, history]);

  const handleSubmit = () => {
    if (!body.PID.length > 0) {
      setPidError('Please enter your Personal ID');
      return;
    }

    setPidError(null);
    if (!body.Password > 0) {
      setPasswordError('Please enter your Password');
      return;
    }
    setPasswordError(null);
    if (body.PIN.length !== 4) {
      setPinError('Please provide your 4 digit Pin');
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
