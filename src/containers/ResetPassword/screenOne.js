import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clearResetUserPrequalificationFx from 'redux/actions/users/clearResetPasswordPrequalification';
import {
  clearResetPasswordData,
  postResetPasswordPrequalification,
} from 'redux/actions/users/resetPasswordPrequalification';
import getUserLocationDataAction from 'redux/actions/users/userLocationData';

export default ({
  resetPasswordData,
  setScreenNumber,
  setResetPasswordData,
}) => {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const [phoneValue, setPhoneValue] = useState();
  const { personalId, lastName, phoneNumber } = resetPasswordData;
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
      phoneNumber,
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
      : global.translate('Please Enter Phone number', 2145);

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
      clearResetPasswordData({ success: false })(dispatch);
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
