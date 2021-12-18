import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Form, Input } from 'semantic-ui-react';
import Feedback from 'components/common/Feedback/Feedback';
import './style.scss';
import 'assets/styles/spinner.scss';
import isAppDisplayedInWebView from 'helpers/isAppDisplayedInWebView';

const OTPForm = ({
  onInputChange,
  resetPasswordData,
  screenFive,
}) => {
  const { handleNext, resetPassword, clearResetUserFX } = screenFive;
  const otpCharacters = 6;
  const hiddenInput = useRef(null);

  const changeOTP = e => {
    onInputChange(e);
  };

  useEffect(() => {
    if (resetPasswordData.OTP.length >= otpCharacters) {
      hiddenInput.current.focus();
      handleNext();
    }
  }, [resetPasswordData]);
  return (
    <>
      {resetPassword.error && (
        <Feedback
          message={resetPassword.error.Description}
          title="Error"
          callbackFn={clearResetUserFX}
        />
      )}

      {!resetPassword.error && (
        <Container>
          <Form className="otp-form-reset">
            <div className="otp">
              <p className="otpTitle">
                {global.translate(
                  'Please provide the verification code sent to your phone via SMS',
                  24,
                )}
              </p>
              <Form.Field className="otp-input-group">
                <Input
                  type="text"
                  name="OTP"
                  placeholder="––––––"
                  onChange={changeOTP}
                  value={resetPasswordData.otp || null}
                  maxLength={otpCharacters}
                />
              </Form.Field>
              {resetPassword.loading && (
                <div className="wrap-loading">
                  <div className="loading-button" />
                </div>
              )}
              <input ref={hiddenInput} className="hiddenOtpInput" />
              <p className="otpFooter">
                {!isAppDisplayedInWebView() && (
                  <>
                    {global.translate('Already registered?')}{' '}
                    <Link to="/login">
                      {global.translate('Login')}
                    </Link>
                  </>
                )}
              </p>
            </div>
          </Form>
        </Container>
      )}
    </>
  );
};

OTPForm.propTypes = {
  screenFive: PropTypes.instanceOf(Object).isRequired,
  onInputChange: PropTypes.func.isRequired,
  resetPasswordData: PropTypes.instanceOf(Object).isRequired,
};

export default OTPForm;
