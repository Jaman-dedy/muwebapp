import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import checkEmail from 'helpers/checkEmail';

import getUserLocationDataAction from 'redux/actions/users/userLocationData';

export default ({ registrationData, setScreenNumber }) => {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { firstName, lastName, email } = registrationData;

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
      : 'Please provide your First Name.';
    const lastNameError = lastName
      ? ''
      : 'Please provide your Last Name.';
    const emailError =
      !email || checkEmail(email)
        ? ''
        : 'Please provide a valid e-mail.';

    setErrors({
      ...errors,
      firstName: firstNameError,
      lastName: lastNameError,
      email: emailError,
    });
    return !(firstNameError || lastNameError || emailError);
  };
  const handleNext = () => {
    return validate() && setScreenNumber(2);
  };

  useEffect(() => {
    getUserLocationDataAction()(dispatch);
  }, []);

  return {
    handleNext,
    validate,
    errors,
    clearError,
  };
};
