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
  setForm,
  handleEnableCard,
  isDeletingCard,
  setIsDeletingCard,
  loading,
  children,
  canProceed,
  loadOnDeleteCard,
  handleDeleteCard,
  modalTitle,
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
        {modalTitle ??
          global.translate('Confirm with your PIN')}
      </Modal.Header>
      <Modal.Content>
        {children && (
          <div className="custom-pin-form-content">{children}</div>
        )}
        <div className={classes.PinFormNumber}>
          <PinCodeForm
            label={global.translate('Provide your PIN Number')}
            onChange={({ target: { value, name } }) => {
              setError(null);
              setUserPinDigit({
                ...userPinDigit,
                [name]: value,
              });
            }}
            name="PIN"
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
          disabled={
            loading ||
            loadOnActivate ||
            loadOnEnable ||
            loadOnDeleteCard ||
            loadOnChangePwd
          }
          basic
          color="red"
          onClick={() => {
            setIsActivatingCard(false);
            setIsEnablingCard(false);
            setIsChangingPwd(false);
            setForm({});
            setIsDeletingCard(false);
            setShouldClear(true);
          }}
        >
          {global.translate('Cancel')}
        </Button>
        <Button
          loading={
            (isChangingPwd && loadOnChangePwd) ||
            (isActivatingCard && loadOnActivate) ||
            (isEnablingCard && loadOnEnable) ||
            (isDeletingCard && loadOnDeleteCard)
          }
          disabled={
            (isChangingPwd && loadOnChangePwd) ||
            (isActivatingCard && loadOnActivate) ||
            (isEnablingCard && loadOnEnable) ||
            loading ||
            (isDeletingCard && !canProceed) ||
            (loadOnDeleteCard && isDeletingCard)
          }
          positive
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
            if (isDeletingCard) {
              handleDeleteCard();
            }
          }}
        >
          {global.translate('Proceed')}
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
  isEnablingCard: propTypes.bool.isRequired,
  isActivatingCard: propTypes.bool.isRequired,
  isChangingPwd: propTypes.bool.isRequired,
  handleChangeCreditCardPin: propTypes.func.isRequired,
  setIsChangingPwd: propTypes.func.isRequired,
  setIsActivatingCard: propTypes.func.isRequired,
  setIsEnablingCard: propTypes.func.isRequired,
  setForm: propTypes.func.isRequired,
  error: propTypes.string.isRequired,
  handleEnableCard: propTypes.func.isRequired,
  loadOnChangePwd: propTypes.bool,
  loadOnEnable: propTypes.bool,
  loadOnActivate: propTypes.bool,
  isDeletingCard: propTypes.bool.isRequired,
  setIsDeletingCard: propTypes.func.isRequired,
  children: propTypes.instanceOf(React.Children),
  canProceed: propTypes.bool,
  handleDeleteCard: propTypes.func,
  loadOnDeleteCard: propTypes.bool,
  modalTitle: propTypes.string,
  loading: propTypes.string,
};
ConfirmPin.defaultProps = {
  loadOnChangePwd: false,
  loadOnEnable: false,
  loadOnActivate: false,
  children: null,
  canProceed: true,
  handleDeleteCard: () => {},
  loadOnDeleteCard: false,
  modalTitle: '',
  loading: false,
};

export default ConfirmPin;
