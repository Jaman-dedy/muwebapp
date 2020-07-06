import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import locateUser, {
  clearFoundUser,
} from 'redux/actions/contacts/locateUser';
import countryCurrenciesAction from 'redux/actions/users/countryCurrencies';
import registerUserAction from 'redux/actions/users/registerUser';

export default ({
  registrationData,
  setScreenNumber,
  setRegistrationData,
}) => {
  const [errors, setErrors] = useState({});
  const { ReferralPID } = registrationData;

  const dispatch = useDispatch();

  const searchData = useSelector(state => state.contacts.locateUser);
  const { registerUser, countryCurrencies } = useSelector(
    ({ user }) => user,
  );

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
    const ReferralPIDError = ReferralPID
      ? ''
      : 'Please provide a valid Personal ID';

    const ReferralPIDSpecialCharacterError =
      ReferralPID.search(/[@!#$%^&*]/) === -1
        ? ''
        : 'Your personal Id should not contain special characters';

    setErrors({
      ...errors,
      ReferralPID:
        ReferralPIDError || ReferralPIDSpecialCharacterError,
    });
    return !(ReferralPIDError || ReferralPIDSpecialCharacterError);
  };

  const handleGetCountryCurrencies = () => {
    countryCurrenciesAction(registrationData.countryCode)(dispatch);
  };

  const handleSubmit = () => {
    if (!ReferralPID) return false;
    if (!validate()) {
      return false;
    }
    locateUser({
      PID: ReferralPID.trim(),
    })(dispatch);
    return true;
  };

  const handleNext = stat => {
    if (
      stat === 'skip' ||
      ReferralPID === '' ||
      registrationData.ContactPID === ''
    ) {
      delete registrationData.ContactPID;
      delete registrationData.ReferralPID;
      return registerUserAction(registrationData)(dispatch);
    }

    return registerUserAction(registrationData)(dispatch);
  };

  useEffect(() => {
    const { error, data, loading } = searchData;
    if (searchData.error) {
      setErrors({
        ...errors,
        ReferralPID: searchData.error && searchData.error.Description,
      });
    } else if (
      data &&
      data[0].Result === 'Success' &&
      !loading &&
      !error &&
      !errors.ReferralPID &&
      ReferralPID &&
      ReferralPID !== ''
    ) {
      setRegistrationData({
        ...registrationData,
        ContactPID: data[0].PID,
      });
    }
  }, [searchData]);

  useEffect(() => {
    if (registerUser.success) {
      handleGetCountryCurrencies();
    }
  }, [registerUser]);

  useEffect(() => {
    if (countryCurrencies.success) {
      setScreenNumber(8);
    }
  }, [countryCurrencies]);

  return {
    handleNext,
    handleSubmit,
    validate,
    errors,
    clearError,
    searchData,
    clearFoundUser,
    registerUser,
  };
};
