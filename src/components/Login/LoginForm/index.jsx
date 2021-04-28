/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Form, Message } from 'semantic-ui-react';
import AlertDanger from 'components/common/Alert/Danger';
import PasswordInput from 'components/common/PasswordInput';
import './style.scss';
import 'assets/styles/spinner.scss';

const LoginForm = ({
  handleChange,
  credentials,
  onSubmit,
  isLoading,
  error,
  passwordError,
  pidError,
  onKeyDown,
}) => {
  const [showOption, setShowOptions] = useState(false);

  useEffect(() => {
    if (error) {
      setShowOptions(true);
    }
  }, [error]);

  return (
    <>
      {error && (
        <AlertDanger
          message={global.translate('Wrong username or password')}
        />
      )}
      <Form
        onSubmit={onSubmit}
        autoComplete="off"
        className="login-form-ui"
        onKeyDown={onKeyDown}
      >
        <div className="sub-titles">
          {global.translate('Your username', 1992)}
        </div>
        <Form.Field>
          <Form.Input
            placeholder={global.translate('Username', 1992)}
            name="PID"
            value={(credentials.PID && credentials.PID) || ''}
            onChange={handleChange}
            error={
              pidError && {
                content: pidError,
                pointing: 'above',
              }
            }
          />
        </Form.Field>
        <div className="sub-titles">
          {global.translate('Your password', 2)}
        </div>
        <Form.Field>
          <PasswordInput
            error={
              passwordError && {
                content: global.translate(passwordError.toString()),
                pointing: 'above',
              }
            }
            placeholder={global.translate('Password', 2)}
            onChange={handleChange}
            type="password"
            name="Password"
            value={credentials.Password || ''}
            icon="eye"
          />
        </Form.Field>

        <div className="clear" />
        <button
          loading={isLoading}
          disabled={isLoading}
          onClick={onSubmit}
          type="submit"
          className="btn-auth btn-login"
        >
          {global.translate('Connect', 4).toUpperCase()}
          {isLoading && <div className="loading-button" />}
        </button>
        <div className="clear" />

        {showOption && (
          <>
            <div className="from_login_link">
              {global.translate('Forgot your Password?')}{' '}
              <Link to="/reset-password">
                {global.translate('Click here', 1705)}
              </Link>
            </div>
            <div className="from_login_link">
              {global.translate('Forgot your Username ?', 2178)}{' '}
              <Link to="/remind-username">
                {global.translate('Click here', 1705)}
              </Link>
            </div>
          </>
        )}

        <div className="btn-signup-login">
          <div>{global.translate('Not yet registered?', 1201)} </div>
          <Link to="/register" className="btn-auth">
            {global.translate('Sign up', 1202).toUpperCase()}
          </Link>
        </div>
      </Form>
    </>
  );
};

LoginForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  credentials: PropTypes.objectOf(PropTypes.any).isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.objectOf(PropTypes.any),
  passwordError: PropTypes.string,
  onKeyDown: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  isLoading: false,
  error: null,
  passwordError: null,
};

export default LoginForm;
