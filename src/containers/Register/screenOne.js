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
      : global.translate('Please provide your First Name.', 18);
    const lastNameError = lastName
      ? ''
      : global.translate('Please provide your Last Name.', 19);
    const emailError =
      !email || checkEmail(email)
        ? ''
        : global.translate('Please provide a valid e-mail.', 29);

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
