/* eslint-disable react/jsx-no-duplicate-props */
import './PasswordForm.scss';

import PasswordInput from 'components/common/PasswordInput';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Form, Label } from 'semantic-ui-react';
import checkPassword from 'utils/checkPassword';

const PasswordForm = ({
  secondary,
  primary,
  passwordData,
  onInputChange,
  clearError,
  errors,
  buttonText,
  onClick,
  loading,
}) => {
  const { password, confirmPassword } = passwordData;
  const [passwordStrength, setPasswordStrength] = useState(0); // passwordStrength in percentage

  useEffect(() => {
    const strength = checkPassword(password);
    let pswdStrength = 0;
    Object.keys(strength).map(type => {
      if (type === 'lowercase' || type === 'uppercase') {
        return false;
      }
      if (strength[type]) pswdStrength += 25;
      return true;
    });
    setPasswordStrength(pswdStrength);
  }, [password]);

  const passwordStrengthLabel = pswdStrength => {
    if (pswdStrength <= 50)
      return { label: 'Very Weak', color: '#F42C10' };
    if (pswdStrength === 75)
      return { label: 'Weak', color: '#EA5726' };
    if (pswdStrength === 100)
      return { label: 'Strong', color: '#0A9220' };
    return true;
  };

  return (
    <Form className="form-password-input">
      <Form.Field>
        <PasswordInput
          placeholder={global.translate('Password', 2)}
          name="password"
          type="password"
          autocomplete="new-password"
          error={errors.password || false}
          value={password}
          onChange={e => {
            onInputChange(e);
            clearError(e);
          }}
        />
      </Form.Field>
      <div className="checklist">
        <div>
          {global.translate('The password must be at least')}{' '}
          <span
            className={
              checkPassword(password).number ? '' : 'invalid'
            }
          >
            {global.translate('8 characters long')}
          </span>
          , {global.translate('containing an')}{' '}
          <span
            className={
              checkPassword(password).uppercase ? '' : 'invalid'
            }
          >
            {global.translate('uppercase')}
          </span>
          , {global.translate('a ')}&nbsp;
          <span
            className={
              checkPassword(password).lowercase ? '' : 'invalid'
            }
          >
            {global.translate('lowercase, digit')}
          </span>{' '}
          {global.translate('and at least')}{' '}
          <span
            className={
              checkPassword(password).specialCharacter
                ? ''
                : 'invalid'
            }
          >
            {global.translate('a special character(!@#$%^&*)')}
          </span>
        </div>
      </div>
      <Form.Field>
        <PasswordInput
          placeholder={global.translate('Confirm your password', 45)}
          name="confirmPassword"
          type="password"
          error={errors.confirmPassword || false}
          value={confirmPassword}
          onChange={e => {
            onInputChange(e);
            clearError(e);
          }}
        />
      </Form.Field>
      {errors.confirmation && (
        <Form.Field style={{ marginTop: '-7px' }}>
          <Label prompt>{errors.confirmation}</Label>
        </Form.Field>
      )}
      <Form.Button
        type="button"
        loading={loading}
        disabled={passwordStrength !== 100}
        secondary={secondary}
        primary={primary}
        disabled={
          confirmPassword !== password ||
          !checkPassword(password).number ||
          !checkPassword(password).uppercase ||
          !checkPassword(password).lowercase ||
          !checkPassword(password).specialCharacter
        }
        onClick={onClick}
      >
        {global.translate(buttonText)}
      </Form.Button>
    </Form>
  );
};

PasswordForm.propTypes = {
  passwordData: PropTypes.shape({
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
  }),
  onInputChange: PropTypes.func,
  clearError: PropTypes.func,
  errors: PropTypes.instanceOf(Object),
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
};

PasswordForm.defaultProps = {
  onInputChange: () => null,
  clearError: () => null,
  onClick: () => null,
  passwordData: {
    password: '',
    confirmPassword: '',
  },
  errors: {},
  buttonText: 'Next',
  loading: false,
  secondary: true,
  primary: false,
};

export default PasswordForm;
