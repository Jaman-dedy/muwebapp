import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import countryCurrenciesAction from 'redux/actions/users/countryCurrencies';
import resetPasswordAction from 'redux/actions/users/resetPassword';

export default ({ resetPasswordData, setScreenNumber }) => {
  const [errors, setErrors] = useState({});
  const { pin, confirmPin } = resetPasswordData;

  const dispatch = useDispatch();
  const { registerUser, countryCurrencies } = useSelector(
    ({ user }) => user,
  );

  const clearError = ({ target: { name } }) => {
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleResetPassword = () => {
    resetPasswordAction(resetPasswordData)(dispatch);
  };

  const handleGetCountryCurrencies = () => {
    countryCurrenciesAction(resetPasswordData.countryCode)(dispatch);
  };

  /**
   * @returns {bool} true if no error
   */
  const validate = () => {
    const pinError = pin ? '' : 'Please Enter your PIN';

    const pinLengthError =
      pin.length === 4 ? '' : 'Please Fill all the PIN fields';

    const pinCharacterError =
      pin.search(/[A-Z]/) === -1 &&
      pin.search(/[a-z]/) === -1 &&
      pin.search(/[@!#$%^&*]/) === -1
        ? ''
        : 'PIN should only contain numbers';

    const confirmPinError = confirmPin
      ? ''
      : 'Please confirm your PIN';

    const confirmationError =
      pin === confirmPin ? '' : 'The two PIN should be the same';

    setErrors({
      ...errors,
      pin: pinError || pinLengthError || pinCharacterError,
      confirmPin: confirmPinError,
      confirmation: confirmPinError ? '' : confirmationError,
    });
    return !(
      pinError ||
      pinLengthError ||
      confirmPinError ||
      confirmationError
    );
  };

  const handleNext = () => {
    /* if (!validate()) {
      return false;
    }
    handleResetPassword();
    return true; */

    setScreenNumber(5);
  };

  useEffect(() => {
    if (registerUser.success) {
      handleGetCountryCurrencies();
    }
  }, [registerUser]);

  useEffect(() => {
    if (countryCurrencies.success) {
      setScreenNumber(7);
    }
  }, [countryCurrencies]);

  return {
    handleNext,
    validate,
    errors,
    clearError,
    registerUser,
  };
};
