/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Button,
  Form,
  Image,
  Loader,
  Dimmer,
} from 'semantic-ui-react';
import './style.scss';
import { useSelector } from 'react-redux';
import checkPassword from 'utils/checkPassword';
import PasswordInput from 'components/common/PasswordInput';
import ErrorMessage from 'components/common/Alert/Danger';
import PINInput from '../PINInput';
import resetPIN from './resetPIN';

const ResetPIN = ({ open, setOpen, close, isOnResetPassword }) => {
  const {
    OTP,
    setOTP,
    newPIN,
    setNewPIN,
    phone,
    handleSubmit,
    loadOnChangePIN,
    disableProceed,
    resetPassword,
    step,
    resetPreQualification,
    setStep,
    setNewPassword,
    newPassword,
    handleResetPINPreQualification,
    clearResetSuccess,
    handleClearVerifyOTP,
  } = resetPIN();
  const [disableButton, setDisableButton] = useState(false);

  const verifySentOTP = useSelector(
    ({ user: { verifyOTP } }) => verifyOTP,
  );

  const handleCloseModal = useCallback(() => {
    setStep(1);
    close();
  }, []);

  useEffect(() => {
    setStep(1);
  }, [setStep, open]);

  useEffect(() => {
    const passwordChecker = checkPassword(newPassword);
    if (
      !passwordChecker.number ||
      !passwordChecker.uppercase ||
      !passwordChecker.lowercase ||
      !passwordChecker.specialCharacter ||
      !passwordChecker.digit
    ) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [newPassword]);

  useEffect(() => {
    if (verifySentOTP.error && OTP.length === 5) {
      handleClearVerifyOTP();
    }
  }, [OTP, verifySentOTP, handleClearVerifyOTP]);

  useEffect(() => {
    if (resetPassword?.success) {
      clearResetSuccess();
      handleCloseModal();
    }
  }, [resetPassword, clearResetSuccess, handleCloseModal]);

  const renderInformationModal = () => {
    return (
      <div className="information-modal">
        <p className="information-modal__message">
          {global.translate(
            'A verification code will be sent to your default phone number',
          )}
        </p>
        <div className="information-modal__phone">
          <Image src={phone.PhoneFlag} />
          <div className="information-modal__phone-number">
            +{phone.Phone}
          </div>
        </div>
      </div>
    );
  };
  const renderOTPForm = () => {
    return (
      <div className="form-container">
        {step === 2 && (
          <>
            <form>
              <p>
                {global.translate(
                  'Enter the verification code we sent to',
                )}
                +{phone.Phone}
              </p>
              <PINInput
                value={OTP}
                onChange={setOTP}
                numberOfInputs={6}
                type="text"
              />
            </form>
            {verifySentOTP?.error && (
              <div className="error-message">
                <ErrorMessage
                  message={verifySentOTP?.error?.Description}
                />
              </div>
            )}
            <Button
              className="btn--reset"
              onClick={handleResetPINPreQualification}
            >
              {global.translate('Resend OTP')}
            </Button>
          </>
        )}

        {step === 3 && !isOnResetPassword && (
          <form>
            <p>{global.translate('Type a new PIN')}</p>
            <PINInput
              value={newPIN}
              length={6}
              onChange={setNewPIN}
            />
          </form>
        )}

        {step === 3 && isOnResetPassword && (
          <Form autoComplete="off">
            <p>{global.translate('Type a new password')}</p>
            <Form.Field>
              <PasswordInput
                placeholder={global.translate('Password')}
                onChange={(e, { value }) => setNewPassword(value)}
                type="password"
                value={newPassword}
                icon="eye"
              />
            </Form.Field>
            <div className="checklist">
              <div>
                {global.translate('The password must be at least')}{' '}
                <span
                  className={
                    checkPassword(newPassword).number ? '' : 'invalid'
                  }
                >
                  {global.translate('8 characters long,')}
                </span>
                , {global.translate('containing an')}{' '}
                <span
                  className={
                    checkPassword(newPassword).uppercase
                      ? ''
                      : 'invalid'
                  }
                >
                  {global.translate('uppercase')}
                </span>
                , {global.translate('a')}&nbsp;
                <span
                  className={
                    checkPassword(newPassword).lowercase
                      ? ''
                      : 'invalid'
                  }
                >
                  {global.translate('lowercase,')}
                </span>{' '}
                <span
                  className={
                    checkPassword(newPassword).digit ? '' : 'invalid'
                  }
                >
                  {global.translate('digit')}
                </span>{' '}
                {global.translate('and at least')}{' '}
                <span
                  className={
                    checkPassword(newPassword).specialCharacter
                      ? ''
                      : 'invalid'
                  }
                >
                  {global.translate('a special character(!@#$%^&*)')}
                </span>
              </div>
            </div>
          </Form>
        )}
      </div>
    );
  };

  return (
    <Modal
      open={open}
      onClose={close}
      onOpen={setOpen}
      size="tiny"
      className="reset-pin-modal"
      closeOnDimmerClick={false}
    >
      <h1 className="reset-pin__header">
        {isOnResetPassword
          ? global.translate('Reset password')
          : global.translate('Reset PIN number')}
      </h1>
      <Modal.Content className="reset-pin">
        {step === 1 && renderInformationModal()}
        {step >= 2 && renderOTPForm()}

        {(verifySentOTP?.loading || resetPreQualification?.loading) &&
          step === 2 && (
            <Dimmer active inverted>
              <Loader size="large" />
            </Dimmer>
          )}
      </Modal.Content>
      <div className="reset-pin__actions">
        <Button
          className="btn--cancel"
          onClick={() => {
            if (step >= 2) {
              setStep(step => step - 1);
            } else {
              handleCloseModal();
            }
          }}
          disabled={loadOnChangePIN}
        >
          {step === 1
            ? global.translate('Cancel')
            : global.translate('Back')}
        </Button>

        {step !== 2 && (
          <Button
            className="btn--confirm"
            onClick={() => {
              if (step === 1) {
                handleResetPINPreQualification();
              } else if (step === 3) {
                handleSubmit();
              } else {
                setStep(step => step + 1);
              }
            }}
            disabled={
              loadOnChangePIN ||
              disableProceed ||
              verifySentOTP?.loading ||
              (disableButton && step === 3 && isOnResetPassword)
            }
            loading={
              loadOnChangePIN ||
              (resetPreQualification?.loading && step === 1)
            }
          >
            {step === 1 && global.translate('Continue')}
            {step === 3 && global.translate('Change')}
          </Button>
        )}
      </div>
    </Modal>
  );
};

ResetPIN.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  close: PropTypes.func,
  isOnResetPassword: PropTypes.bool,
};

ResetPIN.defaultProps = {
  close: () => {},
  isOnResetPassword: false,
};

export default ResetPIN;
