import React from 'react';
import { Button, Modal, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import PINInput from 'components/common/PINInput';
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
      className="change-card-pin-modal"
    >
      <Modal.Header>
        {global.translate('Change your card PIN number')}
      </Modal.Header>
      <Modal.Content>
        <div className="card-pin">
          <div>
            <h4>{global.translate('Change card PIN')}</h4>
            <PINInput
              numberOfInputs={4}
              onChange={value => {
                setError(null);
                setPinDigit(value);
              }}
              value={pinDigit}
            />
          </div>
          <br />
          <label htmlFor=".">
            {global.translate('Retype the new PIN')}
          </label>
          <PINInput
            numberOfInputs={4}
            onChange={value => {
              setError(null);
              setConfirmPinDigit(value);
            }}
            value={confirmPinDigit}
          />
          {error && (
            <Message negative>
              <p>{error}</p>
            </Message>
          )}
        </div>
        <div className="user-pin">
          <h4>{global.translate('Your PIN Number')}</h4>
          <label htmlFor=".">
            {global.translate('Provide your PIN number')}
          </label>
          <PINInput
            onChange={value => {
              setError(null);
              setUserPinDigit(value);
            }}
            value={userPinDigit}
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
