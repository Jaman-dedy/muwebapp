import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import CashListComponent from 'components/Transactions/CashList';
import { useLocation } from 'react-router-dom';
import getWalletTransactions from 'redux/actions/transactions/getWalletTransactions';
import getUnpaidCashList from 'redux/actions/transactions/getUnpaidCashList';
import cancelTransaction from 'redux/actions/transactions/cancelTransaction';
import getPendingVouchers from 'redux/actions/transactions/getPendingVouchers';

const Transactions = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const fromVouchers =
    location && location.state && location.state.fromVouchers;
  const { userData } = useSelector(state => state.user);
  const {
    walletTransactions,
    unPaidCashList,
    pendingVouchers: { data: pendingVouchersOnWallets },
    cancelTransaction: { cancelTransactionData },
  } = useSelector(state => state.transactions);
  const walletNumber = userData.data && userData.data.DefaultWallet;
  const getVoucherTransactions = () => {
    getPendingVouchers()(dispatch);
  };
  useEffect(() => {
    if (!pendingVouchersOnWallets) {
      getVoucherTransactions();
    }
  }, []);
  const mappedData =
    pendingVouchersOnWallets &&
    !pendingVouchersOnWallets[0].Error &&
    pendingVouchersOnWallets &&
    pendingVouchersOnWallets.map(
      ({
        Recipient: { FirstName, LastName, PhoneNumber, ...userInfo },
        Amount,
        CurrencyFlag,
        Store: { Name, ...store },
        ...rest
      }) => {
        return {
          FirstName: FirstName,
          LastName: LastName,
          ...userInfo,
          Store: Name,
          ...store,
          SourceAmount: Amount,
          SourceCurrencyFlag: CurrencyFlag,
          PhoneNumber: PhoneNumber,
          ...rest,
        };
      },
    );

  const [form, setForm] = useState({
    fromDate: moment()
      .subtract(2, 'months')
      .format('YYYY-MM-DD'),
    toDate: moment().format('YYYY-MM-DD'),
  });
  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  const getTransactions = () => {
    getWalletTransactions({
      WalletNumber: walletNumber,
      DateFrom: form.fromDate,
      DateTo: form.toDate,
      MaxRecordsReturned: '1000',
    })(dispatch);
  };

  const getUnPaidCashList = () => {
    if (!unPaidCashList.data) {
      getUnpaidCashList()(dispatch);
    }
  };

  useEffect(() => {
    getUnPaidCashList();
  }, []);

  useEffect(() => {
    if (!walletTransactions.data) {
      getUnPaidCashList();
    }
  }, []);

  return (
    <CashListComponent
      history={history}
      userData={userData}
      walletTransactions={walletTransactions}
      onChange={onChange}
      form={form}
      getTransactions={getTransactions}
      walletNumber={walletNumber}
      unPaidCashList={unPaidCashList}
      getUnPaidCashList={getUnPaidCashList}
      cancelTransactionData={cancelTransactionData}
      pendingVouchersOnWallets={mappedData}
      fromVouchers={fromVouchers}
    />
  );
};

export default Transactions;
