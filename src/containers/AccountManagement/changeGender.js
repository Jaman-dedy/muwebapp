/* eslint-disable no-restricted-globals */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import updateGenderAction, {
  restoreUpdateGender,
} from 'redux/actions/userAccountManagement/updateGender';

export default () => {
  const { userData } = useSelector(({ user }) => user);
  const { updateGender } = useSelector(
    ({ userAccountManagement }) => userAccountManagement,
  );
  const dispatch = useDispatch();

  const options = [
    { key: '0', text: global.translate('Unkown'), value: '0' },
    { key: '1', text: global.translate('Female'), value: '1' },
    { key: '2', text: global.translate('Male'), value: '2' },
  ];

  const [Gender, setGender] = useState({});
  const [disabled, setDisabled] = useState(true);

  const [error, setError] = useState('');

  const handleInputChange = (_, { value }) => {
    const gender = options.find(({ key }) => key === value) || {};
    setError('');
    const { data } = userData;
    if (data && data.Gender && value !== data.Gender.Number)
      setDisabled(false);
    else setDisabled(true);

    setGender({ Number: gender.value, Name: gender.text });
  };

  const validateForm = () => {
    const GenderError = Gender
      ? ''
      : global.translate('Please provide your gender');

    setError(GenderError);
    return !!GenderError;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      return false;
    }
    // send to the backend
    updateGenderAction({ Gender: Gender.Number })(dispatch);
    return true;
  };

  useEffect(() => {
    const { data } = userData;
    if (data) setGender(data.Gender);
  }, [userData]);

  useEffect(() => {
    if (updateGender.success) {
      toast.success(updateGender.Description);
      setDisabled(true);
      restoreUpdateGender()(dispatch);
    } else if (updateGender.error) {
      toast.error(updateGender.error.Description);
    }
  }, [updateGender]);

  return {
    Gender,
    options,
    error,
    handleSubmit,
    handleInputChange,
    updateGender,
    disabled,
  };
};
