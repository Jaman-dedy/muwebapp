import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

const PasswordInput = ({
  name,
  label,
  placeholder,
  value,
  required,
  onChange,
  iconClassName,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  return (
    <Form.Input
      placeholder={placeholder}
      icon={{
        name: isPasswordVisible ? 'eye slash' : 'eye',
        link: true,
        className: iconClassName,
        onClick: () => setPasswordVisible(!isPasswordVisible),
      }}
      label={label}
      type={isPasswordVisible ? 'text' : 'password'}
      name={name}
      value={value}
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
  onChange: e => e,
  iconClassName: 'text-black',
};

PasswordInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  iconClassName: PropTypes.string,
};

export default PasswordInput;
