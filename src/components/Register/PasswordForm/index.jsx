import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Form, Label } from 'semantic-ui-react';

import PasswordInput from 'components/common/PasswordInput';
import './style.scss';
import checkPassword from 'utils/checkPassword';
import GoBack from 'components/common/GoBack';

const PasswordForm = ({
  registrationData,
  onInputChange,
  screenFive,
  onClickHandler,
}) => {
  const backButtonHandler = () => {
    onClickHandler();
  };
  const { password, confirmPassword } = registrationData;
  const { clearError, handleNext, errors } = screenFive;

  return (
    <Container>
      <Form className="form-password">
        <div className="go-back">
          <GoBack style onClickHandler={backButtonHandler} />
        </div>
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
            , {global.translate('a')}&nbsp;
            <span
              className={
                checkPassword(password).lowercase ? '' : 'invalid'
              }
            >
              {global.translate('lowercase,')}
            </span>{' '}
            <span
              className={
                checkPassword(password).digit ? '' : 'invalid'
              }
            >
              {global.translate('digit')}
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
            placeholder={global.translate(
              'Confirm your password',
              45,
            )}
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
        {global.translate('Already registered?', 1200)}{' '}
        <Link to="/login">{global.translate('LOGIN', 190)}</Link>
      </Form>
    </Container>
  );
};

PasswordForm.propTypes = {
  registrationData: PropTypes.instanceOf(Object).isRequired,
  onInputChange: PropTypes.func,
  screenFive: PropTypes.instanceOf(Object).isRequired,
  onClickHandler: PropTypes.func.isRequired,
};

PasswordForm.defaultProps = {
  onInputChange: () => null,
};

export default PasswordForm;
