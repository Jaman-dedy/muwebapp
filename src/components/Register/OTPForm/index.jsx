/* eslint-disable react/button-has-type */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
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
  setScreenNumber,
}) => {
  const history = useHistory();
  const hiddenInput = useRef(null);
  const onClickHandler = () => history.goBack();

  const dispatch = useDispatch();

  const { handleNext, verifyOTP } = screenThree;
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
        <div className="go-back">
          <GoBack style onClickHandler={onClickHandler} />
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
          <button
            className="btn-auth btn-secondary"
            onClick={() => {
              clearOTPForm();
              clearPhoneNumberAndOTPStoreAction()(dispatch);
              setScreenNumber(2);
            }}
          >
            {global.translate('Back', 174)}
          </button>
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
