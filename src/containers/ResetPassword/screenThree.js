/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import checkPassword from 'utils/checkPassword';

export default ({
  resetPasswordData,
  setScreenNumber,
  screenNumber,
}) => {
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0); // passwordStrength in percentage
  const { password, confirmPassword } = resetPasswordData;

  const clearError = ({ target: { name } }) => {
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  useEffect(() => {
    if (screenNumber === 3) {
      const strength = checkPassword(password);
      let pswdStrength = 0;
      Object.keys(strength).map(type => {
        if (strength[type]) pswdStrength += 25;
        return true;
      });
      setPasswordStrength(pswdStrength);
    }
  }, [resetPasswordData]);

  /**
   * @returns {bool} true if no error
   */
  const validate = () => {
    const passwordError = password
      ? ''
      : global.translate('New password', 312);

    const confirmPasswordError = confirmPassword
      ? ''
      : global.translate('Confirm your new password', 313);

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
    if (validate()) {
      setScreenNumber(4);
    }
  };

  return {
    handleNext,
    validate,
    errors,
    clearError,
    passwordStrength,
  };
};
