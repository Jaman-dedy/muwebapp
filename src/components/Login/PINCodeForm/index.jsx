import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Label } from 'semantic-ui-react';
import './style.scss';

const PinCodeForm = ({ onChange, pinError }) => {
  const digitRefs = [];
  digitRefs.push(useRef(null));
  digitRefs.push(useRef(null));
  digitRefs.push(useRef(null));
  digitRefs.push(useRef(null));
  const [digitWithFocus, setDigitWithFocus] = useState(null);

  useEffect(() => {
    if (digitRefs[digitWithFocus]) {
      digitRefs[digitWithFocus].current.focus();
    }
  }, [digitRefs, digitWithFocus]);

  return (
    <div className="otp-form">
      <span>Enter your 4 digit PIN</span>
      <Form.Field className="otp-input-group">
        {Array(4)
          .fill()
          .map((value, index) => (
            <Input
              key={index.toString()}
              type="password"
              name={`digit${index}`}
              value={value}
              ref={digitRefs[index]}
              className="otp-input"
              maxLength="1"
              onChange={onChange}
              onKeyUp={e => {
                setDigitWithFocus(
                  parseInt(e.target.name.slice(-1), 10) + 1,
                );
              }}
            />
          ))}
      </Form.Field>
      {pinError && (
        <Form.Field style={{ marginTop: '-7px' }}>
          <Label pointing prompt>
            {pinError}
          </Label>
        </Form.Field>
      )}
    </div>
  );
};

PinCodeForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  pinError: PropTypes.string,
};
PinCodeForm.defaultProps = {
  pinError: null,
};
export default PinCodeForm;
