/* eslint-disable react/no-unescaped-entities */
import './style.scss';
import 'assets/styles/spinner.scss';

import PropTypes from 'prop-types';
import React from 'react';
import PhoneInput from 'react-phone-input-2';
import { Link } from 'react-router-dom';
import { Form, Message } from 'semantic-ui-react';

const LoginForm = ({
  handleChange,
  onSubmit,
  isLoading,
  error,
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
            <div className="user-phone-number">
              <PhoneInput
                enableSearch
                name="phoneNumber"
                country="cm"
                placeholder="e.g.: 788 000 000"
                // value={phoneValue}
                // onChange={phone => setPhoneValue(phone)}
              />
            </div>
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
