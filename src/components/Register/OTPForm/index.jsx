/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Container,
  Form,
  Input,
  Button,
  Message,
} from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import './style.scss';

import clearPhoneNumberAndOTPStoreAction from 'redux/actions/users/clearPhoneNumberAndOTPStore';

const OTPForm = ({
  registrationData,
  setRegistrationData,
  onInputChange,
  screenThree,
  setScreenNumber,
}) => {
  const hiddenInput = useRef(null);

  const dispatch = useDispatch();

  const { errors, handleNext, clearError, verifyOTP } = screenThree;
  const otpCharacters = 6;

  const clearOTPForm = () => {
    setRegistrationData({
      ...registrationData,
      OTP: '',
    });
  };

  useEffect(() => {
    if (registrationData.OTP.length >= otpCharacters) {
      hiddenInput.current.focus();
      handleNext();
    }
  }, [registrationData]);

  return (
    <Container>
      <Form className="otp-form-container">
        <span>
          {global.translate(
            'Please provide the verification code sent to your phone via SMS.',
            24,
          )}
        </span>
        <Form.Field className="otp-input-group">
          <Input
            type="text"
            name="OTP"
            placeholder="––––––"
            onChange={onInputChange}
            value={registrationData.OTP || null}
            maxLength={otpCharacters}
          />
        </Form.Field>
        <input ref={hiddenInput} className="hiddenOtpInput" />
        {global.translate('Already registered?', 1200)}?{' '}
        <Link to="/login">{global.translate('Login', 190)}</Link>
      </Form>

      {verifyOTP.error ? (
        <span className="otp-error">
          <Message
            error
            header={global.translate('Wrong code', 185)}
            list={[
              global.translate(
                'The code provided is incorrect. Please try again or hit back to send another code.',
                25,
              ),
            ]}
            className="otpMessage"
          />

          <br />
          <Button
            as="a"
            onClick={() => {
              clearOTPForm();
              clearPhoneNumberAndOTPStoreAction()(dispatch);
              setScreenNumber(2);
            }}
          >
            {global.translate('Back', 174)}
          </Button>
          <br />
          <br />
        </span>
      ) : (
        ''
      )}
    </Container>
  );
};

OTPForm.propTypes = {
  registrationData: PropTypes.instanceOf(Object).isRequired,
  setRegistrationData: PropTypes.func.isRequired,
  onInputChange: PropTypes.func,
  setScreenNumber: PropTypes.func.isRequired,
  screenThree: PropTypes.instanceOf(Object).isRequired,
};

OTPForm.defaultProps = {
  onInputChange: () => null,
};

export default OTPForm;
