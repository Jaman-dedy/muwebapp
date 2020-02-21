/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Message } from 'semantic-ui-react';
import Feedback from 'components/common/Feedback/Feedback';
import PasswordInput from 'components/common/PasswordInput';
import PinCodeForm from 'components/common/PinCodeForm';
import './style.scss';

const LoginForm = ({
  handleChange,
  credentials,
  onSubmit,
  isLoading,
  error,
  pidError,
  passwordError,
  pinError,
  isFormValid,
  clearLoginUser,
}) => {
  return (
    <>
      {error && (
        <Feedback
          message={
            error && error.error && error.error[0]
              ? error.error[0].Description
              : error && error.error && error.error.error
          }
          title="error"
          callbackFn={clearLoginUser}
        />
      )}
      {!error && (
        <Form onSubmit={onSubmit} autoComplete="off">
          <Form.Field>
            <Form.Input
              error={
                pidError && {
                  content: pidError.toString(),
                  pointing: 'above',
                }
              }
              className="formInput"
              placeholder="Enter your Personal ID"
              name="PID"
              value={credentials.PID || ''}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <PasswordInput
              error={
                passwordError && {
                  content: passwordError.toString(),
                  pointing: 'above',
                }
              }
              placeholder="Enter your Password"
              onChange={handleChange}
              type="password"
              name="Password"
              value={credentials.Password || ''}
              icon="eye"
            />
          </Form.Field>

          <PinCodeForm
            pinError={pinError}
            onChange={handleChange}
            name="PIN"
            value={credentials.PIN || ''}
          />

          {error !== null ? (
            <Message negative visible={error !== null}>
              <Message.Header>Error</Message.Header>
              <p>
                {error && error.error && error.error[0]
                  ? error.error[0].Description
                  : error && error.error && error.error.error}
              </p>
            </Message>
          ) : null}

          <Form.Button
            primary
            loading={isLoading}
            disabled={isLoading || !isFormValid}
            fluid
            onClick={onSubmit}
            type="submit"
            className="submit-button"
          >
            SIGN IN
          </Form.Button>
          <p>
            Forgot your{' '}
            <span className="from_login_link">
              <Link to="/">Password</Link>{' '}
            </span>{' '}
            or your{' '}
            <span className="from_login_link">
              <Link to="/">Pin?</Link>{' '}
            </span>
          </p>
          <p>
            Don't have an account{' '}
            <span className="from_login_link">
              <Link to="/register">signUp?</Link>{' '}
            </span>{' '}
          </p>
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
  error: PropTypes.string,
  pidError: PropTypes.string,
  passwordError: PropTypes.string,
  pinError: PropTypes.string,
  isFormValid: PropTypes.bool,
  clearLoginUser: PropTypes.func,
};

LoginForm.defaultProps = {
  isLoading: false,
  error: null,
  pidError: null,
  passwordError: null,
  pinError: null,
  isFormValid: false,
  clearLoginUser: () => { },
};

export default LoginForm;
