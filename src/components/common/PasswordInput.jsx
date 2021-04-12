import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import 'text-security/text-security.css';
import './PasswordInput.scss';

const PasswordInput = ({
  name,
  label,
  placeholder,
  value,
  error,
  required,
  onChange,
  iconClassName,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [type, setType] = useState('password');
  useEffect(() => {
    if (isPasswordVisible) {
      setType('text');
    } else {
      setType('password');
    }
  }, [isPasswordVisible]);

  return (
    <Form.Input
      className={
        !value.length || isPasswordVisible ? '' : 'password_input'
      }
      placeholder={global.translate(placeholder)}
      icon={{
        name: isPasswordVisible ? 'eye slash' : 'eye',
        link: true,
        className: iconClassName,
        onClick: () => setPasswordVisible(!isPasswordVisible),
      }}
      label={label}
      type={type}
      name={name}
      value={value}
      error={error}
      required={required}
      onChange={onChange}
    />
  );
};

PasswordInput.defaultProps = {
  name: 'password',
  label: '',
  placeholder: '',
  required: false,
  value: '',
  error: false,
  onChange: e => e,
  iconClassName: 'text-black',
};

PasswordInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onChange: PropTypes.func,
  iconClassName: PropTypes.string,
};

export default PasswordInput;
