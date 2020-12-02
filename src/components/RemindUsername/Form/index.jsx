/* eslint-disable react/no-unescaped-entities */
import './style.scss';
import 'assets/styles/spinner.scss';

import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Message } from 'semantic-ui-react';
import PinCodeForm from 'components/common/PinCodeForm';
import PasswordInput from 'components/common/PasswordInput';
import Feedback from 'components/common/Feedback/Feedback';

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
  return (
    <>
      {!error && (
        <Form
          onSubmit={onSubmit}
          autoComplete="off"
          className="login-form-ui"
          onKeyDown={onKeyDown}
        >
          <Form.Field>
            <Form.Input
              placeholder={global.translate('Username', 1992)}
              name="PID"
              value=""
              onChange={handleChange}
            />
          </Form.Field>
          <div className="clear" />
          <button
            loading={isLoading}
            disabled={isLoading}
            onClick={onSubmit}
            type="submit"
            className="btn-auth btn-secondary"
          >
            {global.translate('Submit', 1695).toUpperCase()}
            {isLoading && <div className="loading-button" />}
          </button>
          <div className="clear" />
          {global.translate('Back to', 1200)}{' '}
          <Link to="/login">{global.translate('Login', 190)}</Link>
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
