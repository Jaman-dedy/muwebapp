import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Form, Input, Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import './style.scss';

import clearPhoneNumberAndOTPStoreAction from 'redux/actions/users/clearPhoneNumberAndOTPStore';

const OTPForm = ({
  registrationData,
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

  return (
    <Container>
      <Form className="otp-form">
        <span>Enter the 6 digit we have sent you</span>
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
            {verifyOTP.error.Description}
            <br />
            <Button
              as="a"
              onClick={() => {
                clearPhoneNumberAndOTPStoreAction()(dispatch);
                setScreenNumber(2);
              }}
            >
              Go back to check the phone number
            </Button>
            <br />
            <br />
          </span>
        ) : (
            ''
          )}
        Already have an account? <Link to="/login">Login</Link>
      </Form>
    </Container>
  );
};

OTPForm.propTypes = {
  registrationData: PropTypes.instanceOf(Object).isRequired,
  onInputChange: PropTypes.func,
  setScreenNumber: PropTypes.func.isRequired,
  screenThree: PropTypes.instanceOf(Object).isRequired,
};

OTPForm.defaultProps = {
  onInputChange: () => null,
};

export default OTPForm;
