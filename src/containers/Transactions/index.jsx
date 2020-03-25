import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import TransactionComponent from 'components/TransactionComponent';

import getWalletTransactions from 'redux/actions/transactions/getWalletTransactions';
import getUnpaidCashList from 'redux/actions/transactions/getUnpaidCashList';
import getMyWallets from 'redux/actions/users/getMyWallets';

const Transactions = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    fromDate: moment()
      .subtract(2, 'months')
      .format('YYYY-MM-DD'),
    toDate: moment().format('YYYY-MM-DD'),
  });
  const { userData } = useSelector(state => state.user);
  const { walletTransactions, unPaidCashList } = useSelector(
    state => state.transactions,
  );
  const { walletList } = useSelector(state => state.user.myWallets);
  const [currentOption, setCurrentOption] = useState({});

  useEffect(() => {
    setCurrentOption(
      walletList &&
        walletList.find(wallet => wallet.Default === 'YES'),
    );
  }, [walletList]);

  useEffect(() => {
    setForm({
      ...form,
      WalletNumber: currentOption && currentOption.AccountNumber,
    });
  }, [currentOption]);

  useEffect(() => {
    if (form.WalletNumber) {
      setCurrentOption(
        walletList.find(
          item => item.AccountNumber === form.WalletNumber,
        ),
      );
    }
  }, [form.WalletNumber]);

  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  const getTransactions = () => {
    getWalletTransactions({
      WalletNumber: form.WalletNumber,
      DateFrom: form.fromDate,
      DateTo: form.toDate,
      MaxRecordsReturned: '1000',
    })(dispatch);
  };

  useEffect(() => {
    if (walletList.length === 0) {
      getMyWallets()(dispatch);
    }
  }, [walletList]);
  const getUnPaidCashList = () => {
    if (!unPaidCashList.data) {
      getUnpaidCashList()(dispatch);
    }
  };

  useEffect(() => {
    if (form.WalletNumber) {
      getTransactions();
      getUnPaidCashList();
    }
  }, [form.WalletNumber]);

  const chartData = [
    { name: 'Credit', value: 400 },
    { name: 'Debit', value: 300 },
  ];

  const statusData=[
    
  ]
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
      unPaidCashList={unPaidCashList}
      currentOption={currentOption}
      getTransactions={getTransactions}
      walletList={walletList}
      walletNumber={form.WalletNumber}
    />
  );
};

export default Transactions;
