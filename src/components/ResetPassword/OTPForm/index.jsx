import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Form, Input } from 'semantic-ui-react';
import Feedback from 'components/common/Feedback/Feedback';
import './style.scss';

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
                  placeholder="••••••"
                  onChange={changeOTP}
                  value={resetPasswordData.otp || null}
                  maxLength={otpCharacters}
                />
              </Form.Field>
              <input ref={hiddenInput} className="hiddenOtpInput" />
              <Form.Button
                type="Next"
                primary
                loading={resetPassword.loading}
                onClick={() => handleNext()}
              >
                {global.translate('Next', 10)}
              </Form.Button>
              <p className="otpFooter">
                {global.translate('Already registered?', 1200)}{' '}
                <Link
                  to="/login"
                  style={{ width: '100%', textAlign: 'center' }}
                >
                  {global.translate('login', 190)}
                </Link>
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
