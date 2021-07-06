import React, { useEffect } from 'react';
import { Form, Grid, Loader } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import PINInput from 'components/common/PINInput';
import GoBack from 'components/common/GoBack';
import clearPhoneNumberAndOTPStoreAction from 'redux/actions/users/clearPhoneNumberAndOTPStore';
import './style.scss';

const UssdUserForm = ({
  OTPNumber,
  handleKeyDown,
  resendOtp,
  setOTPNumber,
  setPIN,
  PIN,
  setUssdUserStep,
  setDisableButton,
  sendOTPLoading,
}) => {
  const dispatch = useDispatch();

  const clearOTPForm = () => {};
  const backButtonHandler = () => {
    setUssdUserStep(false);
    clearOTPForm();
    clearPhoneNumberAndOTPStoreAction()(dispatch);
  };

  useEffect(() => {
    if (PIN?.length < 4 || OTPNumber?.length < 6) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [PIN, OTPNumber]);
  return (
    <Grid.Column>
      <Form.Field>
        <Form className="otp-form-container">
          <div className="go-back">
            <GoBack style onClickHandler={backButtonHandler} />
          </div>
        </Form>
        <div className="pin-title">
          {global.translate('PIN number')}
        </div>
        <div className="otp-box otp-box__pin">
          <PINInput
            type="password"
            value={PIN}
            numberOfInputs={4}
            onChange={setPIN}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="pin-title">
          {global.translate('Confirmation code')}
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
        <div className="info-text">
          {global.translate(
            'Provide the confirmation code sent to your phone number',
          )}
        </div>

        <div className="text-feedback">
          {global.translate(
            'It may take a moment to receive your code. Haven’t receive it yet?',
          )}

          <span onClick={resendOtp} className="feedback">
            {' '}
            {global.translate('Resend a new code')}
            {sendOTPLoading && (
              <Loader
                active
                inline
                size="small"
                style={{ marginLeft: '10px' }}
              />
            )}
          </span>
        </div>
      </Form.Field>
    </Grid.Column>
  );
};

UssdUserForm.propTypes = {
  OTPNumber: PropTypes.string,
  handleKeyDown: PropTypes.func,
  resendOtp: PropTypes.func,
  setOTPNumber: PropTypes.func,
  setPIN: PropTypes.func,
  PIN: PropTypes.string,
  setUssdUserStep: PropTypes.func,
  setDisableButton: PropTypes.func,
  sendOTPLoading: PropTypes.func,
};

UssdUserForm.defaultProps = {
  OTPNumber: '',
  handleKeyDown: () => {},
  resendOtp: () => {},
  setOTPNumber: () => {},
  setPIN: () => {},
  PIN: '',
  setUssdUserStep: () => {},
  setDisableButton: () => {},
  sendOTPLoading: () => {},
};

export default UssdUserForm;
