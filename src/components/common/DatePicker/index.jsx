import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import calendar from 'assets/images/calendar.png';
import 'react-datepicker/dist/react-datepicker.css';
import { validateDate } from 'utils/formatDate';
import './DatePicker.scss';

const DateInput = ({
  onChange,
  placeholder,
  value,
  onClick,
  label,
  setFocused,
  focused,
  minDate,
  maxDate,
}) => {
  /** START  Enable users to type in the date input */
  const [inputValue, setInputValue] = useState(value);
  const [isInvalidDate, setIsInvalidDate] = useState(false);
  const inputRef = useRef();

  const handleInputValueChange = e => {
    const {
      target: { value },
    } = e;

    let newValue = '';

    if (value.trim().length === 4 || value.trim().length === 7) {
      newValue = `${value}-`;
    } else {
      newValue = value;
    }

    if (value.trim().length > 9) {
      const typedDate = new Date(value).getTime();

      if (typedDate < minDate?.getTime()) {
        newValue = minDate?.toISOString().substr(0, 10);
      }
      if (typedDate > maxDate?.getTime()) {
        newValue = maxDate?.toISOString().substr(0, 10);
      }
    }
    setInputValue(newValue);
  };
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (!focused && inputValue && inputRef) {
      onChange({ target: inputRef.current });

      if (inputValue.length === 10) {
        setIsInvalidDate(!validateDate(inputValue));
      }
    }
  }, [inputValue, focused, inputRef, onChange, minDate, maxDate]);

  const handleKeyDown = e => {
    const keyCode = e.which ? e.which : e.keyCode;

    const {
      target: { value },
    } = e;

    if (keyCode === 8 && value.endsWith('-')) {
      e.target.value = value.substr(0, value.length - 1);
    } else if (value.length === 5 && keyCode > 49) {
      e.target.value = `${value.substr(
        0,
        value.length,
      )}0${value.substr(value.length)}`;
    }

    return true;
  };

  /** END  Enable users to type in the date input */

  return (
    <>
      <div>
        <label htmlFor="DateInput">{label}</label>
        <div className={`DateInputContainer ${focused && 'focused'}`}>
          <div className="InputIcon">
            <img src={calendar} alt="" />
          </div>
          <input
            className="DateInput"
            onChange={handleInputValueChange}
            placeholder={placeholder}
            value={inputValue}
            onClick={onClick}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            maxLength={10}
          />
        </div>
      </div>
      {isInvalidDate && (
        <span className="date-error">
          {global.translate('The date is invalid')}
        </span>
      )}
    </>
  );
};
const CustomDatePicker = props => {
  const {
    onDateChange,
    date,
    dateFormat,
    maxDate,
    minDate,
    label,
    placeholder,
  } = props;

  const [focused, setFocused] = useState(false);

  return (
    <DatePicker
      value={date}
      className="datePicker"
      wrapperClassName="datePickerWrapper"
      selected={date}
      onChange={onDateChange}
      customInput={
        <DateInput
          label={label}
          value={date}
          onChange={onDateChange}
          focused={focused}
          setFocused={setFocused}
          onClick
          placeholder
          minDate={minDate}
          maxDate={maxDate}
        />
      }
      dateFormat={dateFormat}
      maxDate={maxDate}
      minDate={minDate}
      showYearDropdown
      showMonthDropdown
      adjustDateOnChange
      yearDropdownItemNumber={100}
      scrollableYearDropdown
      placeholderText={placeholder}
    />
  );
};

CustomDatePicker.propTypes = {
  onDateChange: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  dateFormat: PropTypes.func,
  maxDate: PropTypes.string,
  minDate: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

CustomDatePicker.defaultProps = {
  dateFormat: 'yyyy-MM-dd',
  maxDate: '',
  minDate: '',
  label: '',
  placeholder: '',
};

DateInput.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func,
  label: PropTypes.func,
  setFocused: PropTypes.func,
  focused: PropTypes.bool,
};
DateInput.defaultProps = {
  onChange: () => null,
  placeholder: '',
  value: '',
  onClick: () => null,
  label: '',
  setFocused: () => null,
  focused: false,
};

export default CustomDatePicker;
