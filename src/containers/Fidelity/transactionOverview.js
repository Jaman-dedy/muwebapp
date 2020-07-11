import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import getContactList from 'redux/actions/contacts/getContactList';
import getUserCurrencies from 'redux/actions/users/getUserCurrencies';
import getMyWallets from 'redux/actions/users/getMyWallets';
import getTransactionHistory from 'redux/actions/transactions/overview/getTransactionsOverview';
import getTransactionHistoryWithContact from 'redux/actions/transactions/overview/getTransactionsOverviewWithContact';

export default () => {
  const dispatch = useDispatch();
  const [filterData, setFilterData] = useState({
    Currency: '',
    DateFrom: moment()
      .subtract(12, 'months')
      .format('YYYY-MM-DD'),
    DateTo: moment().format('YYYY-MM-DD'),
  });

  const [
    walletsNumberOfTransactions,
    setWalletsNumberOfTransactions,
  ] = useState([]);
  const [
    walletsAmountOfTransactions,
    setWalletsAmountOfTransactions,
  ] = useState([]);
  const [
    cashInCashOutOfTransactions,
    setCashInCashOutOfTransactions,
  ] = useState([]);

  const [
    walletsAmountOfTransactionsWithContact,
    setWalletsAmountOfTransactionsWithContact,
  ] = useState([]);

  const [selectedContact, setSelectedContact] = useState(null);
  const { allContacts } = useSelector(state => state.contacts);
  const { currencies, userData, myWallets } = useSelector(
    state => state.user,
  );
  const {
    overview: {
      transactionsOverview,
      transactionsOverviewWithContact,
    },
  } = useSelector(state => state.transactions);

  const { walletList } = myWallets;

  useEffect(() => {
    if (!currencies.data && userData.data) {
      getUserCurrencies({
        CountryCode: userData.data.Country,
      })(dispatch);
    }
    if (userData.data) {
      const { Currency } = userData.data;
      setFilterData({ ...filterData, Currency });
    }
  }, [userData]);

  useEffect(() => {
    if (!allContacts.data) {
      getContactList()(dispatch);
    }
  }, []);

  useEffect(() => {
    if (!walletList.length) {
      getMyWallets()(dispatch);
    }
  }, []);

  const refreshGraphs = () => {
    const { DateFrom, DateTo, Currency } = filterData;
    setFilterData({
      DateFrom,
      DateTo,
      Currency,
    });
  };

  useEffect(() => {
    const { DateFrom, DateTo, Currency } = filterData;
    if (Currency) {
      getTransactionHistory({
        DateFrom,
        DateTo,
        MaxRecordsReturned: '10000',
        ContactPID: '',
        BaseCurrency: Currency,
      })(dispatch);
    }
  }, [filterData]);

  useEffect(() => {
    if (selectedContact) {
      const { DateFrom, DateTo, Currency } = filterData;
      const { ContactPID } = selectedContact;
      getTransactionHistoryWithContact({
        DateFrom,
        DateTo,
        MaxRecordsReturned: '10000',
        ContactPID,
        BaseCurrency: Currency,
      })(dispatch);
    }
  }, [selectedContact]);

  const groupWalletsNumberOfTransactions = () => {
    const { data } = transactionsOverview;

    if (data && userData.data) {
      const groupByWallet = data.reduce((acc, it) => {
        const walletsList =
          myWallets.walletList &&
          myWallets.walletList.map(item => item.AccountNumber);

        if (
          it.WalletNumber.includes(userData.data.PID) &&
          walletsList.includes(it.WalletNumber)
        ) {
          if (it.OpsType === '+') {
            acc[it.WalletNumber] = {
              ...acc[it.WalletNumber],
              wallet: it.WalletNumber,
              Credit: acc[it.WalletNumber]
                ? acc[it.WalletNumber].Credit + 1 || 1
                : 1,
            };
          } else if (it.OpsType === '-') {
            acc[it.WalletNumber] = {
              ...acc[it.WalletNumber],
              wallet: it.WalletNumber,
              Debit: acc[it.WalletNumber]
                ? acc[it.WalletNumber].Debit + 1 || 1
                : 1,
            };
          }
        } else if (it.TargetAccount.includes(userData.data.PID)) {
          if (it.OpsType === '+') {
            acc[it.TargetAccount] = {
              ...acc[it.TargetAccount],
              wallet: it.TargetAccount,
              Credit: acc[it.TargetAccount]
                ? acc[it.TargetAccount].Credit + 1 || 1
                : 1,
            };
          } else if (it.OpsType === '-') {
            acc[it.TargetAccount] = {
              ...acc[it.TargetAccount],
              wallet: it.TargetAccount,
              Debit: acc[it.TargetAccount]
                ? acc[it.TargetAccount].Debit + 1 || 1
                : 1,
            };
          }
        }
        return acc;
      }, {});

      const sortedData = Object.values(groupByWallet).sort(
        (a, b) =>
          (b.Debit || 0) +
          (b.Credit || 0) -
          ((a.Debit || 0) + (a.Credit || 0)),
      );

      setWalletsNumberOfTransactions(sortedData);
    }
  };

  const groupWalletsAmountOfTransactions = () => {
    const { data } = transactionsOverview;

    if (data) {
      const groupByWallet = data.reduce((acc, it) => {
        const amount = Number(
          it.Amount.split(' ')[0].replace(/,/g, ''),
        );
        if (it.WalletNumber.includes(userData.data.PID)) {
          if (it.OpsType === '+') {
            acc[it.WalletNumber] = {
              ...acc[it.WalletNumber],
              wallet: it.WalletNumber,
              Credit: acc[it.WalletNumber]
                ? acc[it.WalletNumber].Credit + amount || amount
                : amount,
            };
          } else if (it.OpsType === '-') {
            acc[it.WalletNumber] = {
              ...acc[it.WalletNumber],
              wallet: it.WalletNumber,
              Debit: acc[it.WalletNumber]
                ? acc[it.WalletNumber].Debit + amount || amount
                : amount,
            };
          }
        } else if (it.TargetAccount.includes(userData.data.PID)) {
          if (it.OpsType === '+') {
            acc[it.TargetAccount] = {
              ...acc[it.TargetAccount],
              wallet: it.TargetAccount,
              Credit: acc[it.TargetAccount]
                ? acc[it.TargetAccount].Credit + amount || amount
                : amount,
            };
          } else if (it.OpsType === '-') {
            acc[it.TargetAccount] = {
              ...acc[it.TargetAccount],
              wallet: it.TargetAccount,
              Debit: acc[it.TargetAccount]
                ? acc[it.TargetAccount].Debit + amount || amount
                : amount,
            };
          }
        }
        return acc;
      }, {});

      const sortedData = Object.values(groupByWallet).sort(
        (a, b) =>
          (b.Debit || 0) +
          (b.Credit || 0) -
          ((a.Debit || 0) + (a.Credit || 0)),
      );

      setWalletsAmountOfTransactions(sortedData);
    }
  };

  const groupCashInCashOutOfTransactions = () => {
    const { data } = transactionsOverview;

    if (data) {
      const groupByWallet = data.reduce((acc, it) => {
        acc[it.OpsType] = {
          ...acc[it.OpsType],
          name: it.OpsType,
          value: acc[it.OpsType] ? acc[it.OpsType].value + 1 || 1 : 1,
        };

        return acc;
      }, {});
      setCashInCashOutOfTransactions(Object.values(groupByWallet));
    }
  };

  const groupWalletsAmountOfTransactionsWithContact = () => {
    const { data } = transactionsOverviewWithContact;

    if (data) {
      const groupByWallet = data.reduce((acc, it) => {
        const amount = Number(
          it.Amount.split(' ')[0].replace(/,/g, ''),
        );
        if (it.WalletNumber.includes(userData.data.PID)) {
          if (it.OpsType === '+') {
            acc[it.WalletNumber] = {
              ...acc[it.WalletNumber],
              wallet: it.WalletNumber,
              Credit: acc[it.WalletNumber]
                ? acc[it.WalletNumber].Credit + amount || amount
                : amount,
            };
          } else if (it.OpsType === '-') {
            acc[it.WalletNumber] = {
              ...acc[it.WalletNumber],
              wallet: it.WalletNumber,
              Debit: acc[it.WalletNumber]
                ? acc[it.WalletNumber].Debit + amount || amount
                : amount,
            };
          }
        } else if (it.TargetAccount.includes(userData.data.PID)) {
          if (it.OpsType === '+') {
            acc[it.TargetAccount] = {
              ...acc[it.TargetAccount],
              wallet: it.TargetAccount,
              Credit: acc[it.TargetAccount]
                ? acc[it.TargetAccount].Credit + amount || amount
                : amount,
            };
          } else if (it.OpsType === '-') {
            acc[it.TargetAccount] = {
              ...acc[it.TargetAccount],
              wallet: it.TargetAccount,
              Debit: acc[it.TargetAccount]
                ? acc[it.TargetAccount].Debit + amount || amount
                : amount,
            };
          }
        }
        return acc;
      }, {});

      const sortedData = Object.values(groupByWallet).sort(
        (a, b) =>
          (b.Debit || 0) +
          (b.Credit || 0) -
          ((a.Debit || 0) + (a.Credit || 0)),
      );

      setWalletsAmountOfTransactionsWithContact(sortedData);
    }
  };

  useEffect(() => {
    groupWalletsNumberOfTransactions();
    groupWalletsAmountOfTransactions();
    groupCashInCashOutOfTransactions();
  }, [transactionsOverview]);

  useEffect(() => {
    groupWalletsAmountOfTransactionsWithContact();
  }, [transactionsOverviewWithContact]);

  const handleInputChange = ({ target: { name, value } }) => {
    if (value) setFilterData({ ...filterData, [name]: value });
  };

  return {
    allContacts,
    selectedContact,
    setSelectedContact,
    currencies,
    userData,
    filterData,
    handleInputChange,
    transactionsOverview,
    transactionsOverviewWithContact,
    myWallets,
    walletsNumberOfTransactions,
    walletsAmountOfTransactions,
    cashInCashOutOfTransactions,
    walletsAmountOfTransactionsWithContact,
    refreshGraphs,
  };
};
