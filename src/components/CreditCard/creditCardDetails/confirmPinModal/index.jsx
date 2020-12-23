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
          global.translate('Confirm with your PIN', 2151)}
      </Modal.Header>
      <Modal.Content>
        {children && (
          <div className="custom-pin-form-content">{children}</div>
        )}
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
          {global.translate('Cancel', 86)}
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
            if (isDeletingCard) {
              handleDeleteCard();
            }
          }}
        >
          {global.translate('Proceed', 1752)}
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
  isDeletingCard: propTypes.bool.isRequired,
  setIsDeletingCard: propTypes.func.isRequired,
  children: propTypes.instanceOf(React.Children),
  canProceed: propTypes.bool,
  handleDeleteCard: propTypes.func,
  loadOnDeleteCard: propTypes.bool,
  modalTitle: propTypes.string,
};

ConfirmPin.defaultProps = {
  children: null,
  canProceed: true,
  handleDeleteCard: () => {},
  loadOnDeleteCard: false,
  modalTitle: '',
};

export default ConfirmPin;
