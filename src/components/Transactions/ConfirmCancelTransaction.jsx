/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import cancelOther, {
  clearOtherTransactionSuccess,
} from 'redux/actions/transactions/cancelOrEditOther';
import PinCodeForm from 'components/common/PinCodeForm';
import Message from 'components/common/Message';
import cancelVoucher, {
  clearTransactionSucess,
} from 'redux/actions/transactions/cancelVoucher';
import voucher from 'routes/voucher';
import cancelTransaction from 'redux/actions/transactions/cancelTransaction';
import CashListTransactionDetails from './TransactionDetails';
import PendingVoucherDetails from './pendingVoucherDetail';

const ConfirmCancelTransaction = ({
  open,
  setOpen,
  item,
  fromVouchers,
  sendToOther,
}) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({});
  const [error, setError] = useState(null);
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
  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };
  useEffect(() => {
    if (voucherData) {
      setStep(1);
      setOpen(false);
      clearTransactionSucess()(dispatch);
    }
  }, [voucherData]);

  useEffect(() => {
    setStep(1);
    setOpen(false);
    clearTransactionSucess()(dispatch);
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
      cancelVoucher(body)(dispatch);
    }
    if (sendToOther) {
      cancelOther(dataToCancel)(dispatch);
    } else {
      cancelTransaction(body)(dispatch);
    }
  };
  const cancelCashListTransaction = () => {
    const { digit0, digit1, digit2, digit3 } = form;
    const PIN = `${digit0}${digit1}${digit2}${digit3}`;
    if (PIN.length !== 4) {
      setError(
        global.translate('Please provide your PIN number.', 543),
      );
      return;
    }
    setError(null);
    onCancelTransactionConfirm({ item, PIN, fromVouchers });
  };
  const [shouldClear, setShouldClear] = useState(false);

  useEffect(() => {
    if (voucherError) {
      setShouldClear(true);
    }
  }, [voucherError]);
  return (
    <div>
      <Modal size="mini" open={open} onClose={() => setOpen(false)}>
        <Modal.Header className="modal-title">
          {fromVouchers &&
            global.translate(
              'Are you sure, you want to cancel this Voucher?',
              2031,
            )}
          {!fromVouchers &&
            global.translate(
              'Are you sure, you want to cancel this transaction?',
              23,
            )}
        </Modal.Header>
        <Modal.Content centered className="main-content">
          {step === 1 && voucher && (
            <PendingVoucherDetails item={item} />
          )}
          {step === 1 && !voucher && (
            <CashListTransactionDetails item={item} />
          )}
          {step === 2 && (
            <div className="pin-number-inputs">
              <PinCodeForm
                label={global.translate(
                  'Confirm  your PIN number',
                  941,
                )}
                onChange={onChange}
                shouldClear={shouldClear}
                setShouldClear={setShouldClear}
              />
            </div>
          )}

          {error && <Message message={error} />}
          {err && (
            <Message
              message={err.error ? err.error : err[0].Description}
            />
          )}

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
              basic
              color="red"
              ative
              onClick={() => setOpen(false)}
            >
              {global.translate('Close', 186)}
            </Button>
          )}

          {step === 2 && (
            <Button
              disabled={loading || voucherLoading || loadOther}
              basic
              color="red"
              onClick={() => setStep(step - 1)}
            >
              {global.translate('Back', 174)}
            </Button>
          )}
          <Button
            disabled={loading || voucherLoading || loadOther}
            loading={loading || voucherLoading || loadOther}
            positive
            onClick={() => {
              if (step === 1) {
                setStep(step + 1);
              } else {
                cancelCashListTransaction();
              }
            }}
          >
            {step === 1 && global.translate('Yes', 732)}
            {step === 2 && global.translate('Save', 614)}
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};
ConfirmCancelTransaction.propTypes = {
  open: PropTypes.bool,
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  setOpen: PropTypes.func.isRequired,
  fromVouchers: PropTypes.bool,
};

ConfirmCancelTransaction.defaultProps = {
  open: false,
  fromVouchers: false,
};
export default ConfirmCancelTransaction;
