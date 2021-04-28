/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import PinCodeForm from 'components/common/PinCodeForm';
import './ChangePIN.scss';

const ChangePIN = ({ changePIN }) => {
  const {
    handleInputChange,
    errors,
    handleSubmit,
    updatePIN,
  } = changePIN;

  const [currentPin, setCurrentPin] = useState({});
  const [pin, setPin] = useState({});
  const [confirmPin, setConfirmPin] = useState({});

  const onChange = ({ target: { name, value }, input }) => {
    switch (input) {
      case 'currentPin':
        setCurrentPin({
          ...currentPin,
          [name]: value,
        });
        break;

      case 'pin':
        setPin({
          ...pin,
          [name]: value,
        });
        break;

      case 'confirmPin':
        setConfirmPin({
          ...confirmPin,
          [name]: value,
        });
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    const { digit0, digit1, digit2, digit3 } = currentPin;

    const value = `${digit0 || ''}${digit1 || ''}${digit2 ||
      ''}${digit3 || ''}`;

    handleInputChange({ target: { name: 'currentPin', value } });
  }, [currentPin]);

  useEffect(() => {
    const { digit0, digit1, digit2, digit3 } = pin;

    const value = `${digit0 || ''}${digit1 || ''}${digit2 ||
      ''}${digit3 || ''}`;

    handleInputChange({ target: { name: 'pin', value } });
  }, [pin]);

  useEffect(() => {
    const { digit0, digit1, digit2, digit3 } = confirmPin;

    const value = `${digit0 || ''}${digit1 || ''}${digit2 ||
      ''}${digit3 || ''}`;

    handleInputChange({ target: { name: 'confirmPin', value } });
  }, [confirmPin]);

  return (
    <Form className="change-pin-container large-padding border-1 b-light-grey border-radius-4 medium-v-margin xlarge-h-margin">
      <PinCodeForm
        label={global.translate(
          'Provide the current PIN number',
          2188,
        )}
        onChange={e => onChange({ ...e, input: 'currentPin' })}
        pinError={errors.currentPin}
      />
      <div className="large-v-margin" />
      <PinCodeForm
        label={global.translate('Provide the new PIN number', 2189)}
        onChange={e => onChange({ ...e, input: 'pin' })}
        pinError={errors.pin}
      />
      <div className="large-v-margin" />
      <PinCodeForm
        label={global.translate('Confirm the new PIN number', 2195)}
        onChange={e => onChange({ ...e, input: 'confirmPin' })}
        pinError={errors.confirmPin || errors.confirmation}
      />

      <div className="large-v-margin" />
      <Form.Button
        className="large-v-margin"
        type="button"
        loading={updatePIN.loading}
        secondary
        color="gray"
        onClick={() => !updatePIN.loading && handleSubmit()}
      >
        {global.translate('Change PIN Number', 735)}
      </Form.Button>
    </Form>
  );
};

ChangePIN.propTypes = {
  changePIN: PropTypes.instanceOf(Object),
};
ChangePIN.defaultProps = {
  changePIN: {},
};

export default ChangePIN;
