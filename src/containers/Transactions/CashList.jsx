import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import CashListComponent from 'components/Transactions/CashList';

import getWalletTransactions from 'redux/actions/transactions/getWalletTransactions';
import getUnpaidCashList from 'redux/actions/transactions/getUnpaidCashList';

const Transactions = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { userData } = useSelector(state => state.user);
  const { walletTransactions, unPaidCashList } = useSelector(
    state => state.transactions,
  );
  const walletNumber = userData.data && userData.data.DefaultWallet;

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
    />
  );
};

export default Transactions;
