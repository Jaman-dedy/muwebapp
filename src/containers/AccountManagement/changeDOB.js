/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import moment from 'moment';

import updateDOBAction, {
  restoreUpdateDOB,
} from 'redux/actions/userAccountManagement/updateDOB';
import { updateAuthData } from 'redux/actions/users/login';

export default () => {
  const { userData } = useSelector(({ user }) => user);
  const { updateDOB } = useSelector(
    ({ userAccountManagement }) => userAccountManagement,
  );
  const dispatch = useDispatch();
  // const maxDate = moment().subtract(8, 'years');
  const initialDate = moment().subtract(25, 'years');

  const [DateOfBirth, setDateOfBirth] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [maxDate, setMaxDate] = useState('');

  const [error, setError] = useState('');

  const handleInputChange = (_, { value }) => {
    setError('');
    setDisabled(false);
    setDateOfBirth(value);
  };

  const validateForm = () => {
    const DateOfBirthError = DateOfBirth
      ? ''
      : global.translate('Please provide your date of birth', 2052);

    const DateOfBirthValid = !isNaN(new Date(DateOfBirth).getTime())
      ? ''
      : global.translate(
          'Please provide a valid date of birth',
          2053,
        );

    const greaterThanMaxDate =
      new Date(DateOfBirth).getTime() <=
      new Date(maxDate.format('YYYY-MM-DD')).getTime()
        ? ''
        : global.translate(
            'Please provide a valid date of birth',
            2053,
          );

    setError(
      DateOfBirthError || DateOfBirthValid || greaterThanMaxDate,
    );
    return !!(
      DateOfBirthError ||
      DateOfBirthValid ||
      greaterThanMaxDate
    );
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
      const { MinimumAge, DateOfBirth } = data;
      const dob = DateOfBirth === '1900-01-01' ? '' : DateOfBirth;

      setDateOfBirth(dob || '');
      setMaxDate(moment().subtract(MinimumAge || 8, 'years'));
    }
  }, [userData]);

  useEffect(() => {
    if (updateDOB.success) {
      toast.success(updateDOB.Description);
      setDisabled(true);
      restoreUpdateDOB()(dispatch);
      updateAuthData({ DOBSet: 'YES' })(dispatch);
    }
    if (updateDOB.error) {
      toast.success(updateDOB.error.Description);
    }
  }, [updateDOB]);

  return {
    DateOfBirth,
    maxDate,
    initialDate,
    error,
    handleSubmit,
    handleInputChange,
    updateDOB,
    disabled,
  };
};
