import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Login from 'components/Login';

const LoginContainer = () => {
  const { login } = useSelector(({ user }) => user);
  const [credentials, setCredentials] = useState({
    personalId: '',
    password: '',
    pin: '',
  });

  const onInputChange = ({ target: { name, value } }) => {
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    return credentials;
  };

  return (
    <Login
      credentials={credentials}
      onInputChange={onInputChange}
      handleSubmit={handleSubmit}
      login={login}
    />
  );
};

export default LoginContainer;
