import './PinCodeForm.scss';

import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Label } from 'semantic-ui-react';

const PinCodeForm = ({
  label,
  onChange,
  pinError,
  shouldClear,
  setShouldClear,
}) => {
  const digitRefs = [];
  digitRefs.push(useRef(null));
  digitRefs.push(useRef(null));
  digitRefs.push(useRef(null));
  digitRefs.push(useRef(null));
  const [digitWithFocus, setDigitWithFocus] = useState(null);
  const [clear, setClear] = useState(false);

  useEffect(() => {
    if (shouldClear) {
      setClear(true);
      setShouldClear(false);
    } else {
      setClear(false);
    }
  }, [shouldClear]);

  useEffect(() => {
    if (clear) {
      digitRefs.forEach(input => {
        input.current.inputRef.current.value = '';
      });
      setDigitWithFocus(0);
    }
  }, [clear]);

  useEffect(() => {
    if (digitRefs[digitWithFocus]) {
      digitRefs[digitWithFocus].current.focus();
    }
  }, [digitWithFocus]);

  return (
    <div className="pin-input-form">
      <span>{global.translate(label, 1431)}</span>
      <Form.Field className="pin-input-group">
        {Array(4)
          .fill()
          .map((value, index) => {
            return (
              <Input
                key={index.toString()}
                type="number"
                name={`digit${index}`}
                value={shouldClear ? '' : value}
                ref={digitRefs[index]}
                className="pin-input"
                pattern="[0-9]*"
                maxLength="1"
                onChange={onChange}
                onKeyUp={e => {
                  e.persist();
                  if (e.key === 'Delete' || e.key === 'Backspace') {
                    setDigitWithFocus(
                      parseInt(e.target.name.slice(-1), 10) - 1,
                    );
                  } else if (e.target.value.trim().length === 1) {
                    setDigitWithFocus(
                      parseInt(e.target.name.slice(-1), 10) + 1,
                    );
                  }
                }}
                onKeyPress={e => {
                  if (e.which < 48 || e.which > 57) {
                    e.preventDefault();
                  }
                }}
              />
            );
          })}
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
  onChange: PropTypes.func.isRequired,
  pinError: PropTypes.string,
  shouldClear: PropTypes.bool,
  setShouldClear: PropTypes.func,
};
PinCodeForm.defaultProps = {
  label: 'Enter your 4 digit PIN',
  pinError: null,
  shouldClear: false,
  setShouldClear: () => {},
};
export default PinCodeForm;
