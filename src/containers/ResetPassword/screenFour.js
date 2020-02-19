import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import verifyPIDAction from 'redux/actions/users/verifyPID';

export default ({ resetPasswordData, setScreenNumber }) => {
  const [errors, setErrors] = useState({});
  const { personalId } = resetPasswordData;

  const { verifyPID } = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  const handleVerifyPID = () => {
    verifyPIDAction(personalId)(dispatch);
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
      : 'Please Enter your personal Id';

    const personalIdSpecialCharacterError =
      personalId.search(/[@!#$%^&*]/) === -1
        ? ''
        : 'Your personal Id should not contain special characters';

    setErrors({
      ...errors,
      personalId: personalIdError || personalIdSpecialCharacterError,
    });
    return !(personalIdError || personalIdSpecialCharacterError);
  };

  const handleNext = () => {
    if (!validate()) {
      return false;
    }
    handleVerifyPID();
    return true;
  };

  useEffect(() => {
    if (verifyPID.isValid) {
      setScreenNumber(5);
    }
  }, [verifyPID]);

  return {
    handleNext,
    validate,
    errors,
    clearError,
    verifyPID,
  };
};
