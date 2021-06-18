/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Form, Message, Grid } from 'semantic-ui-react';
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
  const [errors, setErrors] = useState(null);
  useEffect(() => {
    if (error) {
      setErrors(
        Array.isArray(error?.error)
          ? error?.error[0] || {}
          : error?.error || {},
      );
    }
  }, [error]);
  useEffect(() => {
    if (error) {
      setShowOptions(true);
    }
  }, [error]);

  return (
    <>
      {error && <AlertDanger message={errors?.Description} />}
      <Form
        onSubmit={onSubmit}
        autoComplete="off"
        className="login-form-ui"
        onKeyDown={onKeyDown}
      >
        <Grid columns={1}>
          <Grid.Row>
            <Grid.Column>
              <div className="sub-titles">
                {global.translate('Your username')}
              </div>
              <Form.Field>
                <Form.Input
                  placeholder={global.translate('Username')}
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
            </Grid.Column>
            <div className="clear" />
            <Grid.Column>
              <div className="sub-titles">
                {global.translate('Your password')}
              </div>
              <Form.Field>
                <PasswordInput
                  error={
                    passwordError && {
                      content: global.translate(
                        passwordError.toString(),
                      ),
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
            </Grid.Column>
            <Grid.Column>
              <button
                loading={isLoading}
                disabled={isLoading}
                onClick={onSubmit}
                type="submit"
                className="btn-auth btn-auth-primary"
              >
                {global.translate('Connect', 4).toUpperCase()}
                {isLoading && <div className="loading-button" />}
              </button>
              <div className="clear" />

              {showOption && (
                <div className="from_login_link">
                  {global.translate('Forgot your Password?')}{' '}
                  <Link to="/reset-password">
                    {global.translate('Click here')}
                  </Link>
                  <div className="clear" />
                  {global.translate('Forgot your Username?')}{' '}
                  <Link to="/remind-username">
                    {global.translate('Click here')}
                  </Link>
                </div>
              )}

              <div>
                <div>{global.translate('Not yet registered?')} </div>
                <Link to="/register" className="btn-auth">
                  {global.translate('Sign up').toUpperCase()}
                </Link>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
