import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Form, Label } from 'semantic-ui-react';
import PasswordInput from 'components/common/PasswordInput';
import './style.scss';
import checkPassword from 'utils/checkPassword';
import isAppDisplayedInWebView from 'helpers/isAppDisplayedInWebView';

const PasswordForm = ({
  resetPasswordData,
  onInputChange,
  screenThree,
}) => {
  const { password, confirmPassword } = resetPasswordData;
  const { clearError, handleNext, errors } = screenThree;

  return (
    <Container>
      <Form className="form-password-reset">
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
              {global.translate('8 alphanumeric characters')}
            </span>
            , {global.translate('containing an')}{' '}
            <span
              className={
                checkPassword(password).uppercase ? '' : 'invalid'
              }
            >
              {global.translate('uppercase')}
            </span>
            , {global.translate('A')}
            <span
              className={
                checkPassword(password).lowercase ? '' : 'invalid'
              }
            >
              {global.translate('lowercase')}
            </span>{' '}
            {global.translate('and a')}{' '}
            <span
              className={
                checkPassword(password).specialCharacter
                  ? ''
                  : 'invalid'
              }
            >
              {global.translate('special character(!@#$%^&amp;*)')}
            </span>
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
        <button
          type="button"
          className="btn-auth btn-secondary"
          disabled={
            !checkPassword(password).number ||
            !checkPassword(password).uppercase ||
            !checkPassword(password).lowercase ||
            !checkPassword(password).specialCharacter
          }
          onClick={handleNext}
        >
          {global.translate('NEXT', 10)}
        </button>
        {!isAppDisplayedInWebView() && (
          <>
            {global.translate('Already registered?', 1200)}{' '}
            <Link to="/login">{global.translate('Login', 190)}</Link>
          </>
        )}
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
