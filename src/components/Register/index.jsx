import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import AuthWrapper from '../common/AuthWrapper/AuthWrapper';
import Congratulation from './Congratulation';
import IdentityForm from './IdentityForm';
import OTPForm from './OTPForm';
import UsernameForm from './UsernameForm';

const Register = ({
  registrationData,
  setRegistrationData,
  handleInputChange,
  formErrors,
  screenNumber,
  setScreenNumber,
  identityData,
  verifyOtp,
  userNameData,
  congratulationPage,
  referralScreen,
}) => {
  const [formIsHalfFilled, setFormIsHalfFilled] = useState(false);
  useEffect(() => {
    const warnBeforeUnload = e => {
      e.preventDefault();
      return formIsHalfFilled;
    };

    window.onbeforeunload = warnBeforeUnload;

    return () => {
      window.removeEventListener('beforeunload', warnBeforeUnload);
    };
  }, [formIsHalfFilled]);

  useEffect(() => {
    const {
      phoneNUmber,
      countryCode,
      userAgrees,
      ...userFormData
    } = registrationData;

    if (
      Object.values(userFormData).some(
        value => value.toString().trim().length !== '',
      )
    ) {
      setFormIsHalfFilled(true);
    } else {
      setFormIsHalfFilled(false);
    }
  }, [registrationData]);

  const renderForm = () => {
    const onClickHandler = () =>
      setScreenNumber(screenNumber - 1 || 1);
    switch (screenNumber) {
      case 1:
        return (
          <IdentityForm
            formErrors={formErrors}
            registrationData={registrationData}
            onInputChange={handleInputChange}
            screenNumber={screenNumber}
            setScreenNumber={setScreenNumber}
            identityData={identityData}
          />
        );
      case 2:
        return (
          <OTPForm
            formErrors={formErrors}
            registrationData={registrationData}
            setRegistrationData={setRegistrationData}
            onInputChange={handleInputChange}
            screenNumber={screenNumber}
            setScreenNumber={setScreenNumber}
            verifyOtp={verifyOtp}
            onClickHandler={onClickHandler}
          />
        );
      case 3:
        return (
          <UsernameForm
            formErrors={formErrors}
            registrationData={registrationData}
            onInputChange={handleInputChange}
            screenNumber={screenNumber}
            setScreenNumber={setScreenNumber}
            userNameData={userNameData}
          />
        );

      case 4:
        return (
          <Congratulation
            registrationData={registrationData}
            screenNumber={screenNumber}
            setScreenNumber={setScreenNumber}
            congratulationPage={congratulationPage}
          />
        );
      default:
        return null;
    }
  };

  const setTitle = () => {
    switch (screenNumber) {
      case 1:
        return global.translate('Register');
      case 2:
        return global.translate('Register');
      case 3:
        return global.translate('Register');
      case 4:
        return global.translate('Congratulations');

      default:
        return global.translate('Register');
    }
  };

  return screenNumber === 4 ? (
    renderForm()
  ) : (
    <AuthWrapper
      rightHeadlineText={global.translate(setTitle())}
      register={screenNumber === 1}
    >
      <div>{renderForm()}</div>
      <div className="dots">
        {Array(4)
          .fill()
          .map((value, index) => (
            <div
              key={Math.random() * 1000}
              className={`dot ${
                index + 1 === screenNumber ? 'active' : null
              }`}
            />
          ))}
      </div>
    </AuthWrapper>
  );
};

Register.propTypes = {
  registrationData: PropTypes.instanceOf(Object).isRequired,
  setRegistrationData: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func,
  formErrors: PropTypes.instanceOf(Object),
  screenNumber: PropTypes.number,
  setScreenNumber: PropTypes.func.isRequired,
  identityData: PropTypes.instanceOf(Object).isRequired,
  screenTwo: PropTypes.instanceOf(Object).isRequired,
  verifyOtp: PropTypes.instanceOf(Object).isRequired,
  userNameData: PropTypes.instanceOf(Object).isRequired,
  passwordData: PropTypes.instanceOf(Object).isRequired,
  pinData: PropTypes.instanceOf(Object).isRequired,
  congratulationPage: PropTypes.instanceOf(Object).isRequired,
  referralScreen: PropTypes.instanceOf(Object).isRequired,
};

Register.defaultProps = {
  formErrors: {},
  screenNumber: 1,
  handleInputChange: () => null,
};

export default Register;
