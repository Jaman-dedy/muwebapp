import './modal.scss';

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal } from 'semantic-ui-react';
import { clearFoundUser } from 'redux/actions/contacts/locateUser';
import { getPossibleDates } from 'utils/monthdates';

import ConfirmationForm from '../../ConfirmationForm';

const SendMoneyModal = ({ sendMoneyModal, locateUser }) => {
  const [shouldClear, setShouldClear] = useState(false);

  const dispatch = useDispatch();
  const {
    form,
    confirmationData,
    openModal: open,
    setOpenModal: setOpen,
    step,
    errors,
    setErrors,
    onOptionsChange,
    moveFundsToToUWallet,
    resetState,
    loading,
    moveFundError,
    setResult,
  } = sendMoneyModal;
  const days = getPossibleDates().map(item => ({
    key: item.day,
    value: item.day,
    text: item.val,
  }));
  const clearForm = () => {
    // setForm({});
    setOpen(false);
    resetState();
    // setErrors(null);
  };
  return (
    <Modal
      size="small"
      open={open}
      closeOnDimmerClick={false}
      closeOnDocumentClick={false}
      onClose={() => {
        setOpen(false);
        resetState();
        clearForm();
      }}
    >
      <Modal.Header className="modal-title">
        {global.translate(`Transfer Money to  `, 1950)}
        <strong>
          &nbsp;{locateUser?.data && locateUser?.data[0]?.FirstName}
        </strong>
      </Modal.Header>

      {step === 2 && confirmationData && confirmationData[0] && (
        <ConfirmationForm
          confirmationData={confirmationData[0]}
          onOptionsChange={onOptionsChange}
          form={form}
          shouldClear={shouldClear}
          setShouldClear={setShouldClear}
          errors={errors}
          error={moveFundError}
          loading={loading}
          days={days}
        />
      )}

      <Modal.Actions>
        <>
          <Button
            basic
            color="red"
            disabled={loading}
            onClick={() => {
              clearForm();
              setOpen(false);
              clearFoundUser()(dispatch);
              setResult(null);
            }}
          >
            {global.translate('Cancel', 86)}
          </Button>

          <Button
            positive
            disabled={loading}
            onClick={() => {
              if (step === 2) {
                moveFundsToToUWallet();
              }
            }}
          >
            {global.translate('Transfer Money', 1950)}
          </Button>
        </>
      </Modal.Actions>
    </Modal>
  );
};

SendMoneyModal.propTypes = {
  sendMoneyModal: PropTypes.objectOf(PropTypes.any).isRequired,
};
SendMoneyModal.defaultProps = {};

export default SendMoneyModal;
