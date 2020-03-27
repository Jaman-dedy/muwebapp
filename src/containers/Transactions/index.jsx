import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import TransactionComponent from 'components/Transactions';

import getWalletTransactions from 'redux/actions/transactions/getWalletTransactions';
import getUnpaidCashList from 'redux/actions/transactions/getUnpaidCashList';
import getMyWallets from 'redux/actions/users/getMyWallets';

const Transactions = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [tableVisible, setTableVisible] = useState(true);
  const [chartData, setChartData] = useState([
    { name: 'Credit', name2: 'Total Credit', value: 0, total: 0 },
    { name: 'Debit', name2: 'Total Debit', value: 0, total: 0 },
  ]);
  const [amountChartData, setAmountChartData] = useState([
    { name: 'Total Credit', value: 0 },
    { name: 'Total Debit', value: 0 },
  ]);
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
    if (
      !walletTransactions.loading &&
      !walletTransactions.error &&
      walletTransactions.data
    ) {
      setTableVisible(true);
    }
  }, [walletTransactions]);

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

  useEffect(() => {
    if (form) {
      setTableVisible(false);
    }
  }, [form]);

  const getChartData = () => {
    let creditCount = 0;
    let debitCount = 0;
    let debitAmountCount = 0;
    let creditAmountCount = 0;
    for (let i = 0; i < walletTransactions.data.length; i += 1) {
      const element = walletTransactions.data[i];
      if (element.OpsType === '-') {
        debitCount += 1;
        debitAmountCount += parseFloat(element.Amount.split(' ')[0]);
      } else {
        creditCount += 1;
        creditAmountCount += parseFloat(element.Amount.split(' ')[0]);
      }
    }
    setChartData([
      {
        name: 'Credit',
        value: creditCount,
        total: creditAmountCount,
      },
      { name: 'Debit', value: debitCount, total: debitAmountCount },
    ]);
    setAmountChartData([
      { name: 'Total Credit', value: creditAmountCount },
      { name: 'Total Debit', value: debitAmountCount },
    ]);
  };

  useEffect(() => {
    if (walletTransactions.data) {
      getChartData();
    }
  }, [walletTransactions.data]);

  return (
    <TransactionComponent
      history={history}
      userData={userData}
      chartData={chartData}
      walletTransactions={walletTransactions}
      onChange={onChange}
      amountChartData={amountChartData.map(({ value, ...rest }) => ({
        ...rest,
        value: parseFloat(value.toFixed(2)),
      }))}
      form={form}
      unPaidCashList={unPaidCashList}
      currentOption={currentOption}
      getTransactions={getTransactions}
      walletList={walletList}
      walletNumber={form.WalletNumber}
      tableVisible={tableVisible}
    />
  );
};

export default Transactions;
