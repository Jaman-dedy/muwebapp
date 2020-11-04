import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { Container, Form, Input } from 'semantic-ui-react';

import './style.scss';

const OTPForm = ({ form, onInputChange }) => {
  const otpCharacters = 10;
  const hiddenInput = useRef(null);

  useEffect(() => {
    if (form.VoucherNumber.length >= otpCharacters) {
      hiddenInput.current.focus();
    }
  }, [form.VoucherNumber]);

  return (
    <Container>
      <Form className="otp-form-container">
        <div style={{ weight: 'normal !important' }}>
          {global.translate(
            'Please enter the 10 digits of voucher token',
          )}
        </div>
        <Form.Field className="otp-input-group">
          <Input
            type="text"
            name="VoucherNumber"
            placeholder="––––––––––"
            onChange={onInputChange}
            value={form.VoucherNumber || null}
            maxLength={otpCharacters}
          />
        </Form.Field>

        <input ref={hiddenInput} className="hiddenOtpInput" />
      </Form>
    </Container>
  );
};

OTPForm.propTypes = {
  form: PropTypes.instanceOf(Object).isRequired,
  onInputChange: PropTypes.func,
};

OTPForm.defaultProps = {
  onInputChange: () => null,
};

export default OTPForm;
