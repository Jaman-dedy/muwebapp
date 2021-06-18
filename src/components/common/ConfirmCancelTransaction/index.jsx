// /* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import cancelOther, {
  clearOtherTransactionSuccess,
} from 'redux/actions/transactions/cancelOrEditOther';

import Message from 'components/common/Message';
import cancelVoucher, {
  clearTransactionSucess,
} from 'redux/actions/transactions/cancelVoucher';
import cancelTransaction from 'redux/actions/transactions/cancelTransaction';
import PINConfirmationModal from 'components/common/PINConfirmationModal';

const ConfirmCancelTransaction = ({
  open,
  setOpen,
  item,
  fromVouchers,
  sendToOther,
}) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const [PIN, setPIN] = useState('');
  const [openPINModal, setOpenPINModal] = useState(false);

  const history = useHistory();

  const {
    cancelTransaction: { loading, data, error: err },
    editOrCancelOther: {
      loading: loadOther,
      data: otherData,
      error: otherError,
    },
    cancelVoucher: {
      loading: voucherLoading,
      data: voucherData,
      error: voucherError,
    },
  } = useSelector(state => state.transactions);

  const handleClosePINModal = () => {
    setStep(step => step - 1);
    setOpenPINModal(false);
    setOpen(false);
  };
  useEffect(() => {
    if (error) {
      setError(null);
    }

    if (step === 2) {
      setOpen(false);
      setOpenPINModal(true);
    } else {
      setOpenPINModal(false);
    }
  }, [step]);

  useEffect(() => {
    if (voucherData) {
      setStep(1);
      setOpen(false);
      clearTransactionSucess()(dispatch);
    }
  }, [voucherData]);

  useEffect(() => {
    if (data) {
      setStep(1);
      setOpen(false);
    }
  }, [data]);

  useEffect(() => {
    if (otherData) {
      setStep(1);
      setOpen(false);
      clearOtherTransactionSuccess()(dispatch);
    }
  }, [otherData]);

  const onCancelTransactionConfirm = ({
    item: {
      SecurityCode,
      TransferNumber,
      TransactionID,
      PhoneNumber: TargetPhoneNumber,
      FirstName: DestFirstName,
      LastName: DestLastName,
      OperatorID,
    },
    PIN,
    fromVouchers,
  }) => {
    const body = {
      PIN,
      SecurityCode,
      VoucherNumber: TransferNumber,
    };
    const dataToCancel = {
      PIN,
      TransactionID,
      TransferNumber,
      TargetPhoneNumber,
      DestFirstName,
      DestLastName,
      OperatorID,
      Cancel: 'Yes',
      Modify: 'No',
    };

    if (fromVouchers) {
      cancelVoucher(body, history)(dispatch);
    } else if (sendToOther) {
      cancelOther(dataToCancel, history)(dispatch);
    } else {
      cancelTransaction(body, history)(dispatch);
    }
  };
  const cancelCashListTransaction = () => {
    if (PIN.length !== 4) {
      setError(global.translate('Please provide your PIN number.'));
      return;
    }
    setError(null);
    onCancelTransactionConfirm({ item, PIN, fromVouchers });
  };

  return (
    <div>
      <Modal size="tiny" open={open} onClose={() => setOpen(false)}>
        <Modal.Content centered className="main-content">
          {step === 1 && (
            <>
              <h3 className="cancel-transaction__header">
                {global.translate('Cancel transaction')}
              </h3>
              <span className="cancel-transaction__content">
                {fromVouchers &&
                  global.translate(
                    'Are you sure, you want to cancel this Voucher?',
                  )}
                {!fromVouchers &&
                  global.translate(
                    'Are you sure, you want to cancel this transaction?',
                  )}
              </span>
            </>
          )}

          {error && <Message message={error} />}
          {voucherError && (
            <Message
              message={
                voucherError.error
                  ? voucherError.error
                  : voucherError[0].Description
              }
            />
          )}
        </Modal.Content>
        <Modal.Actions>
          {step !== 2 && (
            <Button
              disabled={loading}
              className="btn--cancel"
              active
              onClick={() => setOpen(false)}
            >
              {global.translate('Cancel')}
            </Button>
          )}

          <Button
            disabled={loading || voucherLoading || loadOther}
            loading={loading || voucherLoading || loadOther}
            className="btn--confirm"
            onClick={() => {
              setStep(step + 1);
            }}
          >
            {global.translate('Yes')}
          </Button>
        </Modal.Actions>
      </Modal>

      {step === 2 && (
        <PINConfirmationModal
          open={openPINModal}
          setOpen={setOpenPINModal}
          onPinConfirm={cancelCashListTransaction}
          loading={loading || voucherLoading || loadOther}
          onClose={handleClosePINModal}
          setPIN={setPIN}
          PIN={PIN}
        />
      )}
    </div>
  );
};
ConfirmCancelTransaction.propTypes = {
  open: PropTypes.bool,
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  setOpen: PropTypes.func.isRequired,
  fromVouchers: PropTypes.bool,
  sendToOther: PropTypes.bool,
};

ConfirmCancelTransaction.defaultProps = {
  open: false,
  fromVouchers: false,
  sendToOther: false,
};
export default ConfirmCancelTransaction;
