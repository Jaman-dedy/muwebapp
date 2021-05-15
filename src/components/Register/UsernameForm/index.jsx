/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Form, Loader, Input } from 'semantic-ui-react';
import './style.scss';
import 'assets/styles/spinner.scss';
import PINInput from 'components/common/PINInput';
import PasswordInput from 'components/common/PasswordInput';
import checkPassword from 'utils/checkPassword';
import AlertDanger from 'components/common/Alert/Danger';

const UsernameForm = ({
  registrationData,
  onInputChange,
  userNameData,
}) => {
  const {
    handleNext,
    errors,
    clearError,
    verifyPID,
    registerUser,
    handleOnBlur,
    handleClearUsername,
    setPINNumber,
    PINNumber,
    handleSubmit,
  } = userNameData;

  const { password } = registrationData;
  const [disableButton, setDisableButton] = useState(false);
  const [goToNextScreen, setGoToNextScreen] = useState(false);
  const [displayErrors, setDisplayErrors] = useState(null);
  const [pinDigit] = useState({
    PIN: '',
  });

  useEffect(() => {
    if (errors?.personalId) {
      setDisableButton(true);
    }
    if (
      !checkPassword(password).number ||
      !checkPassword(password).uppercase ||
      !checkPassword(password).lowercase ||
      !checkPassword(password).specialCharacter ||
      !checkPassword(password).digit
    ) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [errors?.personalId, checkPassword(password)]);

  useEffect(() => {
    if (verifyPID?.error) {
      setDisplayErrors(verifyPID.error.message);
    } else {
      setDisplayErrors(null);
    }
  }, [verifyPID]);

  useEffect(() => {
    if (errors.pin) {
      setDisplayErrors(errors.pin);
    } else {
      setDisplayErrors(null);
    }
  }, [errors]);

  useEffect(() => {
    const { PIN } = pinDigit;
    const pin = PIN;

    onInputChange({ target: { name: 'pin', value: pin } });
    clearError({ target: { name: 'pin', value: pin } });
  }, [pinDigit]);

  useEffect(() => {
    if (!registerUser?.loading) {
      setGoToNextScreen(true);
    }
    if (!verifyPID.loading) {
      setGoToNextScreen(true);
    } else {
      setGoToNextScreen(false);
    }
  }, [registerUser, verifyPID]);

  return (
    <Container>
      {displayErrors && <AlertDanger message={displayErrors} />}
      <br />
      <Form className="user-personal-id">
        <h3>{global.translate('Secure your account')}</h3>
        <Form.Field>
          <div className="sub-titles">
            {global.translate('Username')}
          </div>
          <Input
            type="text"
            name="personalId"
            error={global.translate(errors.personalId) || false}
            value={registrationData.personalId}
            onChange={e => {
              clearError(e);
              onInputChange(e);
              handleClearUsername();
            }}
            placeholder={global.translate('Create your username', 35)}
            onBlur={handleOnBlur}
            loading={verifyPID.loading}
          />
        </Form.Field>
        {verifyPID.loading && <Loader />}
        <div className="sub-title">
          {global.translate('PIN number')}
        </div>
        <div className="otp-box">
          <PINInput
            type="text"
            value={PINNumber}
            numberOfInputs={4}
            onChange={setPINNumber}
          />
        </div>
        <Form.Field>
          <div className="sub-title-username">
            {global.translate('Password')}
          </div>
          <PasswordInput
            placeholder={global.translate('Enter your password', 2)}
            name="password"
            type="password"
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
        <button
          type="button"
          disabled={disableButton}
          className="btn-auth btn-primary"
          onClick={() => {
            if (!registrationData?.ReferralPID && goToNextScreen) {
              handleNext();
            }
            if (registrationData?.ReferralPID) {
              handleSubmit();
            }
          }}
        >
          {registerUser.loading && (
            <span className="loading-button" />
          )}
          {registrationData?.ReferralPID
            ? global.translate('REGISTER NOW')
            : global.translate('Next', 10)}
        </button>
      </Form>
    </Container>
  );
};

UsernameForm.propTypes = {
  registrationData: PropTypes.instanceOf(Object).isRequired,
  onInputChange: PropTypes.func,
  userNameData: PropTypes.instanceOf(Object).isRequired,
};

UsernameForm.defaultProps = {
  onInputChange: () => null,
};

export default UsernameForm;
