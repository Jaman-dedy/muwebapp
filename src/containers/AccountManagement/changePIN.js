/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import updatePINAction, {
  restoreUpdatePIN,
} from 'redux/actions/userAccountManagement/updatePIN';

export default () => {
  const dispatch = useDispatch();
  const { updatePIN } = useSelector(
    ({ userAccountManagement }) => userAccountManagement,
  );

  const [errors, setErrors] = useState({});
  const [changePINData, setChangePINData] = useState({
    currentPin: '',
    pin: '',
    confirmPin: '',
  });

  const clearError = name => {
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleInputChange = ({ target: { name, value } }) => {
    clearError(name);
    setChangePINData({
      ...changePINData,
      [name]: value,
    });
  };

  const checkSequence = thisPin => {
    const numbers = '0123456789';
    const numbersRev = '9876543210';

    return (
      numbers.indexOf(String(thisPin)) === -1 &&
      numbersRev.indexOf(String(thisPin)) === -1
    );
  };

  const checkDigitsEquality = thisPin => {
    const pattern = RegExp('^(\\d)(?!\\1+$)\\d{3}$');

    if (pattern.test(thisPin)) {
      return true;
    }
    return false;
  };

  /**
   * @returns {bool} true if no error
   */
  const validate = () => {
    const { pin, confirmPin, currentPin } = changePINData;
    const pinError = pin
      ? ''
      : 'Please provide a valid PIN number. It must contains 4 digits.';

    const currentPinError = currentPin
      ? ''
      : 'Please provide the current PIN number.';

    const pinLengthError =
      pin.length === 4
        ? ''
        : 'Please provide a valid PIN number. It must contains 4 digits.';

    const pinCharacterError =
      pin.search(/[A-Z]/) === -1 &&
      pin.search(/[a-z]/) === -1 &&
      pin.search(/[@!#$%^&*]/) === -1
        ? ''
        : 'PIN should only contain numbers';

    const confirmPinError = confirmPin
      ? ''
      : 'Confirm  your PIN number';

    const confirmationError =
      pin === confirmPin ? '' : 'The PIN number do not match.';

    const sequenceError = checkSequence(pin)
      ? ''
      : 'Consecutive numbers are not allowed.';

    const equalityError = !checkDigitsEquality(pin)
      ? 'Your PIN is very week!'
      : '';

    setErrors({
      ...errors,
      pin:
        pinError ||
        pinLengthError ||
        pinCharacterError ||
        sequenceError ||
        equalityError,
      confirmPin: confirmPinError,
      currentPin: currentPinError,
      confirmation: confirmationError,
    });
    return !(
      currentPinError ||
      pinError ||
      pinLengthError ||
      confirmPinError ||
      confirmationError ||
      sequenceError ||
      equalityError
    );
  };

  const handleSubmit = () => {
    if (!validate()) {
      return false;
    }

    // send to the backend
    const { currentPin, pin } = changePINData;
    updatePINAction({
      CurrentPIN: currentPin,
      NewPIN: pin,
    })(dispatch);
    return true;
  };

  useEffect(() => {
    if (updatePIN.success) {
      toast.success(updatePIN.Description);
      setChangePINData({
        currentPin: '',
        pin: '',
        confirmPin: '',
      });
      restoreUpdatePIN()(dispatch);
    }
    if (updatePIN.error) {
      toast.error(updatePIN.error.Description);
      setChangePINData({
        currentPin: '',
        pin: '',
        confirmPin: '',
      });
    }
  }, [updatePIN]);

  return {
    changePINData,
    handleSubmit,
    handleInputChange,
    errors,
    clearError,
    updatePIN,
  };
};
