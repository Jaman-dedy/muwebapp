import './style.scss';

import PropTypes from 'prop-types';
import React from 'react';

import AuthWrapper from '../common/AuthWrapper/AuthWrapper';
import Congratulation from './Congratulation';
import IdentityForm from './IdentityForm';
import OTPForm from './OTPForm';
import PasswordForm from './PasswordForm';
import PIDForm from './PIDForm';
import PINForm from './PINForm';
import ReferralForm from './ReferralForm';

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
        return global.translate('Register for a free account', 1413);
      case 2:
        return global.translate('Provide the Phone Number', 1411);
      case 3:
        return global.translate('Phone verification', 15);
      case 4:
        return global.translate('Username', 1992);
      case 5:
        return global.translate('Password', 2);
      case 6:
        return global.translate('PIN Number', 537);
      case 7:
        return global.translate('Someone told you about us?', 1412);
      case 8:
        return global.translate('Congratulations', 950);

      default:
        return global.translate('Register for a free account', 1413);
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
