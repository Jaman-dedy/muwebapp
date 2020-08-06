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
  clearLoginUser,
}) => {
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
          className="form-information"
          onSubmit={onSubmit}
          autoComplete="off"
        >
          <Form.Field>
            <Form.Input
              error={
                pidError && {
                  content: global.translate(pidError.toString()),
                  pointing: 'above',
                }
              }
              className="formInput"
              placeholder={global.translate('Username')}
              name="PID"
              value={
                (credentials.PID && credentials.PID.toUpperCase()) ||
                ''
              }
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
              placeholder={global.translate('Password')}
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
            <Message basic color="red" visible={error !== null}>
              <Message.Header>
                {global.translate('Error')}
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

          <Form.Button
            primary
            loading={isLoading}
            disabled={isLoading}
            fluid
            onClick={onSubmit}
            type="submit"
            className="submit-button"
          >
            {global.translate('Connect').toUpperCase()}
          </Form.Button>
          <div className="from_login_link">
            {global.translate(
              'Forgot your Password or your PIN ?',
              182,
            )}{' '}
            <Link to="/reset-password">
              {global.translate('Click here')}
            </Link>
          </div>
          <div className="btn-signup">
            <span>
              {global.translate('Not yet registered?', 1201)}{' '}
            </span>
            <Link to="/register">{global.translate('Sign up')}</Link>
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
  clearLoginUser: () => {},
};

export default LoginForm;
