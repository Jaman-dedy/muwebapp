/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  postResetPasswordPrequalification,
  clearResetPasswordData,
} from 'redux/actions/users/resetPasswordPrequalification';
import getUserLocationDataAction from 'redux/actions/users/userLocationData';
import clearResetUserPrequalificationFx from 'redux/actions/users/clearResetPasswordPrequalification';

export default ({
  resetPasswordData,
  setScreenNumber,
  setResetPasswordData,
}) => {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const [phoneValue, setPhoneValue] = useState();
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
      phoneNumber: phoneNumber,
    };

    postResetPasswordPrequalification(payload)(dispatch);
  };
  useEffect(() => {
    if (phoneValue) {
      setResetPasswordData({
        ...resetPasswordData,
        phoneNumber: phoneValue,
      });
    }
  }, [phoneValue]);
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
      : global.translate('Please Enter your user name', 2090);
    const lastNameError = lastName
      ? ''
      : global.translate('Please Enter your Last Name', 2091);

    const phoneNumberError = phoneNumber
      ? ''
      : global.translate('Please Enter Phone number');

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
      clearResetPasswordData({ success: false })(dispatch);
      resetPasswordPrequalificationFx();
    }
  };

  useEffect(() => {
    if (resetPasswordPrequalification.success) {
      setScreenNumber(2);
    }
  }, [resetPasswordPrequalification]);

  useEffect(() => {
    if (!userLocationData?.CountryCode) {
      getUserLocationDataAction()(dispatch);
    }
  }, []);
  return {
    handleNext,
    validate,
    errors,
    clearError,
    resetPasswordPrequalification,
    userLocationData,
    clearResetUserPrequalificationFx,
    phoneValue,
    setPhoneValue,
  };
};
