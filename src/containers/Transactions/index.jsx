/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import TransactionComponent from 'components/Transactions';
import getWalletTransactions from 'redux/actions/transactions/getWalletTransactions';
import getUnpaidCashList from 'redux/actions/transactions/getUnpaidCashList';
import getMyWallets from 'redux/actions/users/getMyWallets';
import getAllTransactionHistory from 'redux/actions/transactions/getHistory';
import getExternalContactTransactions from 'redux/actions/transactions/getExternalContactTransactions';
import getPendingVouchers from 'redux/actions/transactions/getPendingVouchers';

const Transactions = () => {
  const location = useLocation();
  const wallet = location && location.state && location.state.wallet;
  const contact = location.state && location.state.contact;

  const { userData } = useSelector(state => state.user);
  const {
    walletTransactions,
    cancelTransaction: { data },
    unPaidCashList,
    pendingVouchers,
    externalContactTransactions,
  } = useSelector(state => state.transactions);
  const { walletList } = useSelector(state => state.user.myWallets);

  const contactType =
    location.state && location.state.isSendingCash
      ? 'EXTERNAL'
      : 'DEFAULT';
  const history = useHistory();
  const dispatch = useDispatch();

  const { history: historyData } = useSelector(
    ({ transactions }) => transactions,
  );

  const getVoucherTransactions = () => {
    getPendingVouchers()(dispatch);
  };

  const [tableVisible, setTableVisible] = useState(true);
  const [chartData, setChartData] = useState([
    {
      name: global.translate('Credit'),
      name2: global.translate('Total Credit'),
      value: 0,
      total: 0,
    },
    {
      name: global.translate('Debit'),
      name2: global.translate('Total Debit'),
      value: 0,
      total: 0,
    },
  ]);
  const [amountChartData, setAmountChartData] = useState([
    { name: global.translate('Credit'), value: 0 },
    { name: global.translate('Total Debit'), value: 0 },
  ]);
  const [form, setForm] = useState({
    fromDate: moment()
      .subtract(12, 'months')
      .format('YYYY-MM-DD'),
    toDate: moment().format('YYYY-MM-DD'),
  });
  const [currentOption, setCurrentOption] = useState({});
  useEffect(() => {
    if (wallet) {
      setCurrentOption(
        walletList &&
          walletList.find(
            item => item.AccountNumber === wallet.AccountNumber,
          ),
      );
    } else {
      setCurrentOption(
        walletList &&
          walletList.find(wallet => wallet.Default === 'YES'),
      );
    }
  }, [wallet, walletList]);

  useEffect(() => {
    setForm({
      ...form,
      WalletNumber: currentOption && currentOption.AccountNumber,
    });
  }, [currentOption]);
  useEffect(() => {
    if (contact) {
      if (contactType === 'EXTERNAL') {
        if (
          !externalContactTransactions.loading &&
          !externalContactTransactions.error &&
          externalContactTransactions.data
        ) {
          setTableVisible(true);
        }
      } else if (
        !historyData.loading &&
        !historyData.error &&
        historyData.data
      ) {
        setTableVisible(true);
      }
    } else if (
      !contact &&
      !walletTransactions.loading &&
      !walletTransactions.error &&
      walletTransactions.data
    ) {
      setTableVisible(true);
    }
  }, [
    walletTransactions,
    historyData,
    contact,
    contactType,
    externalContactTransactions,
  ]);

  useEffect(() => {
    if (form.WalletNumber) {
      setCurrentOption(
        walletList.find(
          item => item.AccountNumber === form.WalletNumber,
        ),
      );
    }
  }, [form.WalletNumber, walletList]);

  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };
  const getTransactions = () => {
    if (contact) {
      if (contactType === 'EXTERNAL') {
        getExternalContactTransactions({
          DateFrom: form.fromDate,
          DateTo: form.toDate,
          TargetPhoneNumber: contact.PhoneNumber,
          MaxRecordsReturned: '10000',
        })(dispatch);
      } else {
        getAllTransactionHistory({
          WalletNumber: '',
          ContactWalletNumber: '',
          ContactPID: contact.ContactPID,
          DateFrom: form.fromDate,
          DateTo: form.toDate,
          MaxRecordsReturned: '100000',
        })(dispatch);
      }
    } else {
      getWalletTransactions({
        WalletNumber: form.WalletNumber,
        DateFrom: form.fromDate,
        DateTo: form.toDate,
        MaxRecordsReturned: '1000',
      })(dispatch);
    }
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
    if (form.WalletNumber || data) {
      getTransactions();
      getUnPaidCashList();
    }
  }, [form.WalletNumber, data]);

  useEffect(() => {
    if (!pendingVouchers.data) {
      getVoucherTransactions();
    }
  }, []);

  useEffect(() => {
    if (form) {
      setTableVisible(false);
    }
  }, [form]);
  const getChartData = data => {
    let creditCount = 0;
    let debitCount = 0;
    let debitAmountCount = 0;
    let creditAmountCount = 0;
    for (let i = 0; i < data.length; i += 1) {
      const element = data[i];
      const rAmount =
        element.Amount &&
        element.Amount.split(' ')[0].replace(/,/g, '');
      const unformatted = parseFloat(rAmount) || 0;
      if (element.OpsType === '-') {
        debitCount += 1;
        debitAmountCount += unformatted;
      } else if (element.OpsType === '+') {
        creditCount += 1;
        creditAmountCount += unformatted;
      }
    }
    setChartData([
      {
        name: global.translate('Credit'),
        value: creditCount,
        total: creditAmountCount,
      },
      {
        name: global.translate('Debit'),
        value: debitCount,
        total: debitAmountCount,
      },
    ]);
    setAmountChartData([
      {
        name: global.translate('Total Credit'),
        value: creditAmountCount,
      },
      {
        name: global.translate('Total Debit'),
        value: debitAmountCount,
      },
    ]);
  };

  useEffect(() => {
    if (walletTransactions.data && !contact) {
      getChartData(walletTransactions.data);
    }
    if (historyData.data && contact) {
      getChartData(historyData.data);
    }
  }, [walletTransactions.data, contact, historyData.data]);
  return (
    <TransactionComponent
      history={history}
      userData={userData}
      chartData={chartData}
      walletTransactions={
        contact
          ? contactType === 'EXTERNAL'
            ? externalContactTransactions
            : historyData
          : walletTransactions
      }
      contact={contact}
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
      getVoucherTransactions={getVoucherTransactions}
      walletNumber={form.WalletNumber}
      tableVisible={tableVisible}
      pendingVouchers={pendingVouchers}
    />
  );
};

Transactions.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default Transactions;
