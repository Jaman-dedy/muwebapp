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
  resetPasswordData,
  onInputChange,
  screenThree,
}) => {
  const { password, confirmPassword } = resetPasswordData;
  const {
    clearError,
    handleNext,
    errors,
    passwordStrength,
  } = screenThree;

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
      <Form className="form-password-reset">
        <Form.Field>
          <PasswordInput
            placeholder="Enter your password"
            name="password"
            type="password"
            error={errors.password || false}
            value={password}
            onChange={e => {
              onInputChange(e);
              clearError(e);
            }}
          />
        </Form.Field>
        <span>
          Password strength:
          <span
            style={{
              color: passwordStrengthLabel(passwordStrength).color,
            }}
          >{` ${
            passwordStrengthLabel(passwordStrength).label
          }`}</span>
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
            <span>Enter at least one lowercase and upper case</span>
          </div>
          <div className="password-checklist">
            <img
              src={
                checkPassword(password).digit ? confirmIcon : editIcon
              }
              alt="edit"
            />
            <span>Enter at least one number (1-9)</span>
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
            <span>Enter at least a special character (!@#$%^&*)</span>
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
            <span>Enter at least 8 characters</span>
          </div>
        </div>
        <Form.Field>
          <PasswordInput
            placeholder="Confirm your password"
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
          primary
          disabled={passwordStrength !== 100}
          onClick={handleNext}
        >
          next
        </Form.Button>
        Already have an account? <Link to="/login">Login</Link>
      </Form>
    </Container>
  );
};

PasswordForm.propTypes = {
  resetPasswordData: PropTypes.instanceOf(Object).isRequired,
  onInputChange: PropTypes.func,
  screenThree: PropTypes.instanceOf(Object).isRequired,
};

PasswordForm.defaultProps = {
  onInputChange: () => null,
};

export default PasswordForm;
