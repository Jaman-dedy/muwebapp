import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'semantic-ui-react';
import PinCodeForm from 'components/common/PinCodeForm';

const ConfirmWithPINModal = ({
  isOpened,
  onClickYes,
  onClickNo,
  close,
  loading,
  onPinChange,
  message,
  disabled,
}) => {
  return (
    <Modal
      size="tiny"
      open={isOpened}
      onClose={close}
      style={{ minWidth: '40%', margin: 'auto' }}
    >
      <Modal.Header style={{ textAlign: 'center', width: '100%' }}>
        {message || global.translate('Confirm with your PIN', 2125)}
      </Modal.Header>
      <Modal.Content>
        <div
          style={{
            width: '16rem',
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center',
          }}
        >
          <PinCodeForm onChange={onPinChange} />
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="red"
          onClick={() => {
            onClickNo();
            close();
          }}
          disabled={loading}
        >
          {global.translate('Cancel', 26)}
        </Button>
        <Button
          color="green"
          loading={loading}
          onClick={async () => {
            await onClickYes();
          }}
          disabled={disabled || loading}
        >
          {global.translate('Proceed', 1752)}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

ConfirmWithPINModal.propTypes = {
  close: PropTypes.func,
  isOpened: PropTypes.bool,
  message: PropTypes.string,
  onClickNo: PropTypes.func,
  onClickYes: PropTypes.func,
  loading: PropTypes.bool,
  onPinChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
ConfirmWithPINModal.defaultProps = {
  isOpened: false,
  message: 'Do you want to perform this action?',
  onClickYes: () => true,
  onClickNo: () => true,
  close: () => true,
  loading: false,
  disabled: true,
};

export default ConfirmWithPINModal;
