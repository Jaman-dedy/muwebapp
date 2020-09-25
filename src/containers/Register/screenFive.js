/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import checkPassword from 'utils/checkPassword';

export default ({
  registrationData,
  setScreenNumber,
  screenNumber,
}) => {
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0); // passwordStrength in percentage
  const { password, confirmPassword } = registrationData;

  const clearError = ({ target: { name } }) => {
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  useEffect(() => {
    if (screenNumber === 4) {
      const strength = checkPassword(password);
      let pswdStrength = 0;
      Object.keys(strength).map(type => {
        if (strength[type]) pswdStrength += 25;
        return true;
      });
      setPasswordStrength(pswdStrength);
    }
  }, [registrationData]);

  /**
   * @returns {bool} true if no error
   */
  const validate = () => {
    const passwordError = password
      ? ''
      : global.translate('Please Enter your password', 2085);

    const confirmPasswordError = confirmPassword
      ? ''
      : global.translate('Please confirm your password', 2086);

    const confirmationError =
      password === confirmPassword
        ? ''
        : global.translate('The passwords do not match.', 47);

    setErrors({
      ...errors,
      password: passwordError,
      confirmPassword: confirmPasswordError,
      confirmation: confirmPasswordError ? '' : confirmationError,
    });
    return !(
      passwordError ||
      confirmPasswordError ||
      confirmationError
    );
  };

  const handleNext = () => {
    if (!validate()) {
      return false;
    }
    setScreenNumber(5);
    return true;
  };

  useEffect(() => {}, []);

  return {
    handleNext,
    validate,
    errors,
    clearError,
    passwordStrength,
  };
};
