import React from 'react';
import PropTypes from 'prop-types';

import AuthWrapper from '../common/AuthWrapper/AuthWrapper';
import ReferralForm from './ReferralForm';
import IdentityForm from './IdentityForm';
import OTPForm from './OTPForm';
import PIDForm from './PIDForm';
import PasswordForm from './PasswordForm';
import PINForm from './PINForm';
import Congratulation from './Congratulation';

import './style.scss';

const Register = ({
  registrationData,
  setRegistrationData,
  handleInputChange,
  formErrors,
  screenNumber,
  setScreenNumber,
  screenOne,
  screenThree,
  screenFour,
  screenFive,
  screenSix,
  screenSeven,
  referralScreen,
}) => {
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
            screenOne={screenOne}
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
            screenThree={screenThree}
            onClickHandler={onClickHandler}
          />
        );
      case 3:
        return (
          <PIDForm
            formErrors={formErrors}
            registrationData={registrationData}
            onInputChange={handleInputChange}
            screenNumber={screenNumber}
            setScreenNumber={setScreenNumber}
            screenFour={screenFour}
          />
        );
      case 4:
        return (
          <PasswordForm
            formErrors={formErrors}
            registrationData={registrationData}
            onInputChange={handleInputChange}
            screenNumber={screenNumber}
            setScreenNumber={setScreenNumber}
            screenFive={screenFive}
            onClickHandler={onClickHandler}
          />
        );
      case 5:
        return (
          <PINForm
            formErrors={formErrors}
            registrationData={registrationData}
            onInputChange={handleInputChange}
            screenNumber={screenNumber}
            setScreenNumber={setScreenNumber}
            screenSix={screenSix}
            onClickHandler={onClickHandler}
          />
        );
      case 6:
        return (
          <ReferralForm
            registrationData={registrationData}
            onInputChange={handleInputChange}
            referralScreen={referralScreen}
            onClickHandler={onClickHandler}
          />
        );
      case 7:
        return (
          <Congratulation
            registrationData={registrationData}
            screenNumber={screenNumber}
            setScreenNumber={setScreenNumber}
            screenSeven={screenSeven}
          />
        );
      default:
        return null;
    }
  };

  const setTitle = () => {
    switch (screenNumber) {
      case 1:
        return 'Register for a free account';
      case 2:
        return 'Phone verification';
      case 3:
        return 'Username';
      case 4:
        return 'Password';
      case 5:
        return 'PIN Number';
      case 6:
        return global.translate('Add a referral', 1412);
      case 7:
        return 'Congrtulation';

      default:
        return 'Register for a free account';
    }
  };

  return screenNumber === 7 ? (
    renderForm()
  ) : (
    <AuthWrapper rightHeadlineText={global.translate(setTitle())}>
      {/* {screenNumber !== 1 && (
        <div className="go-back">
          <GoBack authentication onClickHandler={onClickHandler} />
        </div>
      )} */}
      <div className="form-content">{renderForm()}</div>
      <div className="dots">
        {Array(7)
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
  screenOne: PropTypes.instanceOf(Object).isRequired,
  screenTwo: PropTypes.instanceOf(Object).isRequired,
  screenThree: PropTypes.instanceOf(Object).isRequired,
  screenFour: PropTypes.instanceOf(Object).isRequired,
  screenFive: PropTypes.instanceOf(Object).isRequired,
  screenSix: PropTypes.instanceOf(Object).isRequired,
  screenSeven: PropTypes.instanceOf(Object).isRequired,
  referralScreen: PropTypes.instanceOf(Object).isRequired,
};

Register.defaultProps = {
  formErrors: {},
  screenNumber: 1,
  handleInputChange: () => null,
};

export default Register;
