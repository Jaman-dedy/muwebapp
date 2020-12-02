/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Form, Message } from 'semantic-ui-react';
import PinCodeForm from 'components/common/PinCodeForm';
import PasswordInput from 'components/common/PasswordInput';
import Feedback from 'components/common/Feedback/Feedback';
import './style.scss';
import 'assets/styles/spinner.scss';

const LoginForm = ({
  handleChange,
  credentials,
  onSubmit,
  isLoading,
  error,
  pidError,
  passwordError,
  pinError,
  clearLoginUser,
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
        <Feedback
          message={
            error.error[0]
              ? global.translate(error.error[0].Description)
              : global.translate(error.error.error, 162)
          }
          title="error"
          callbackFn={clearLoginUser}
        />
      )}
      {!error && (
        <Form
          onSubmit={onSubmit}
          autoComplete="off"
          className="login-form-ui"
          onKeyDown={onKeyDown}
        >
          <Form.Field>
            <Form.Input
              error={
                pidError && {
                  content: global.translate(pidError.toString()),
                  pointing: 'above',
                }
              }
              placeholder={global.translate('Username', 1992)}
              name="PID"
              value={(credentials.PID && credentials.PID) || ''}
              onChange={handleChange}
            />
          </Form.Field>
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
          <div className="wrap-pin">
            <PinCodeForm
              pinError={pinError}
              onChange={handleChange}
              name="PIN"
              value={credentials.PIN || ''}
            />
          </div>
          {error !== null ? (
            <Message basic color="red" visible={error !== null}>
              <Message.Header>
                {global.translate('Error', 195)}
              </Message.Header>
              <p>
                {error && error.error && error.error[0]
                  ? global.translate(error.error[0].Description)
                  : global.translate(
                      error && error.error && error.error.error,
                    )}
              </p>
            </Message>
          ) : null}

          <div className="clear" />
          <button
            loading={isLoading}
            disabled={isLoading}
            onClick={onSubmit}
            type="submit"
            className="btn-auth btn-secondary"
          >
            {global.translate('Connect', 4).toUpperCase()}
            {isLoading && <div className="loading-button" />}
          </button>
          <div className="clear" />

          {showOption && (
            <>
              <div className="from_login_link">
                {global.translate(
                  'Forgot your Password or your PIN ?',
                  182,
                )}{' '}
                <Link to="/reset-password">
                  {global.translate('Click here', 1705)}
                </Link>
              </div>
              <div className="from_login_link">
                {global.translate('Forgot your Username ?', 182)}{' '}
                <Link to="/remind-username">
                  {global.translate('Click here', 1705)}
                </Link>
              </div>
            </>
          )}

          <div className="btn-signup">
            <div>
              {global.translate('Not yet registered?', 1201)}{' '}
            </div>
            <Link to="/register" className="btn-auth btn-secondary">
              {global.translate('Sign up', 1202)}
            </Link>
          </div>
        </Form>
      )}
    </>
  );
};

LoginForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  credentials: PropTypes.objectOf(PropTypes.any).isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.objectOf(PropTypes.any),
  pidError: PropTypes.string,
  passwordError: PropTypes.string,
  pinError: PropTypes.string,
  clearLoginUser: PropTypes.func,
  onKeyDown: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  isLoading: false,
  error: null,
  pidError: null,
  passwordError: null,
  pinError: null,
  clearLoginUser: () => {},
};

export default LoginForm;
