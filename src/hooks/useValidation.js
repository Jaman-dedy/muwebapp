import { useState } from 'react';

export const EMAIL_REGEX = /\S+@\S+\.\S+/;
export const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const validateEmail = email => {
  return EMAIL_REGEX.test(email);
};

export const useRegexValidation = (regex = '') => {
  const [isValid, setIsValid] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const validationHandler = value => {
    setIsValid(regex.test(value));
  };

  const validateEmailHandler = email => {
    setIsValidEmail(validateEmail(email));
  };

  const validatePasswordHandler = password => {
    setIsValidPassword(PASSWORD_REGEX.test(password));
  };

  return {
    isValid,
    isValidEmail,
    validate: validationHandler,
    validateEmail: validateEmailHandler,
    setIsValid,
    isValidPassword,
    validatePassword: validatePasswordHandler,
    setIsValidEmail,
    setIsValidPassword,
  };
};
