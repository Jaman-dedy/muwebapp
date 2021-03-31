import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TransactionDetail from 'components/common/TransactionDetails';
import RedeemVoucherModal from 'components/Stores/StoreDetailsComponent/RedeemVoucherModal';
import cancelStoreVoucher from 'redux/actions/vouchers/cancelStoreVoucher';
import PINConfirmationModal from 'components/common/PINConfirmationModal';
import './style.scss';

const VoucherDetails = () => {
  const history = useHistory();
  const [openRedeemVoucher, setOpenRedeemVoucher] = useState(false);
  const [voucherData, setVoucherData] = useState(null);
  const [openRejectVoucher, setOpenRejectVoucher] = useState(false);
  const [PIN, setPIN] = useState('');

  const rejectVoucher = useSelector(
    ({ voucher: { rejectVoucher } }) => rejectVoucher,
  );

  const dispatch = useDispatch();

  const { location } = history;
  const item = location?.state?.item;
  const store = location?.state?.store;

  const onRejectVoucher = ({ item, PIN }) => {
    const body = {
      PIN,
      StoreID: item.StoreSID,
      TransactionID: item.TransactionID,
      store,
    };
    cancelStoreVoucher(body, history)(dispatch);
  };

  useEffect(() => {
    return () => {
      localStorage.removeItem('storeVoucherDetails');
      localStorage.removeItem('currentStoreName');
    };
  }, []);

  useEffect(() => {
    if (rejectVoucher?.data && !rejectVoucher?.loading) {
      setOpenRejectVoucher(false);
    }
  }, [rejectVoucher?.data, rejectVoucher?.loading]);

  useEffect(() => {
    if (item && store) {
      localStorage.setItem(
        'storeVoucherDetails',
        JSON.stringify(item),
      );
      localStorage.setItem('currentStoreName', store?.StoreName);
      setVoucherData({
        item,
        storeName: store.StoreName,
      });
    } else {
      const storeVoucherDetail = JSON.parse(
        localStorage.getItem('storeVoucherDetails'),
      );
      const storeName = localStorage.getItem('currentStoreName');
      setVoucherData({
        item: storeVoucherDetail,
        storeName,
      });
    }
  }, [item, store]);
  return (
    <>
      <RedeemVoucherModal
        open={openRedeemVoucher}
        setOpen={setOpenRedeemVoucher}
        item={voucherData?.item}
      />

      <PINConfirmationModal
        open={openRejectVoucher}
        setOpen={setOpenRejectVoucher}
        onPinConfirm={() =>
          onRejectVoucher({ item: voucherData?.item, PIN })
        }
        onClose={() => setOpenRejectVoucher(false)}
        loading={rejectVoucher?.loading}
        PIN={PIN}
        setPIN={setPIN}
      />

      {voucherData && (
        <TransactionDetail
          item={{ ...voucherData?.item, isOnStore: true }}
          modifyOneTransaction={setOpenRedeemVoucher}
          selectedCard={3}
          storeName={voucherData?.storeName}
          onRejectVoucher={() => setOpenRejectVoucher(true)}
        />
      )}
    </>
  );
};

export default VoucherDetails;
