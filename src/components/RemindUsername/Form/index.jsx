/* eslint-disable react/no-unescaped-entities */
import 'react-phone-input-2/lib/style.css';
import './style.scss';
import 'assets/styles/spinner.scss';

import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

import PhoneInput from 'react-phone-input-2';
import { Link } from 'react-router-dom';
import { Form } from 'semantic-ui-react';
import Feedback from 'components/common/Feedback/Feedback';

const LoginForm = ({
  onSubmit,
  isLoading,
  error,
  onKeyDown,
  phoneValue,
  setPhoneValue,
  clearRemindUsername,
  data,
}) => {
  const {
    userLocationData: { CountryCode },
  } = useSelector(({ user }) => user);

  return (
    <>
      {error && (
        <Feedback
          message={global.translate(error.Description)}
          title="error"
          callbackFn={clearRemindUsername}
        />
      )}
      {data && (
        <Feedback
          message={global.translate(data.Description)}
          title="Success"
          success
          callbackFn={clearRemindUsername}
        />
      )}
      {!error && !data && (
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
                country={CountryCode}
                placeholder="e.g.: 788 000 000"
                value={phoneValue}
                onChange={phone => setPhoneValue(phone)}
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
          {global.translate('Back to')}{' '}
          <Link to="/login">{global.translate('Login', 190)}</Link>
        </Form>
      )}
      {data && (
        <div style={{ marginTop: '10px' }}>
          {global.translate('Back to')}{' '}
          <Link to="/login">{global.translate('Login', 190)}</Link>
        </div>
      )}
    </>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.objectOf(PropTypes.any),
  onKeyDown: PropTypes.func.isRequired,
  phoneValue: PropTypes.string.isRequired,
  setPhoneValue: PropTypes.func.isRequired,
  clearRemindUsername: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

LoginForm.defaultProps = {
  isLoading: false,
  error: null,
};

export default LoginForm;
