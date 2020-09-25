/* eslint-disable react/button-has-type */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Form, Input } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import './style.scss';

import clearPhoneNumberAndOTPStoreAction from 'redux/actions/users/clearPhoneNumberAndOTPStore';
import GoBack from 'components/common/GoBack';

const OTPForm = ({
  registrationData,
  setRegistrationData,
  onInputChange,
  screenThree,
  onClickHandler,
}) => {
  const dispatch = useDispatch();
  const clearOTPForm = () => {
    setRegistrationData({
      ...registrationData,
      OTP: '',
    });
  };
  const hiddenInput = useRef(null);
  const backButtonHandler = () => {
    clearOTPForm();
    clearPhoneNumberAndOTPStoreAction()(dispatch);
    onClickHandler();
  };

  const { handleNext, verifyOTP } = screenThree;
  const otpCharacters = 6;

  useEffect(() => {
    if (registrationData.OTP.length >= otpCharacters) {
      hiddenInput.current.focus();
      handleNext();
    }
  }, [registrationData]);

  return (
    <Container>
      <Form className="otp-form-container">
        <div className="go-back">
          <GoBack style onClickHandler={backButtonHandler} />
        </div>
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
        {verifyOTP.loading && (
          <div className="wrap-loading">
            <div className="loading-button" />
          </div>
        )}
        <input ref={hiddenInput} className="hiddenOtpInput" />
        {global.translate('Already registered?', 1200)}{' '}
        <Link to="/login">{global.translate('Login', 190)}</Link>
      </Form>

      {verifyOTP.error ? (
        <span className="otp-error">
          <div className="otpMessage">
            <h5>{global.translate('Wrong code', 185)}</h5>
            {global.translate(
              'The code provided is incorrect. Please try again or hit back to send another code.',
              25,
            )}
          </div>

          <br />
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
  screenThree: PropTypes.instanceOf(Object).isRequired,
  onClickHandler: PropTypes.func.isRequired,
};

OTPForm.defaultProps = {
  onInputChange: () => null,
};

export default OTPForm;
