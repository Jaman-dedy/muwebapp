/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import verifyPhoneNumberAction, {
  clearPhoneNumber,
} from 'redux/actions/users/verifyPhoneNumber';
import sendOTPAction from 'redux/actions/users/sendOTP';
import checkEmail from 'helpers/checkEmail';

export default ({
  registrationData,
  setScreenNumber,
  setRegistrationData,
}) => {
  const dispatch = useDispatch();
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
  } = registrationData;
  const {
    verifyPhoneNumber,
    sendOTP,
    userLocationData,
  } = useSelector(({ user }) => user);

  const [phonevalue, setPhonevalue] = useState();
  const [errors, setErrors] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(new Date('2003/01/01'));
  const [nationalityCountry, setNationalityCountry] = useState('');

  const [
    openTermsAndConditionModal,
    setOpenTermsAndConditionModal,
  ] = useState(false);

  /**
   * @returns {bool} true if no error
   */
  const validate = () => {
    const firstNameError = firstName
      ? ''
      : global.translate('Please provide your First Name.');
    const lastNameError = lastName
      ? ''
      : global.translate('Please provide your Last Name.');

    const emailError =
      !email || checkEmail(email)
        ? ''
        : global.translate('Please provide a valid e-mail.');
    const phoneNumberError =
      phoneNumber &&
      phoneNumber.length > 6 &&
      phoneNumber.length <= 15
        ? ''
        : global.translate(
            'Please provide a valid phone number.',
          );

    setErrors({
      ...errors,
      firstName: firstNameError,
      lastName: lastNameError,
      email: emailError,
      phoneNumber: phoneNumberError,
    });
    return !(
      firstNameError ||
      lastNameError ||
      emailError ||
      phoneNumberError
    );
  };

  useEffect(() => {
    if (userLocationData) {
      setNationalityCountry(userLocationData?.CountryCode);
    }
  }, [userLocationData]);

  useEffect(() => {
    if (phonevalue) {
      validate();
      setRegistrationData({
        ...registrationData,
        phoneNumber: phonevalue,
      });
    }
  }, [phonevalue]);

  useEffect(() => {
    setRegistrationData({
      ...registrationData,
      DateOfBirth: moment(startDate).format('YYYY-MM-DD'),
    });
  }, [startDate]);

  const handleVerifyPhoneNumber = () => {
    verifyPhoneNumberAction(phoneNumber)(dispatch);
  };

  const handleSendOTP = () => {
    sendOTPAction(phoneNumber)(dispatch);
  };

  const clearError = ({ target: { name } }) => {
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleNext = () => {
    return validate() && handleVerifyPhoneNumber();
  };
  useEffect(() => {
    if (verifyPhoneNumber.isValid) {
      handleSendOTP();
      clearPhoneNumber()(dispatch);
    }
  }, [verifyPhoneNumber]);

  useEffect(() => {
    if (sendOTP.success) {
      setOpenTermsAndConditionModal(true);
    }
  }, [sendOTP]);

  const handleTermsAndCondition = () => {
    setScreenNumber(2);
    setOpenTermsAndConditionModal(false);
  };

  useEffect(() => {
    if (nationalityCountry) {
      setRegistrationData({
        ...registrationData,
        countryCode: nationalityCountry.toLocaleLowerCase(),
      });
    }
  }, [nationalityCountry]);

  return {
    handleNext,
    validate,
    errors,
    clearError,
    userLocationData,
    verifyPhoneNumber,
    phonevalue,
    setPhonevalue,
    openTermsAndConditionModal,
    setOpenTermsAndConditionModal,
    handleTermsAndCondition,
    startDate,
    setStartDate,
    endDate,
    setNationalityCountry,
    nationalityCountry,
  };
};
