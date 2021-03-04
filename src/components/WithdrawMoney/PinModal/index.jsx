import React, { useEffect, useState } from 'react';
import { Button, Modal, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import PinCodeForm from 'components/common/PinCodeForm';
import './style.scss';

const PinModal = ({
  openPinModal,
  setOpenPinModal,
  error,
  setUserPinDigit,
  userPinDigit,
  errors,
  loading,
  pinData,
  handleCashout,
}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    if (!pinData?.PIN) {
      setIsDisabled(true);
    }
    if (loading) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [pinData?.PIN]);
  return (
    <Modal
      onOpen={() => setOpenPinModal(true)}
      open={openPinModal}
      size="mini"
    >
      <Modal.Header>
        {global.translate('Confirm with your PIN Number')}
      </Modal.Header>
      <Modal.Content>
        <div className="user-pin">
          <PinCodeForm
            onChange={({ target: { value, name } }) => {
              setUserPinDigit({
                ...userPinDigit,
                [name]: value,
              });
            }}
          />
          {errors && (
            <Message negative>
              <p>{errors?.Description || error?.message || errors}</p>
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
          onClick={handleCashout}
          positive
        >
          {global.translate('Withdraw money')}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

PinModal.propTypes = {
  openPinModal: PropTypes.bool.isRequired,
  setOpenPinModal: PropTypes.func.isRequired,
  setUserPinDigit: PropTypes.func,
  userPinDigit: PropTypes.objectOf(PropTypes.any),
  error: PropTypes.string,
  handleCashout: PropTypes.func,
  errors: PropTypes.objectOf(PropTypes.any),
  loading: PropTypes.bool,
  pinData: PropTypes.objectOf(PropTypes.any),
};
PinModal.defaultProps = {
  setUserPinDigit: () => {},
  userPinDigit: {},
  error: '',
  handleCashout: () => {},
  errors: {},
  loading: false,
  pinData: {},
};

export default PinModal;
