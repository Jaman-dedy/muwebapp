/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
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
  const [phonevalue, setPhonevalue] = useState();
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const {
    firstName,
    lastName,
    email,
    userAgrees,
    countryCode,
    phoneNumber,
  } = registrationData;
  const {
    verifyPhoneNumber,
    sendOTP,
    userLocationData,
  } = useSelector(({ user }) => user);

  useEffect(() => {
    if (phonevalue) {
      setRegistrationData({
        ...registrationData,
        phoneNumber: phonevalue,
      });
    }
  }, [phonevalue]);

  const handleVerifyPhoneNumber = () => {
    verifyPhoneNumberAction(`${countryCode}${phoneNumber}`)(dispatch);
  };

  const handleSendOTP = () => {
    sendOTPAction(`${countryCode}${phoneNumber}`)(dispatch);
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
    const firstNameError = firstName
      ? ''
      : global.translate('Please provide your First Name.', 18);
    const lastNameError = lastName
      ? ''
      : global.translate('Please provide your Last Name.', 19);

    const emailError =
      !email || checkEmail(email)
        ? ''
        : global.translate('Please provide a valid e-mail.', 29);
    const phoneNumberError = phoneNumber
      ? ''
      : global.translate('Please provide a valid phone number.', 20);

    if (
      !emailError &&
      !firstNameError &&
      !lastNameError &&
      !phoneNumberError
    ) {
      if (!userAgrees) {
        toast.error(
          global.translate(
            'You must agree to the User Agreement and the Privacy Policy.',
            2087,
          ),
        );

        return;
      }
    }

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
      setScreenNumber(2);
    }
  }, [sendOTP]);

  return {
    handleNext,
    validate,
    errors,
    clearError,
    userLocationData,
    verifyPhoneNumber,
    phonevalue,
    setPhonevalue,
  };
};
