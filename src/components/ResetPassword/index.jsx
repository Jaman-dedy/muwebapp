import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';

import back from 'assets/images/back.png';
import AuthWrapper from '../common/AuthWrapper/AuthWrapper';

import UserInfoForm from './UserInfoForm';
import QuestionsForm from './QuestionsForm';
import PasswordForm from './PasswordForm';
import PINForm from './PINForm';
import OTPForm from './OTPForm';
import Congratulation from './Congratulation';

import './ResetPassword.scss';

const ResetPassword = ({
  resetPasswordData,
  setResetPasswordData,
  handleInputChange,
  formErrors,
  screenNumber,
  setScreenNumber,
  screenOne,
  screenTwo,
  screenThree,
  screenFour,
  screenFive,
  screenSix,
}) => {
  const renderForm = () => {
    switch (screenNumber) {
      case 1:
        return (
          <UserInfoForm
            formErrors={formErrors}
            resetPasswordData={resetPasswordData}
            onInputChange={handleInputChange}
            screenNumber={screenNumber}
            setScreenNumber={setScreenNumber}
            screenOne={screenOne}
          />
        );
      case 2:
        return (
          <QuestionsForm
            formErrors={formErrors}
            resetPasswordData={resetPasswordData}
            onInputChange={handleInputChange}
            screenNumber={screenNumber}
            setScreenNumber={setScreenNumber}
            screenTwo={screenTwo}
          />
        );
      case 3:
        return (
          <PasswordForm
            formErrors={formErrors}
            resetPasswordData={resetPasswordData}
            setResetPasswordData={setResetPasswordData}
            onInputChange={handleInputChange}
            screenNumber={screenNumber}
            setScreenNumber={setScreenNumber}
            screenThree={screenThree}
          />
        );
      case 4:
        return (
          <PINForm
            formErrors={formErrors}
            resetPasswordData={resetPasswordData}
            onInputChange={handleInputChange}
            screenNumber={screenNumber}
            setScreenNumber={setScreenNumber}
            screenFour={screenFour}
          />
        );
      case 5:
        return (
          <OTPForm
            formErrors={formErrors}
            resetPasswordData={resetPasswordData}
            onInputChange={handleInputChange}
            screenNumber={screenNumber}
            setScreenNumber={setScreenNumber}
            screenFive={screenFive}
          />
        );
      case 6:
        return (
          <Congratulation
            resetPasswordData={resetPasswordData}
            screenNumber={screenNumber}
            setScreenNumber={setScreenNumber}
            screenSeven={screenSix}
          />
        );
      default:
        return null;
    }
  };

  return screenNumber === 6 ? (
    renderForm()
  ) : (
    <AuthWrapper
      rightHeadlineText=""
      authHeader="Reset your Password and PIN"
    >
      {screenNumber !== 1 && (
        <div className="back">
          <Image
            src={back}
            size="mini"
            onClick={() => setScreenNumber(screenNumber - 1 || 1)}
          />
        </div>
      )}
      <div className="form-content">{renderForm()}</div>
      <div className="dots">
        {Array(5)
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

ResetPassword.propTypes = {
  resetPasswordData: PropTypes.instanceOf(Object).isRequired,
  setResetPasswordData: PropTypes.func.isRequired,
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
};

ResetPassword.defaultProps = {
  formErrors: {},
  screenNumber: 1,
  handleInputChange: () => null,
};

export default ResetPassword;
