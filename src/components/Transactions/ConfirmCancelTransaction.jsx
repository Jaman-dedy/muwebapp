/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
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
}) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({});
  const [error, setError] = useState(null);
  const {
    cancelTransaction: { loading, data, error: err },
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
    if (data) {
      toast.success(
        global.translate(
          'Your Cash transaction has been cancelled.',
          1117,
        ),
      );
    }

    setStep(1);
    setOpen(false);
    clearTransactionSucess()(dispatch);
  }, [data]);

  const onCancelTransactionConfirm = ({
    item: { SecurityCode, TransferNumber },
    PIN,
    fromVouchers,
  }) => {
    const body = {
      PIN,
      SecurityCode,
      VoucherNumber: TransferNumber,
    };
    if (fromVouchers) {
      cancelVoucher(body)(dispatch);
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
              disabled={loading || voucherLoading}
              basic
              color="red"
              onClick={() => setStep(step - 1)}
            >
              {global.translate('Back', 174)}
            </Button>
          )}
          <Button
            disabled={loading || voucherLoading}
            loading={loading || voucherLoading}
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
