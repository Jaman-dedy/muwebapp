import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Form, Label } from 'semantic-ui-react';
import './style.scss';

const PINForm = ({ onInputChange, screenSix }) => {
  const pinDigitRefs = [];
  const fakeRef = useRef({});
  pinDigitRefs.push(useRef(null));
  pinDigitRefs.push(useRef(null));
  pinDigitRefs.push(useRef(null));
  pinDigitRefs.push(useRef(null));

  const confirmPinDigitRefs = [];
  confirmPinDigitRefs.push(useRef(null));
  confirmPinDigitRefs.push(useRef(null));
  confirmPinDigitRefs.push(useRef(null));
  confirmPinDigitRefs.push(useRef(null));

  const [pinDigit, setPinDigit] = useState({
    digit1: '',
    digit2: '',
    digit3: '',
    digit4: '',
  });

  const [confirmPinDigit, setConfirmPinDigit] = useState({
    digit1: '',
    digit2: '',
    digit3: '',
    digit4: '',
  });

  const { errors, handleNext, clearError, registerUser } = screenSix;

  useEffect(() => {
    const { digit1, digit2, digit3, digit4 } = pinDigit;
    const pin = `${digit1}${digit2}${digit3}${digit4}`;

    onInputChange({ target: { name: 'pin', value: pin } });
    clearError({ target: { name: 'pin', value: pin } });
  }, [pinDigit]);

  useEffect(() => {
    const { digit1, digit2, digit3, digit4 } = confirmPinDigit;
    const confirmPin = `${digit1}${digit2}${digit3}${digit4}`;

    onInputChange({
      target: { name: 'confirmPin', value: confirmPin },
    });
    clearError({
      target: { name: 'confirmPin', value: confirmPin },
    });
  }, [confirmPinDigit]);

  return (
    <Container>
      <Form className="pin-form">
        <span>Create a PIN number , It will be your signature</span>
        <Form.Field>
          <div className="pin-input-group">
            {Array(4)
              .fill()
              .map((value, index) => (
                <Form.Input
                  key={Math.random()}
                  type="password"
                  name={`digit${index + 1}`}
                  ref={fakeRef}
                  value={pinDigit[`digit${index + 1}`]}
                  className="pin-input"
                  maxLength="1"
                  required
                  onChange={({ target: { value, name } }) => {
                    setPinDigit({ ...pinDigit, [name]: value });
                  }}
                />
              ))}
          </div>
          {errors.pin && (
            <Form.Field style={{ marginTop: '-7px' }}>
              <Label pointing prompt>
                {errors.pin}
              </Label>
            </Form.Field>
          )}
          <span>Confirm your 4 digit PIN</span>
          <div className="pin-input-group">
            {Array(4)
              .fill()
              .map((value, index) => (
                <Form.Input
                  key={Math.random()}
                  type="password"
                  className="pin-input"
                  ref={confirmPinDigitRefs[index]}
                  name={`digit${index + 1}`}
                  value={confirmPinDigit[`digit${index + 1}`]}
                  maxLength="1"
                  required
                  onChange={({ target: { value, name } }) => {
                    setConfirmPinDigit({
                      ...confirmPinDigit,
                      [name]: value,
                    });
                  }}
                />
              ))}
          </div>
        </Form.Field>
        {(errors.confirmation || errors.confirmPin) && (
          <Form.Field style={{ marginTop: '-7px' }}>
            <Label pointing prompt>
              {errors.confirmation || errors.confirmPin}
            </Label>
          </Form.Field>
        )}
        <Form.Button
          type="button"
          primary
          loading={registerUser.loading}
          onClick={() => handleNext()}
        >
          SEND
        </Form.Button>
        Already have an account? <Link to="/login">Login</Link>
      </Form>
    </Container>
  );
};

PINForm.propTypes = {
  onInputChange: PropTypes.func,
  screenSix: PropTypes.instanceOf(Object).isRequired,
};

PINForm.defaultProps = {
  onInputChange: () => null,
};

export default PINForm;
