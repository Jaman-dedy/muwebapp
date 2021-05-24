import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import PinCodeForm from 'components/common/PinCodeForm';
import './style.scss';

const PinModal = ({
  open,
  setOpen,
  setUserPinDigit,
  userPinDigit,
  handleSubmit,
  errors,
  loading,
  pinData,
  handleClearData,
}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!pinData?.PIN) {
      setIsDisabled(true);
    }

    if (loading) {
      setIsDisabled(true);
    }
    if (pinData?.PIN && !loading) {
      setIsDisabled(false);
    }
  }, [pinData, loading]);
  return (
    <Modal onOpen={() => setOpen(true)} open={open} size="mini">
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
              <p>{errors?.Description ?? errors?.message}</p>
            </Message>
          )}
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button
          disabled={loading}
          basic
          onClick={() => {
            handleClearData()(dispatch);
            setOpen(false);
          }}
        >
          {global.translate('Cancel')}
        </Button>
        <Button
          loading={loading}
          disabled={isDisabled}
          onClick={handleSubmit}
          positive
        >
          {global.translate('Confirm')}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

PinModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  setUserPinDigit: PropTypes.func,
  userPinDigit: PropTypes.objectOf(PropTypes.any),
  handleSubmit: PropTypes.func,
  errors: PropTypes.objectOf(PropTypes.any),
  loading: PropTypes.bool,
  pinData: PropTypes.objectOf(PropTypes.any),
  handleClearData: PropTypes.func,
};
PinModal.defaultProps = {
  setUserPinDigit: () => {},
  userPinDigit: {},
  handleSubmit: () => {},
  errors: {},
  loading: false,
  pinData: {},
  handleClearData: () => {},
};

export default PinModal;
