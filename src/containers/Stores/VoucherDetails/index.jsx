import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TransactionDetail from 'components/common/TransactionDetails';
import RedeemVoucherModal from 'components/Stores/StoreDetailsComponent/RedeemVoucherModal';

import './style.scss';

const VoucherDetails = () => {
  const history = useHistory();
  const [openRedeemVoucher, setOpenRedeemVoucher] = useState(false);

  const {
    location: {
      state: { item, store },
    },
  } = history;

  return (
    <>
      <RedeemVoucherModal
        open={openRedeemVoucher}
        setOpen={setOpenRedeemVoucher}
      />
      <TransactionDetail
        item={{ ...item, isOnStore: true }}
        modifyOneTransaction={setOpenRedeemVoucher}
        selectedCard={3}
        storeName={store.StoreName}
      />
    </>
  );
};

export default VoucherDetails;
