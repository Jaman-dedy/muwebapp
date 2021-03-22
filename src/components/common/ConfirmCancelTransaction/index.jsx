/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import cancelOther, {
  clearOtherTransactionSuccess,
} from 'redux/actions/transactions/cancelOrEditOther';
import PinCodeForm from 'components/common/PinCodeForm';
import Message from 'components/common/Message';
import cancelVoucher, {
  clearTransactionSucess,
} from 'redux/actions/transactions/cancelVoucher';
import cancelTransaction from 'redux/actions/transactions/cancelTransaction';

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
  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
    if (error) {
      setError(null);
    }
  };

  useEffect(() => {
    if (error) {
      setError(null);
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
        <Modal.Content centered className="main-content">
          {step === 1 && (
            <>
              <h3 className="cancel-transaction__header">
                {global.translate('Cancel transaction', 1103)}
              </h3>
              <span className="cancel-transaction__content">
                {fromVouchers &&
                  global.translate(
                    'Are you sure, you want to cancel this Voucher?',
                    2235,
                  )}
                {!fromVouchers &&
                  global.translate(
                    'Are you sure, you want to cancel this transaction?',
                    2236,
                  )}
              </span>
            </>
          )}
          {step === 2 && (
            <div className="pin-number-inputs">
              <PinCodeForm
                label={global.translate(
                  'Confirm with your PIN number',
                  2151,
                )}
                onChange={onChange}
                shouldClear={shouldClear}
                setShouldClear={setShouldClear}
              />
            </div>
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
              basic
              color="red"
              active
              onClick={() => setOpen(false)}
            >
              {global.translate('Cancel', 2237)}
            </Button>
          )}
          {step === 2 && (
            <Button
              disabled={loading || voucherLoading || loadOther}
              basic
              color="red"
              onClick={() => setStep(step - 1)}
            >
              {global.translate('Back', 2158)}
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
  sendToOther: PropTypes.bool,
};

ConfirmCancelTransaction.defaultProps = {
  open: false,
  fromVouchers: false,
  sendToOther: false,
};
export default ConfirmCancelTransaction;
