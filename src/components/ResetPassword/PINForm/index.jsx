import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Form, Label } from 'semantic-ui-react';
import './style.scss';

import PinCodeForm from 'components/common/PinCodeForm';

const PINForm = ({ onInputChange, screenFour }) => {
  const [pinDigit, setPinDigit] = useState({
    digit0: '',
    digit1: '',
    digit2: '',
    digit3: '',
  });

  const [confirmPinDigit, setConfirmPinDigit] = useState({
    digit0: '',
    digit1: '',
    digit2: '',
    digit3: '',
  });

  const { errors, handleNext, clearError, registerUser } = screenFour;

  useEffect(() => {
    const { digit0, digit1, digit2, digit3 } = pinDigit;
    const pin = `${digit0}${digit1}${digit2}${digit3}`;

    onInputChange({ target: { name: 'pin', value: pin } });
    clearError({ target: { name: 'pin', value: pin } });
  }, [pinDigit]);

  useEffect(() => {
    const { digit0, digit1, digit2, digit3 } = confirmPinDigit;
    const confirmPin = `${digit0}${digit1}${digit2}${digit3}`;
    onInputChange({
      target: { name: 'confirmPin', value: confirmPin },
    });
    clearError({
      target: { name: 'confirmPin', value: confirmPin },
    });
  }, [confirmPinDigit]);

  return (
    <Container>
      <Form className="pin-form-reset">
        <PinCodeForm
          label="Create a PIN number , It will be your signature"
          pinError={errors.pin}
          onChange={({ target: { value, name } }) => {
            setPinDigit({ ...pinDigit, [name]: value });
          }}
          name="PIN"
        />
        <br />
        <PinCodeForm
          label="Confirm your 4 digit PIN"
          pinError={errors.confirmPin}
          onChange={({ target: { value, name } }) => {
            setConfirmPinDigit({
              ...confirmPinDigit,
              [name]: value,
            });
          }}
          name="PIN"
        />
        {errors.confirmation && (
          <Form.Field style={{ marginTop: '-7px' }}>
            <Label pointing prompt>
              {errors.confirmation}
            </Label>
          </Form.Field>
        )}
        <Form.Button
          type="button"
          primary
          loading={registerUser.loading}
          onClick={() => !registerUser.loading && handleNext()}
        >
          SEND
        </Form.Button>
        Already registered?? <Link to="/login">Login</Link>
      </Form>
    </Container>
  );
};

PINForm.propTypes = {
  onInputChange: PropTypes.func,
  screenFour: PropTypes.instanceOf(Object).isRequired,
};

PINForm.defaultProps = {
  onInputChange: () => null,
};

export default PINForm;
