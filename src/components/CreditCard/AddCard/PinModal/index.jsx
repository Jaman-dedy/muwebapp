import React, { useEffect, useState } from 'react';
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
  submitCreditCard,
  errors,
  loading,
  pinData,
}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    if (!pinData?.PIN) {
      setIsDisabled(true);
    }
    if (!pinData?.CardPIN) {
      setIsDisabled(true);
    }

    if (loading) {
      setIsDisabled(true);
    }
    if (pinData?.PIN && pinData?.CardPIN && !loading) {
      setIsDisabled(false);
    }
  }, [pinData, loading]);
  return (
    <Modal
      onOpen={() => setOpenPinModal(true)}
      open={openPinModal}
      size="mini"
    >
      <Modal.Header>
        {global.translate('Create your card PIN Number')}
      </Modal.Header>
      <Modal.Content>
        <div className="card-pin">
          <div>
            <h4>{global.translate('Create card PIN')}</h4>
            <PinCodeForm
              onChange={({ target: { value, name } }) => {
                setError(null);
                setPinDigit({ ...pinDigit, [name]: value });
              }}
              name="PIN"
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
            name="PIN"
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
          />
          {errors && (
            <Message negative>
              <p>{errors.Description}</p>
            </Message>
          )}
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button
          disabled={loading}
          basic
          onClick={() => setOpenPinModal(false)}
        >
          {global.translate('Cancel')}
        </Button>
        <Button
          loading={loading}
          disabled={isDisabled}
          onClick={submitCreditCard}
          positive
        >
          {global.translate('Order card')}
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
  submitCreditCard: PropTypes.func,
  errors: PropTypes.objectOf(PropTypes.any),
  loading: PropTypes.bool,
  pinData: PropTypes.objectOf(PropTypes.any),
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
  submitCreditCard: () => {},
  errors: {},
  loading: false,
  pinData: {},
};

export default PinModal;
