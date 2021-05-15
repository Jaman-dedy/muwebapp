/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Container, Form, Loader } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import InfoIcon from 'assets/images/info-icon.svg';

import clearPhoneNumberAndOTPStoreAction from 'redux/actions/users/clearPhoneNumberAndOTPStore';
import GoBack from 'components/common/GoBack';
import AlertDanger from 'components/common/Alert/Danger';
import PINInput from 'components/common/PINInput';
import InfoMessage from 'components/common/Alert/InfoMessage';

const OTPForm = ({
  registrationData,
  setRegistrationData,
  onInputChange,
  verifyOtp,
  onClickHandler,
}) => {
  const {
    verifyOTP,
    handleKeyDown,
    resendOtp,
    setOTPNumber,
    OTPNumber,
  } = verifyOtp;
  const dispatch = useDispatch();

  const [verifyPhoneLoading, setVerifyPhoneLoading] = useState(false);

  const clearOTPForm = () => {
    setRegistrationData({
      ...registrationData,
      OTP: '',
    });
  };

  const backButtonHandler = () => {
    clearOTPForm();
    clearPhoneNumberAndOTPStoreAction()(dispatch);
    onClickHandler();
  };

  useEffect(() => {
    if (verifyOTP.loading) {
      setVerifyPhoneLoading(true);
    } else {
      setVerifyPhoneLoading(false);
    }
  }, [verifyOTP.loading]);
  return (
    <Container>
      <div className="sub-titles">
        {global.translate('For a free account')}
      </div>
      <Form className="otp-form-container">
        <div className="go-back">
          <GoBack style onClickHandler={backButtonHandler} />
        </div>
        {verifyOTP.error && (
          <AlertDanger
            message={global.translate(
              'This verification code is invalid',
            )}
          />
        )}
        <h3>{global.translate('Phone verification', 15)}</h3>
        <InfoMessage
          icon={InfoIcon}
          description={global.translate(
            `Protecting your account is our top priority. Please confirm your phone number by entering the authorization code sent to`,
          )}
        />
      </Form>
      <div className="pin-title">
        {global.translate('Verification number')}
      </div>
      <div className="otp-box">
        <PINInput
          type="text"
          value={OTPNumber}
          numberOfInputs={6}
          onChange={setOTPNumber}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="text-feedback">
        {verifyPhoneLoading && (
          <Loader className="otp-loader" active inline="centered" />
        )}
        {global.translate(
          'It may take a moment to receive your code. Haven’t receive it yet?',
        )}

        <span onClick={resendOtp} className="feedback">
          {' '}
          {global.translate('Resend a new code')}
        </span>
      </div>
    </Container>
  );
};

OTPForm.propTypes = {
  registrationData: PropTypes.instanceOf(Object).isRequired,
  setRegistrationData: PropTypes.func.isRequired,
  onInputChange: PropTypes.func,
  verifyOtp: PropTypes.instanceOf(Object).isRequired,
  onClickHandler: PropTypes.func.isRequired,
};

OTPForm.defaultProps = {
  onInputChange: () => null,
};

export default OTPForm;
