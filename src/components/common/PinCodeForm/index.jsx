import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Label } from 'semantic-ui-react';
import './PinCodeForm.scss';

const PinCodeForm = ({ label, labelIndex, onChange, pinError }) => {
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
    <div className="pin-input-form">
      <span>{global.translate(label, labelIndex)}</span>
      <Form.Field className="pin-input-group">
        {Array(4)
          .fill()
          .map((value, index) => (
            <Input
              key={index.toString()}
              type="password"
              name={`digit${index}`}
              value={value}
              ref={digitRefs[index]}
              className="pin-input"
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
            {global.translate(pinError)}
          </Label>
        </Form.Field>
      )}
    </div>
  );
};

PinCodeForm.propTypes = {
  label: PropTypes.string,
  labelIndex: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  pinError: PropTypes.string,
};
PinCodeForm.defaultProps = {
  label: 'Enter your 4 digit PIN',
  labelIndex: 543,
  pinError: null,
};
export default PinCodeForm;
