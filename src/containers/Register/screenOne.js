import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import checkEmail from 'helpers/checkEmail';

import getUserLocationDataAction from 'redux/actions/users/userLocationData';

export default ({ registrationData, setScreenNumber }) => {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { firstName, lastName, email, userAgrees } = registrationData;

  const {
    user: { userLocationData },
  } = useSelector(state => state);

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

    if (!emailError && !firstNameError && !lastNameError) {
      if (!userAgrees) {
        toast.error(
          global.translate(
            'You must agree to the User Agreement and the Privacy Policy.',
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
    });
    return !(firstNameError || lastNameError || emailError);
  };
  const handleNext = () => {
    return validate() && setScreenNumber(2);
  };

  useEffect(() => {
    if (!userLocationData?.CountryCode) {
      getUserLocationDataAction()(dispatch);
    }
  }, []);

  return {
    handleNext,
    validate,
    errors,
    clearError,
  };
};
