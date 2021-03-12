/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import redeemStoreVoucher from 'redux/actions/vouchers/redeemStoreVoucher';
import VoucherTokenVerification from 'components/common/VoucherTokenVerification';
import VoucherSecurityCode from 'components/common/VoucherSecurityCode';
import Message from 'components/common/Message';
import verifyVoucherFn from 'redux/actions/vouchers/verifyStoreVoucher';
import PendingVoucherDetails from './pendingVoucherDetail';
import VoucherReceiptModal from './VoucherReceiptModal';

const RedeemVoucherModal = ({ open, setOpen, item }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    VoucherNumber: '',
    SecurityCode: '',
  });

  const [
    openVoucherReceiptModal,
    setOpenVoucherReceiptModal,
  ] = useState(false);

  const [error, setError] = useState(null);
  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  const { error: err, data, loading: verifyLoading } = useSelector(
    state => state.voucher.verifyVoucher,
  );

  const { data: redeemData, loading: redeemLoading } = useSelector(
    state => state.voucher.redeemVoucher,
  );

  useEffect(() => {
    if (data && data[0] && data[0].VoucherAlreadyUsed === 'YES') {
      setOpenVoucherReceiptModal(true);
    } else {
      setStep(step + 1);
    }
  }, [data]);

  useEffect(() => {
    setForm({ ...form, VoucherNumber: '', SecurityCode: '' });
  }, [open]);

  useEffect(() => {
    setStep(1);
    setOpen(false);
    if (redeemData) {
      setOpenVoucherReceiptModal(true);
    }
  }, [redeemData]);

  useEffect(() => {
    setOpenVoucherReceiptModal(false);
  }, []);

  return (
    <div>
      <Modal
        size="mini"
        open={open}
        onClose={() => setOpen(false)}
        className="redeem-voucher-modal"
      >
        <Modal.Header className="modal-title">
          {global.translate('Redeem voucher')}
        </Modal.Header>
        <Modal.Content centered className="main-content">
          {step === 2 && (
            <div className="pin-number-inputs">
              {step === 2 && data && (
                <PendingVoucherDetails item={data} />
              )}
            </div>
          )}
          {step === 2 && error && <Message message={error} />}
          {step === 2 && err && (
            <Message
              message={err.error ? err.error : err[0]?.Description}
            />
          )}

          {step !== 2 && (
            <>
              <div
                className="pin-number-inputs"
                style={{ marginTop: 10 }}
              >
                <VoucherTokenVerification
                  form={form}
                  label={global.translate(
                    'Enter the voucher token ',
                    941,
                  )}
                  onInputChange={onChange}
                  name="VoucherNumber"
                  value={form.VoucherNumber || ''}
                />
              </div>
              <div
                className="pin-number-inputs"
                style={{ marginBottom: 10 }}
              >
                <VoucherSecurityCode
                  label={global.translate(
                    'Enter the Security code',
                    941,
                  )}
                  onChange={onChange}
                  name="SecurityCode"
                  value={form.SecurityCode || ''}
                />
              </div>
            </>
          )}
        </Modal.Content>
        <Modal.Actions className="redeem-voucher-modal-actions">
          {step !== 2 && (
            <div className="main-content">
              <Button
                disabled={redeemLoading}
                basic
                color="red"
                onClick={() => setOpen(false)}
              >
                {global.translate('Close')}
              </Button>
              <Button
                className="verify-voucher-btn"
                disabled={verifyLoading}
                loading={verifyLoading}
                positive
                onClick={() => {
                  const SecurityCode = `${form?.digit0}${form?.digit1}${form?.digit2}${form?.digit3}`;
                  const postData = {
                    SecurityCode,
                    VoucherNumber: form?.VoucherNumber,
                    StoreID: item?.StoreSID,
                  };
                  verifyVoucherFn(postData)(dispatch);
                }}
              >
                {global.translate('Verify', 1296)}
              </Button>
            </div>
          )}

          {step === 2 && (
            <>
              <Button
                disabled={redeemLoading}
                basic
                color="red"
                onClick={() => setStep(step - 1)}
              >
                {global.translate('Back')}
              </Button>
              <Button
                disabled={redeemLoading}
                loading={redeemLoading}
                positive
                onClick={() => {
                  const SecurityCode = `${form?.digit0}${form?.digit1}${form?.digit2}${form?.digit3}`;
                  const postData = {
                    SecurityCode,
                    VoucherNumber: form?.VoucherNumber,
                    StoreID: item?.StoreSID,
                  };
                  redeemStoreVoucher(postData)(dispatch);
                }}
              >
                {global.translate('Redeem')}
              </Button>
            </>
          )}
        </Modal.Actions>
      </Modal>
      <VoucherReceiptModal
        data={redeemData ? redeemData?.[0] : data?.[0]}
        isOpened={openVoucherReceiptModal}
        onClose={() => setOpenVoucherReceiptModal(false)}
      />
    </div>
  );
};
RedeemVoucherModal.propTypes = {
  open: PropTypes.bool,
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  setOpen: PropTypes.func.isRequired,
};

RedeemVoucherModal.defaultProps = {
  open: false,
};
export default RedeemVoucherModal;
