import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postResetPasswordPrequalification } from 'redux/actions/users/resetPasswordPrequalification';

import getUserLocationDataAction from 'redux/actions/users/userLocationData';
import clearResetUserPrequalificationFx from 'redux/actions/users/clearResetPasswordPrequalification';

export default ({ resetPasswordData, setScreenNumber }) => {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const {
    personalId,
    lastName,
    countryCode,
    phoneNumber,
  } = resetPasswordData;

  const {
    userLocationData,
    resetPasswordPrequalification,
    resetPassword,
  } = useSelector(({ user }) => user);

  const resetPasswordPrequalificationFx = () => {
    const payload = {
      ...resetPasswordData,
      DOB:
        resetPassword.DOBSet === 'Yes' ? resetPasswordData.DOB : '',
      DOBSet: resetPassword.DOBSet,
      phoneNumber: `${countryCode}${phoneNumber}`,
    };

    postResetPasswordPrequalification(payload)(dispatch);
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
    const personalIdError = personalId
      ? ''
      : 'Please Enter your Person ID';
    const lastNameError = lastName
      ? ''
      : 'Please Enter your lastName';

    const phoneNumberError = phoneNumber
      ? ''
      : 'Pplease Enter Phone number';

    setErrors({
      ...errors,
      personalId: personalIdError,
      lastName: lastNameError,
      phoneNumber: phoneNumberError,
    });

    return !(personalIdError || lastNameError || phoneNumberError);
  };
  const handleNext = () => {
    if (validate()) {
      resetPasswordPrequalificationFx();
    }
  };

  useEffect(() => {
    if (resetPasswordPrequalification.success) {
      setScreenNumber(2);
    }
  }, [resetPasswordPrequalification]);

  useEffect(() => {
    getUserLocationDataAction()(dispatch);
  }, []);

  return {
    handleNext,
    validate,
    errors,
    clearError,
    resetPasswordPrequalification,
    userLocationData,
    clearResetUserPrequalificationFx,
  };
};
