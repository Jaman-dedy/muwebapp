import { useState } from 'react';

export default ({ registrationData, setScreenNumber }) => {
  const [errors, setErrors] = useState({});
  const { firstName, lastName } = registrationData;

  const clearError = ({ target: { name } }) => {
    setErrors({
      ...errors,
      [name]: '',
    });
  };
  /**
   * @returns {bool} true if no error
   */
  const validate = () => {
    const firstNameError = firstName
      ? ''
      : 'Please Enter your firstName';
    const lastNameError = lastName
      ? ''
      : 'Please Enter your lastName';

    setErrors({
      ...errors,
      firstName: firstNameError,
      lastName: lastNameError,
    });
    return !(firstNameError || lastNameError);
  };
  const handleNext = () => {
    return validate() && setScreenNumber(2);
  };

  return {
    handleNext,
    validate,
    errors,
    clearError,
  };
};
