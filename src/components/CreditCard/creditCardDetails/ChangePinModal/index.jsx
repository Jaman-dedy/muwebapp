import React from 'react';
import { Button, Modal, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import PinCodeForm from 'components/common/PinCodeForm';
import './style.scss';

const PinModal = ({
  openPinModal,
  setOpenPinModal,
  pinDigit,
  setPinDigit,
  setError,
  error,
  setConfirmPinDigit,
  confirmPinDigit,
  setUserPinDigit,
  userPinDigit,
  errors,
  handleChangeCreditCardPin,
  disabled,
  loadOnChangePwd,
}) => {
  return (
    <Modal
      onOpen={() => setOpenPinModal(true)}
      open={openPinModal}
      size="mini"
    >
      <Modal.Header>
        {global.translate('Change your card PIN Number')}
      </Modal.Header>
      <Modal.Content>
        <div className="card-pin">
          <div>
            <h4>{global.translate('Change card PIN')}</h4>
            <PinCodeForm
              onChange={({ target: { value, name } }) => {
                setError(null);
                setPinDigit({ ...pinDigit, [name]: value });
              }}
              name="CardPIN"
            />
          </div>
          <br />
          <PinCodeForm
            label={global.translate('Retype the new PIN')}
            onChange={({ target: { value, name } }) => {
              setError(null);
              setConfirmPinDigit({
                ...confirmPinDigit,
                [name]: value,
              });
            }}
            name="CardPIN"
          />
          {error && (
            <Message negative>
              <p>{error}</p>
            </Message>
          )}
        </div>
        <div className="user-pin">
          <h4>{global.translate('Your PIN Number')}</h4>
          <PinCodeForm
            label={global.translate('Provide your PIN Number', 543)}
            onChange={({ target: { value, name } }) => {
              setUserPinDigit({
                ...userPinDigit,
                [name]: value,
              });
            }}
            name="PIN"
          />
          {errors && !!Object.values(errors).length && (
            <Message negative>
              <p>{errors.Description}</p>
            </Message>
          )}
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button
          disabled={disabled}
          basic
          onClick={() => setOpenPinModal(false)}
        >
          {global.translate('Cancel')}
        </Button>
        <Button
          loading={loadOnChangePwd}
          disabled={disabled}
          onClick={handleChangeCreditCardPin}
          positive
        >
          {global.translate('Change PIN')}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

PinModal.propTypes = {
  openPinModal: PropTypes.bool.isRequired,
  setOpenPinModal: PropTypes.func.isRequired,
  pinDigit: PropTypes.string,
  setPinDigit: PropTypes.func,
  setError: PropTypes.func,
  setConfirmPinDigit: PropTypes.func,
  confirmPinDigit: PropTypes.objectOf(PropTypes.any),
  setUserPinDigit: PropTypes.func,
  userPinDigit: PropTypes.objectOf(PropTypes.any),
  error: PropTypes.string,
  errors: PropTypes.objectOf(PropTypes.any),
  handleChangeCreditCardPin: PropTypes.func,
  disabled: PropTypes.bool,
  loadOnChangePwd: PropTypes.bool,
};
PinModal.defaultProps = {
  pinDigit: '',
  setPinDigit: () => {},
  setError: () => {},
  setConfirmPinDigit: () => {},
  confirmPinDigit: {},
  setUserPinDigit: () => {},
  userPinDigit: {},
  error: '',
  errors: {},
  handleChangeCreditCardPin: () => {},
  disabled: false,
  loadOnChangePwd: false,
};

export default PinModal;
