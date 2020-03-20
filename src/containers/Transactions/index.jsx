import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import TransactionComponent from 'components/TransactionComponent';

import getWalletTransactions from 'redux/actions/transactions/getWalletTransactions';

const Transactions = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { userData } = useSelector(state => state.user);
  const { walletTransactions } = useSelector(
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

  console.log('form', form);
  const getTransactions = () => {
    getWalletTransactions({
      WalletNumber: walletNumber,
      DateFrom: form.fromDate,
      DateTo: form.toDate,
      MaxRecordsReturned: '1000',
    })(dispatch);
  };
  useEffect(() => {
    setTimeout(() => {
      getTransactions();
    }, 1000);
  }, [form]);

  const chartData = [
    { name: 'Credit', value: 400 },
    { name: 'Debit', value: 300 },
  ];
  const COLORS = ['#FF4500', '#00C49F'];
  return (
    <TransactionComponent
      history={history}
      userData={userData}
      chartData={chartData}
      colors={COLORS}
      walletTransactions={walletTransactions}
      onChange={onChange}
      form={form}
      getTransactions={getTransactions}
      walletNumber={walletNumber}
    />
  );
};

export default Transactions;
