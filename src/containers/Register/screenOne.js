import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import getUserLocationDataAction from 'redux/actions/users/userLocationData';

export default ({ registrationData, setScreenNumber }) => {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
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
