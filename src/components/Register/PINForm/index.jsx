/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Form, Label } from 'semantic-ui-react';
import './style.scss';

import PinCodeForm from 'components/common/PinCodeForm';

const PINForm = ({ onInputChange, screenSix }) => {
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

  const { errors, handleNext, clearError } = screenSix;

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
      <Form className="pin-form">
        <PinCodeForm
          label={global.translate(
            'Create a PIN number , It will be your signature', 2015
          )}
          pinError={errors.pin}
          onChange={({ target: { value, name } }) => {
            setPinDigit({ ...pinDigit, [name]: value });
          }}
          name="PIN"
        />
        <br />
        <PinCodeForm
          label={global.translate('Confirm your new PIN number', 320)}
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
              {global.translate(errors.confirmation)}
            </Label>
          </Form.Field>
        )}
        <Form.Button
          type="button"
          primary
          onClick={() => handleNext()}
        >
          {global.translate('NEXT', 10)}
        </Form.Button>
        {global.translate('Already registered?', 1200)}?{' '}
        <Link to="/login">{global.translate('Login', 190)}</Link>
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
