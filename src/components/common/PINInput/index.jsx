import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const PINInput = ({ value, onChange, numberOfInputs, type }) => {
  const digitRefs = useRef([]);
  const [digitWithFocus, setDigitWithFocus] = useState(null);

  const INPUT_VALUES = useMemo(() => ({}), []);

  useEffect(() => {
    [...Array(numberOfInputs).keys()].forEach(key => {
      INPUT_VALUES[`digit${key}`] = '';
    });
  }, [numberOfInputs, INPUT_VALUES]);

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
    if (value.length === numberOfInputs) {
      setDigitWithFocus(value.length - 1);
    }
  }, [value, numberOfInputs, INPUT_VALUES]);

  useEffect(() => {
    if (inputValues) {
      onChange(Object.values(inputValues).join(''));
    }
  }, [inputValues, onChange]);

  useEffect(() => {
    if (digitRefs.current[digitWithFocus]) {
      digitRefs.current[digitWithFocus].focus();
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
      .slice(0, numberOfInputs);

    setInputValues(prevValues => {
      const data = Object.keys(INPUT_VALUES).reduce(
        (obj, key, index) => {
          obj[key] = textValue[index];
          return obj;
        },
        {},
      );

      return {
        ...prevValues,
        ...data,
      };
    });
    digitRefs.current[numberOfInputs - 1].focus();
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
          type={type}
          onChange={handleValueChange}
          className="pin__input"
          maxLength={1}
          autoComplete="off"
          onKeyPress={allowNumbersOnly}
          name={inputName}
          value={inputValues[inputName]}
          disabled={enableInputHandler(index)}
          onKeyUp={handleKeyUp}
          ref={el => {
            digitRefs.current[index] = el;
          }}
          required
          onPaste={index === 0 ? copyPasteHandler : () => {}}
          key={inputName}
        />
      ))}
    </div>
  );
};

PINInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  numberOfInputs: PropTypes.number,
  type: PropTypes.string,
};

PINInput.defaultProps = {
  numberOfInputs: 4,
  type: 'password',
};

export default PINInput;
