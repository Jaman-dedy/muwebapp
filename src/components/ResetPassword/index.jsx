import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import GoBack from 'components/common/GoBack';
import AuthWrapper from '../common/AuthWrapper/AuthWrapper';
import UserInfoForm from './UserInfoForm';
import PasswordForm from './PasswordForm';
import Congratulation from './Congratulation';

const ResetPassword = ({
  resetPasswordData,
  setResetPasswordData,
  resetPasswordRdx,
  handleInputChange,
  formErrors,
  screenNumber,
  setScreenNumber,
  screenOne,
  screenThree,
  screenSix,
  setPIN,
  PIN,
  newPIN,
  setNewPIN,
  verifyOTP,
  resendOTP,
}) => {
  const [headerTitle, setHeaderTitle] = useState('');
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
            resetPasswordRd={resetPasswordRdx}
          />
        );
      case 2:
        return (
          <PasswordForm
            formErrors={formErrors}
            resetPasswordData={resetPasswordData}
            setResetPasswordData={setResetPasswordData}
            onInputChange={handleInputChange}
            screenNumber={screenNumber}
            setScreenNumber={setScreenNumber}
            screenThree={screenThree}
            PIN={PIN}
            setPIN={setPIN}
            newPIN={newPIN}
            setNewPIN={setNewPIN}
            resetPasswordRd={resetPasswordRdx}
            verifyOTP={verifyOTP}
            resendOTP={resendOTP}
          />
        );
      case 6:
        return (
          <Congratulation
            resetPasswordData={resetPasswordData}
            screenNumber={screenNumber}
            setScreenNumber={setScreenNumber}
            screenSix={screenSix}
          />
        );
      default:
        return null;
    }
  };

  const onClickHandler = () => setScreenNumber(screenNumber - 1 || 1);

  useEffect(() => {
    const title =
      (screenNumber === 2 && 'Create new password') ||
      'Forgot your password?';
    setHeaderTitle(title);
  }, [screenNumber]);

  return screenNumber === 6 ? (
    renderForm()
  ) : (
    <AuthWrapper
      authHeader=""
      rightHeadlineText={global.translate(headerTitle)}
    >
      {screenNumber !== 1 && (
        <div className="go-back">
          <GoBack onClickHandler={onClickHandler} />
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
  resetPasswordRdx: PropTypes.instanceOf(Object).isRequired,
  handleInputChange: PropTypes.func,
  formErrors: PropTypes.instanceOf(Object),
  screenNumber: PropTypes.number,
  setScreenNumber: PropTypes.func.isRequired,
  screenOne: PropTypes.instanceOf(Object).isRequired,
  screenThree: PropTypes.instanceOf(Object).isRequired,
  screenSix: PropTypes.instanceOf(Object).isRequired,
  setPIN: PropTypes.func.isRequired,
  PIN: PropTypes.number,
  newPIN: PropTypes.string,
  setNewPIN: PropTypes.func,
  verifyOTP: PropTypes.func,
  resendOTP: PropTypes.func,
};

ResetPassword.defaultProps = {
  formErrors: {},
  screenNumber: 1,
  handleInputChange: () => null,
  PIN: '',
  newPIN: '',
  setNewPIN: () => null,
  verifyOTP: () => null,
  resendOTP: () => null,
};

export default ResetPassword;
