/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import queryString from 'query-string';
import TransactionComponent from 'components/Transactions';
import getWalletTransactions from 'redux/actions/transactions/getWalletTransactions';
import getUnpaidCashList from 'redux/actions/transactions/getUnpaidCashList';
import getMyWallets from 'redux/actions/users/getMyWallets';
import getAllTransactionHistory from 'redux/actions/transactions/getHistory';
import getExternalContactTransactions from 'redux/actions/transactions/getExternalContactTransactions';
import getPendingVouchers from 'redux/actions/transactions/getPendingVouchers';
import recentStoresAction from 'redux/actions/transactions/recentStores';
import getPendingOtherTransfer from 'redux/actions/transactions/getPendingOtherTransfer';

const Transactions = () => {
  const location = useLocation();
  const wallet = location && location.state && location.state.wallet;
  const contact = location.state && location.state.contact;

  const queryParams = queryString.parse(location.search);

  const [activeTab, setActiveTab] = useState(0);

  const { userData } = useSelector(state => state.user);
  const {
    walletTransactions,
    cancelTransaction: { data },
    unPaidCashList,
    pendingVouchers,
    externalContactTransactions,
    recentStores,
    pendingOther: {
      data: pendingOtherData,
      loading: pendingOtherLoading,
      error: pendingOtherError,
    },
  } = useSelector(state => state.transactions);

  const { walletList } = useSelector(state => state.user.myWallets);

  const contactType = contact?.ContactType;
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
      name2: global.translate('Total Credit', 1245),
      value: 0,
      total: 0,
    },
    {
      name: global.translate('Debit', 1230),
      name2: global.translate('Total Debit', 1255),
      value: 0,
      total: 0,
    },
  ]);
  const [amountChartData, setAmountChartData] = useState([
    { name: global.translate('Credit'), value: 0 },
    { name: global.translate('Total Debit', 1255), value: 0 },
  ]);
  const [form, setForm] = useState({
    fromDate: moment()
      .subtract(12, 'months')
      .format('YYYY-MM-DD'),
    toDate: moment().format('YYYY-MM-DD'),
  });
  const [currentOption, setCurrentOption] = useState({});

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
  const getUnPaidCashList = () => {
    if (!unPaidCashList.data) {
      getUnpaidCashList()(dispatch);
    }
  };
  const getTransactions = () => {
    if (contact) {
      if (contactType === 'EXTERNAL') {
        getExternalContactTransactions({
          DateFrom: form.fromDate,
          DateTo: form.toDate,
          TargetPhoneNumber: contact.PhoneNumber,
          MaxRecordsReturned: '100',
        })(dispatch);
      } else {
        getAllTransactionHistory({
          WalletNumber: '',
          ContactWalletNumber: '',
          ContactPID: contact.ContactPID,
          DateFrom: form.fromDate,
          DateTo: form.toDate,
          MaxRecordsReturned: '100',
        })(dispatch);
      }
    } else {
      getWalletTransactions({
        WalletNumber: form.WalletNumber || '',
        DateFrom: form.fromDate,
        DateTo: form.toDate,
        Proxy: 'Yes',
        PageNumber: '1',
        RecordPerPage: '7',
      })(dispatch);
    }
  };
  const fetchAllTransaction = () => {
    setCurrentOption({});
    getUnPaidCashList();
    getWalletTransactions({
      WalletNumber: '',
      DateFrom: form.fromDate,
      DateTo: form.toDate,
      Proxy: 'Yes',
      PageNumber: '1',
      RecordPerPage: '7',
    })(dispatch);
  };

  const getMoreResults = page => {
    getWalletTransactions({
      WalletNumber: form.WalletNumber,
      DateFrom: form.fromDate,
      DateTo: form.toDate,
      Proxy: 'Yes',
      PageNumber: String(page),
      RecordPerPage: '7',
    })(dispatch);
  };

  useEffect(() => {
    if (walletList.length === 0) {
      getMyWallets()(dispatch);
    }
  }, [walletList]);

  useEffect(() => {
    if (!recentStores.data) {
      recentStoresAction()(dispatch);
    }
  }, []);

  useEffect(() => {
    if (!pendingOtherData) {
      const data = {
        Proxy: 'Yes',
        PageNumber: '1',
        RecordPerPage: '10',
      };
      getPendingOtherTransfer(data)(dispatch);
    }
  }, []);
  useEffect(() => {
    getTransactions();
    getUnPaidCashList();
    getVoucherTransactions();
  }, []);

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
  const getChartData = (data = [{}]) => {
    let creditCount = 0;
    let debitCount = 0;
    let debitAmountCount = 0;
    let creditAmountCount = 0;

    if (data?.[0]?.Meta) {
      creditCount = data?.[0]?.Meta.CreditCount;
      debitCount = data?.[0]?.Meta.DebitCount;
      debitAmountCount = data?.[0]?.Meta.TotalDebit;
      creditAmountCount = data?.[0]?.Meta.TotalCredit;
    } else {
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
    }

    setChartData([
      {
        name: global.translate('Credit'),
        value: parseInt(creditCount, 10),
        total: parseFloat(creditAmountCount),
      },
      {
        name: global.translate('Debit', 1230),
        value: parseInt(debitCount, 10),
        total: parseFloat(debitAmountCount),
      },
    ]);
    setAmountChartData([
      {
        name: global.translate('Total Credit', 1245),
        value: creditAmountCount,
      },
      {
        name: global.translate('Total Debit', 1255),
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

  useEffect(() => {
    let activeTabIndex = 0;

    switch (queryParams.tab) {
      case 'transactions':
        activeTabIndex = 0;
        break;
      case 'pending-cash-sent':
        activeTabIndex = 1;
        break;
      case 'pending-voucher':
        activeTabIndex = 2;
        break;
      case 'recent-stores':
        activeTabIndex = 3;
        break;

      default:
        break;
    }

    setActiveTab(activeTabIndex);
  }, []);

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
      amountChartData={amountChartData.map(
        ({ value = '0', ...rest }) => ({
          ...rest,
          value: parseFloat(value),
        }),
      )}
      form={form}
      unPaidCashList={unPaidCashList}
      currentOption={currentOption}
      getTransactions={getTransactions}
      walletList={walletList}
      getVoucherTransactions={getVoucherTransactions}
      walletNumber={form.WalletNumber}
      tableVisible={tableVisible}
      pendingVouchers={pendingVouchers}
      getMoreResults={getMoreResults}
      recentStores={recentStores}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      pendingOtherData={pendingOtherData}
      pendingOtherLoading={pendingOtherLoading}
      pendingOtherError={pendingOtherError}
      fetchAllTransaction={fetchAllTransaction}
    />
  );
};

Transactions.propTypes = {};
export default Transactions;
