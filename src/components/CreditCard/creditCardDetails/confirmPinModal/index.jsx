import React from 'react';
import propTypes from 'prop-types';
import { Button, Message, Modal } from 'semantic-ui-react';
import PinCodeForm from 'components/common/PinCodeForm';
import classes from './Mypin.module.scss';

const ConfirmPin = ({
  open,
  handleActivateCard,
  setError,
  error,
  setUserPinDigit,
  userPinDigit,
  shouldClear,
  setShouldClear,
  isChangingPwd,
  isActivatingCard,
  isEnablingCard,
  handleChangeCreditCardPin,
  setIsActivatingCard,
  setIsEnablingCard,
  setIsChangingPwd,
  loadOnChangePwd,
  loadOnEnable,
  loadOnActivate,
  disabled,
  setForm,
  handleEnableCard,
}) => {
  return (
    <Modal
      size="tiny"
      open={open}
      closeOnDocumentClick={false}
      closeOnDimmerClick={false}
      closeOnEscape={false}
    >
      <Modal.Header style={{ textAlign: 'center' }}>
        {global.translate('Confirm with your PIN')}
      </Modal.Header>
      <Modal.Content>
        <div className={classes.PinFormNumber}>
          <PinCodeForm
            label={global.translate('Provide your PIN Number', 543)}
            onChange={({ target: { value, name } }) => {
              setError(null);
              setUserPinDigit({
                ...userPinDigit,
                [name]: value,
              });
            }}
            name="PIN"
            // shouldClear={shouldClear}
            setShouldClear={setShouldClear}
          />
          {error && (
            <Message negative icon>
              <span style={{ width: '100%', fontSize: '.9rem' }}>
                {error}
              </span>
            </Message>
          )}
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button
          disabled={disabled}
          basic
          color="red"
          onClick={() => {
            setIsActivatingCard(false);
            setIsEnablingCard(false);
            setIsChangingPwd(false);
            setForm({});
            setShouldClear(true);
          }}
        >
          Cancel
        </Button>
        <Button
          loading={
            (isChangingPwd && loadOnChangePwd) ||
            (isActivatingCard && loadOnActivate) ||
            (isEnablingCard && loadOnEnable)
          }
          disabled={
            (isChangingPwd && loadOnChangePwd) ||
            (isActivatingCard && loadOnActivate) ||
            (isEnablingCard && loadOnEnable)
          }
          basic
          color="green"
          onClick={() => {
            if (isChangingPwd) {
              handleChangeCreditCardPin();
            }
            if (isActivatingCard) {
              handleActivateCard();
            }
            if (isEnablingCard) {
              handleEnableCard();
            }
          }}
        >
          Proceed
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

ConfirmPin.propTypes = {
  open: propTypes.bool.isRequired,
  handleActivateCard: propTypes.func.isRequired,
  setError: propTypes.func.isRequired,
  setUserPinDigit: propTypes.func.isRequired,
  userPinDigit: propTypes.instanceOf(Object).isRequired,
  setShouldClear: propTypes.func.isRequired,
  shouldClear: propTypes.bool.isRequired,
  isEnablingCard: propTypes.bool.isRequired,
  isActivatingCard: propTypes.bool.isRequired,
  isChangingPwd: propTypes.bool.isRequired,
  handleChangeCreditCardPin: propTypes.func.isRequired,
  setIsChangingPwd: propTypes.func.isRequired,
  setIsActivatingCard: propTypes.func.isRequired,
  setIsEnablingCard: propTypes.func.isRequired,
  loading: propTypes.bool.isRequired,
  disabled: propTypes.bool.isRequired,
  setForm: propTypes.func.isRequired,
  error: propTypes.string.isRequired,
  handleEnableCard: propTypes.func.isRequired,
};

export default ConfirmPin;
