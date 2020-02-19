import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import getUserLocationDataAction from 'redux/actions/users/userLocationData';
import verifyPhoneNumberAction from 'redux/actions/users/verifyPhoneNumber';

export default ({ resetPasswordData, setScreenNumber }) => {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { firstName, lastName } = resetPasswordData;
  const { verifyPhoneNumber, userLocationData } = useSelector(
    ({ user }) => user,
  );
  const { countryCode, phoneNumber } = resetPasswordData;
  const handleVerifyPhoneNumber = () => {
    verifyPhoneNumberAction(`${countryCode}${phoneNumber}`)(dispatch);
  };

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
    if (validate()) {
      handleVerifyPhoneNumber();
      setScreenNumber(2);
    }
  };

  useEffect(() => {
    getUserLocationDataAction()(dispatch);
  }, []);

  return {
    handleNext,
    validate,
    errors,
    clearError,
    verifyPhoneNumber,
    userLocationData,
  };
};
