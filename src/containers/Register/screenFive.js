import { useState, useEffect } from 'react';
import checkPassword from 'utils/checkPassword';

export default ({ registrationData, setScreenNumber }) => {
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
    const strength = checkPassword(password);
    let pswdStrength = 0;
    Object.keys(strength).map(type => {
      if (strength[type]) pswdStrength += 25;
      return true;
    });
    setPasswordStrength(pswdStrength);
  }, [registrationData]);

  /**
   * @returns {bool} true if no error
   */
  const validate = () => {
    const passwordError = password
      ? ''
      : 'Please Enter your password';

    const confirmPasswordError = confirmPassword
      ? ''
      : 'Please confirm your password';

    const confirmationError =
      password === confirmPassword
        ? ''
        : 'The two passwords should be the same';

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
    setScreenNumber(6);
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
