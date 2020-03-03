import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Form, Label } from 'semantic-ui-react';

import PasswordInput from 'components/common/PasswordInput';
import editIcon from 'assets/images/edit.png';
import confirmIcon from 'assets/images/confirm.png';
import './style.scss';
import checkPassword from 'utils/checkPassword';

const PasswordForm = ({
  registrationData,
  onInputChange,
  screenFive,
}) => {
  const { password, confirmPassword } = registrationData;
  const {
    clearError,
    handleNext,
    errors,
    passwordStrength,
  } = screenFive;

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
    <Container>
      <Form className="form-password">
        <Form.Field>
          <PasswordInput
            placeholder={global.translate('Enter your password', 2)}
            name="password"
            type="password"
            error={
              (errors.password &&
                global.translate(errors.password, 46)) ||
              false
            }
            value={password}
            onChange={e => {
              onInputChange(e);
              clearError(e);
            }}
          />
        </Form.Field>
        <span>
          {global.translate('Password strength')}:
          <span
            style={{
              color: passwordStrengthLabel(passwordStrength).color,
            }}
          >{` ${global.translate(
            passwordStrengthLabel(passwordStrength).label,
          )}`}</span>
        </span>
        <div className="password-strength" style={{}}>
          <div
            className="password-strength-bar"
            style={{
              width: `${passwordStrength}%`,
              background: passwordStrengthLabel(passwordStrength)
                .color,
            }}
          />
        </div>
        <div className="checklist">
          <div className="password-checklist">
            <img
              src={
                checkPassword(password).case ? confirmIcon : editIcon
              }
              alt="edit"
            />
            <span>
              {global.translate(
                'Enter at least one lowercase and upper case',
              )}
            </span>
          </div>
          <div className="password-checklist">
            <img
              src={
                checkPassword(password).digit ? confirmIcon : editIcon
              }
              alt="edit"
            />
            <span>
              {global.translate('Enter at least one number')} (1-9)
            </span>
          </div>
          <div className="password-checklist">
            <img
              src={
                checkPassword(password).specialCharacter
                  ? confirmIcon
                  : editIcon
              }
              alt="edit"
            />
            <span>
              {global.translate('Enter at least a special character')}{' '}
              (!@#$%^&*)
            </span>
          </div>
          <div className="password-checklist">
            <img
              src={
                checkPassword(password).number
                  ? confirmIcon
                  : editIcon
              }
              alt="edit"
            />
            <span>
              {global.translate('Enter at least 8 characters')}
            </span>
          </div>
        </div>
        <Form.Field>
          <PasswordInput
            placeholder={global.translate('Confirm your password')}
            name="confirmPassword"
            type="password"
            error={
              (errors.confirmPassword &&
                global.translate(errors.confirmPassword, 46)) ||
              false
            }
            value={confirmPassword}
            onChange={e => {
              onInputChange(e);
              clearError(e);
            }}
          />
        </Form.Field>
        {errors.confirmation && (
          <Form.Field style={{ marginTop: '-7px' }}>
            <Label prompt>
              {global.translate(errors.confirmation)}
            </Label>
          </Form.Field>
        )}
        <Form.Button
          type="button"
          primary
          disabled={passwordStrength !== 100}
          onClick={handleNext}
        >
          {global.translate('next')}
        </Form.Button>
        {global.translate('Already have an account')}?{' '}
        <Link to="/login">{global.translate('Login')}</Link>
      </Form>
    </Container>
  );
};

PasswordForm.propTypes = {
  registrationData: PropTypes.instanceOf(Object).isRequired,
  onInputChange: PropTypes.func,
  screenFive: PropTypes.instanceOf(Object).isRequired,
};

PasswordForm.defaultProps = {
  onInputChange: () => null,
};

export default PasswordForm;
