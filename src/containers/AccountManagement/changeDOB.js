/* eslint-disable no-restricted-globals */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import updateDOBAction, {
  restoreUpdateDOB,
} from 'redux/actions/userAccountManagement/updateDOB';
// import restoreSaveUserDataAction from 'redux/actions/userAccountManagement/restoreSaveUserData.js';

export default () => {
  const { userData } = useSelector(({ user }) => user);
  const { updateDOB } = useSelector(
    ({ userAccountManagement }) => userAccountManagement,
  );
  const dispatch = useDispatch();

  const [DateOfBirth, setDateOfBirth] = useState('');
  const [disabled, setDisabled] = useState(true);

  const [error, setError] = useState('');

  const handleInputChange = (_, { value }) => {
    setError('');
    setDisabled(false);
    setDateOfBirth(value);
  };

  const validateForm = () => {
    const DateOfBirthError = DateOfBirth
      ? ''
      : global.translate('Please provide your date of birth');

    const DateOfBirthValid = !isNaN(new Date(DateOfBirth).getTime())
      ? ''
      : global.translate('Please provide a valid date of birth');

    setError(DateOfBirthError || DateOfBirthValid);
    return !!(DateOfBirthError || DateOfBirthValid);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      return false;
    }
    // send to the backend
    updateDOBAction({ DateOfBirth })(dispatch);
    return true;
  };

  useEffect(() => {
    const { data } = userData;
    if (data) {
      const dob =
        data.DateOfBirth && data.DateOfBirth.includes("'")
          ? data.DateOfBirth.split("'")[1]
          : data.DateOfBirth;

      setDateOfBirth(dob || '');
    }
  }, [userData]);

  useEffect(() => {
    if (updateDOB.success) {
      toast.success(updateDOB.Description);
      setDisabled(true);
      restoreUpdateDOB()(dispatch);
    }
    if (updateDOB.error) {
      toast.success(updateDOB.error.Description);
    }
  }, [updateDOB]);

  return {
    DateOfBirth,
    error,
    handleSubmit,
    handleInputChange,
    updateDOB,
    disabled,
  };
};
