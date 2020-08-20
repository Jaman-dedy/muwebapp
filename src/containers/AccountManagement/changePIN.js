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
      : global.translate(
          'Please provide a valid PIN number. It must contains 4 digits.',
          944,
        );

    const currentPinError = currentPin ? '' : 'PIN Number';

    const pinLengthError =
      pin.length === 4
        ? ''
        : global.translate(
            'Please provide a valid PIN number. It must contains 4 digits.',
            944,
          );

    const pinCharacterError =
      pin.search(/[A-Z]/) === -1 &&
      pin.search(/[a-z]/) === -1 &&
      pin.search(/[@!#$%^&*]/) === -1
        ? ''
        : global.translate('PIN should only contain numbers', 1723);

    const confirmPinError = confirmPin
      ? ''
      : global.translate('Confirm  your PIN number', 941);

    const confirmationError =
      pin === confirmPin
        ? ''
        : global.translate('Your PIN numbers do not match.', 741);

    const sequenceError = checkSequence(pin)
      ? ''
      : global.translate(
          'Consecutive numbers are not allowed.',
          1707,
        );

    const equalityError = !checkDigitsEquality(pin)
      ? global.translate('Your PIN is very weak!', 1708)
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
