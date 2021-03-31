import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const PINInput = ({ value, onChange }) => {
  const digitRefs = [];
  digitRefs.push(useRef(null));
  digitRefs.push(useRef(null));
  digitRefs.push(useRef(null));
  digitRefs.push(useRef(null));

  const [digitWithFocus, setDigitWithFocus] = useState(null);

  const INPUT_VALUES = {
    digit0: '',
    digit1: '',
    digit2: '',
    digit3: '',
  };
  const [inputValues, setInputValues] = useState({ ...INPUT_VALUES });

  const handleValueChange = ({ target: { name, value } }) => {
    setInputValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (value.trim() === '') {
      setInputValues({ ...INPUT_VALUES });
    }
    if (value.length === 4) {
      setDigitWithFocus(value.length - 1);
    }
  }, [value]);

  useEffect(() => {
    if (inputValues) {
      onChange(Object.values(inputValues).join(''));
    }
  }, [inputValues]);

  useEffect(() => {
    if (digitRefs[digitWithFocus]) {
      digitRefs[digitWithFocus].current.focus();
    }
  }, [digitWithFocus]);

  const allowNumbersOnly = e => {
    if (e.which < 48 || e.which > 57) {
      e.preventDefault();
    }
  };

  const handleKeyUp = e => {
    e.persist();
    if (e.key === 'Delete' || e.key === 'Backspace') {
      setDigitWithFocus(parseInt(e.target.name.slice(-1), 10) - 1);
    } else if (e.target.value.trim().length === 1) {
      setDigitWithFocus(parseInt(e.target.name.slice(-1), 10) + 1);
    }
  };

  const copyPasteHandler = event => {
    const textValue = (event.clipboardData || window.clipboardData)
      .getData('text')
      .trim()
      .slice(0, 4);

    setInputValues(prevValues => ({
      ...prevValues,
      digit0: textValue[0],
      digit1: textValue[1],
      digit2: textValue[2],
      digit3: textValue[3],
    }));
    digitRefs[3].current.focus();
  };

  const enableInputHandler = useCallback(
    inputNumber => {
      return !(value.length >= inputNumber);
    },
    [value],
  );

  return (
    <div className="pin">
      {Object.keys(inputValues).map((inputName, index) => (
        <input
          type="password"
          onChange={handleValueChange}
          className="pin__input"
          maxLength={1}
          autoComplete="off"
          onKeyPress={allowNumbersOnly}
          name={inputName}
          value={inputValues[inputName]}
          disabled={enableInputHandler(index)}
          onKeyUp={handleKeyUp}
          ref={digitRefs[index]}
          required
          onPaste={index === 0 ? copyPasteHandler : () => {}}
        />
      ))}
    </div>
  );
};

PINInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default PINInput;
