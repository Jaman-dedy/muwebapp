import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Form, Input, Button } from 'semantic-ui-react';
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
  const digitRefs = [];
  digitRefs.push(useRef(null));
  digitRefs.push(useRef(null));
  digitRefs.push(useRef(null));
  digitRefs.push(useRef(null));
  digitRefs.push(useRef(null));
  digitRefs.push(useRef(null));

  const [digitWithFocus, setDigitWithFocus] = useState(0);
  const dispatch = useDispatch();

  const { errors, handleNext, clearError, verifyOTP } = screenThree;

  useEffect(() => {
    try {
      digitRefs[digitWithFocus].current.focus();
    } catch (error) {
      handleNext();
    }
  }, [digitWithFocus]);

  const clearOTPForm = () => {
    setRegistrationData({
      ...registrationData,
      digit1: '',
      digit2: '',
      digit3: '',
      digit4: '',
      digit5: '',
      digit6: '',
    });
  };

  return (
    <Container>
      <Form className="otp-form">
        <span>
          {global.translate(
            'Please provide the verification code sent to your phone via SMS.',
            24,
          )}
        </span>
        <Form.Field className="otp-input-group">
          {Array(6)
            .fill()
            .map((value, index) => (
              <Input
                key={Math.random()}
                type="text"
                name={`digit${index + 1}`}
                error={!!errors[`digit${index + 1}`]}
                ref={digitRefs[index]}
                className="otp-input"
                maxLength="1"
                required
                defaultValue={registrationData[`digit${index + 1}`]}
                onChange={e => {
                  const {
                    target: { name, value },
                  } = e;
                  const newDigitWithFocus = name.slice(-1);
                  if (value) {
                    setDigitWithFocus(newDigitWithFocus);
                    onInputChange(e);
                    clearError(e);
                  }
                }}
              />
            ))}
        </Form.Field>
        {verifyOTP.error ? (
          <span className="otp-error">
            {global.translate(
              'The code provided is incorrect. Please try again or hit back to send another code.',
            )}
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
        {global.translate('Already registered?')}?{' '}
        <Link to="/login">{global.translate('Login')}</Link>
      </Form>
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
