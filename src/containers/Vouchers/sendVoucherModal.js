/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import sendVoucher, {
  clearVoucherErrors,
} from 'redux/actions/vouchers/sendVoucher';

import getMyWallets from 'redux/actions/users/getMyWallets';
import confirmTransaction from 'redux/actions/money-transfer/confirmTransaction';
import getSupportedCountries from 'redux/actions/countries/getSupportedCountries';
import { updateMoneyTransferStep } from 'redux/actions/dashboard/dashboard';

export default ({
  userData,
  walletList,
  selectedContact,
  form,
  handleInputChange,
  setForm,
  setScreenNumber,
  setSelectedContact,
  setSelectedStore,
  getRecentContacts,
  isExternalContacts,
  searchData,
}) => {
  const destinationContact = selectedContact;
  const { allContacts } = useSelector(state => state.contacts);
  const { selectedStore } = useSelector(state => state.voucher);
  const [, setContactPID] = React.useState();
  const [balanceOnWallet, setBalance] = useState(0.0);
  const [currency, setCurrency] = useState(null);
  const [destinationWallets, setDestinationWallets] = useState([]);
  const [, setCountryCode] = useState(null);
  const [, setTargetCurrencyCode] = useState(null);
  const [contacts, setallContacts] = useState([]);
  const [sendMoneyOpen, setSendMoneyOpen] = useState(false);

  const {
    supportedCountries: { data: appCountries },
  } = useSelector(({ countries }) => countries);

  const [errors, setErrors] = useState(null);
  const [storeCountry, setStoreCountry] = useState({});
  const [countryCurrencies, setCountryCurrencies] = useState([]);
  const DefaultWallet = useSelector(
    state =>
      state.user.userData.data &&
      state.user.userData.data.DefaultWallet,
  );

  const {
    moneyTransfer: { step },
  } = useSelector(state => state.dashboard);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!walletList.length || walletList.length < 0) {
      getMyWallets()(dispatch);
    }
  }, [walletList]);

  useEffect(() => {
    setForm({
      ...form,
      user1wallets: DefaultWallet,
    });
  }, [DefaultWallet, sendMoneyOpen]);

  const {
    checking,
    confirmationError,
    confirmationData,
  } = useSelector(state => state.moneyTransfer.confirmTransaction);

  const { loading, error, data } = useSelector(
    state => state.voucher.createVoucher,
  );
  useEffect(() => {
    if (confirmationData && confirmationData[0]) {
      updateMoneyTransferStep(2)(dispatch);
    }
  }, [confirmationData]);

  const resetState = () => {
    updateMoneyTransferStep(1)(dispatch);

    clearVoucherErrors()(dispatch);
  };

  useEffect(() => {
    setForm({
      ...form,
      isRecurring: false,
    });
    setForm({
      ...form,
      sendNow: true,
    });
  }, []);

  useEffect(() => {
    setallContacts(allContacts.data);
  }, [allContacts.data]);
  const balanceData = useSelector(state => state.user.userData.data);

  useEffect(() => {
    if (balanceData) {
      setBalance(balanceData.Balance);
    }
  }, [balanceData]);
  useEffect(() => {
    if (form.user2wallets) {
      const contactWallets = contacts.find(
        contact =>
          contact.ContactPID === destinationContact.ContactPID,
      ).Wallets;
      const contactWallet = contactWallets.find(
        wallet => wallet.WalletNumber === form.user2wallets,
      ).Currency;
      setTargetCurrencyCode(contactWallet || '');
    }
  }, [form.user2wallets]);

  const getUserContactDetails = PID => {
    return (
      allContacts.data &&
      allContacts.data.find(contact => contact.ContactPID === PID)
    );
  };

  const validate = () => {
    let hasError = false;
    if (parseFloat(form.amount, 10) === 0) {
      setErrors(global.translate('The amount cannot be zero'));
      hasError = true;
    }

    if (parseFloat(balanceOnWallet, 10) === 0) {
      setErrors(
        global.translate(
          'You do not have enough money in this wallet for this operation',
          394,
        ),
      );
      hasError = true;
      return true;
    }

    if (form.amount === '' || !form.amount) {
      setErrors(
        global.translate(
          'You must enter the amount for this operation.',
          393,
        ),
      );
      hasError = true;
    }

    return hasError;
  };
  const checkTransactionConfirmation = () => {
    const data = {
      CountryCode: selectedContact.CountryCode,
      Amount: form.amount && form.amount.toString(),
      TargetCurrency: selectedStore.Currency,
      TargetType: '1',
      SourceWallet: form?.user1wallets,
    };
    setErrors(null);
    if (!validate()) {
      confirmTransaction(data)(dispatch);
    }
  };

  const { digit0, digit1, digit2, digit3 } = form;
  const PIN = `${digit0}${digit1}${digit2}${digit3}`;
  const pinIsValid = () => PIN.length === 4;
  const sendVoucherFx = () => {
    const postData = {
      PIN,
      StoreID: selectedStore.StoreID,
      ContactPID:
        selectedContact.ContactType === 'INTERNAL'
          ? selectedStore.ContactPID
          : '',
      FirstName: selectedStore.FirstName,

      LastName: selectedStore.LastName,

      Amount: form.amount ? form.amount.toString() : '',
      SourceWallet: form?.user1wallets,
    };

    if (selectedContact.ContactType === 'INTERNAL') {
      postData.TargetPhoneNumber = selectedContact.PhoneNumber;
    } else {
      postData.TargetPhoneNumber = selectedContact.PhoneNumber;
    }

    if (!pinIsValid()) {
      setErrors('Please enter your 4 digit PIN Number');
      return;
    }
    setErrors(null);
    sendVoucher(postData)(dispatch);
  };

  useEffect(() => {
    if (destinationContact) {
      const contact = getUserContactDetails(
        destinationContact.ContactPID,
      );
      setContactPID(destinationContact.ContactPID);
      setDestinationWallets(contact && contact.Wallets);
      setCountryCode(contact && contact.CountryCode);
    }
  }, [destinationContact]);

  useEffect(() => {
    if (form.user1wallets && walletList) {
      const walletData =
        walletList &&
        walletList.find(
          item => item.AccountNumber === form.user1wallets,
        );

      if (walletData) {
        setBalance(
          `${walletData.Balance} ${walletData.CurrencyCode}`,
        );
        setCurrency(walletData.CurrencyCode);
      }
    }
  }, [form]);

  const onOptionsChange = (e, { name, value }) => {
    setForm({
      ...form,
      [name]: value,
    });
  };
  const onChange = e => {
    e.persist();
    setForm({
      ...form,
      [e.target.name]: e.target.checked,
    });
  };

  const [, setCurrencyOptions] = useState([]);

  useEffect(() => {
    if (
      selectedStore.CountryCode &&
      selectedStore.CountryCode !== ''
    ) {
      const userCountry =
        appCountries &&
        appCountries.find(c => {
          return (
            c.CountryCode === selectedStore.CountryCode.toUpperCase()
          );
        });

      if (userCountry) {
        setCurrencyOptions(userCountry.Currencies);
        setStoreCountry(userCountry);
        setForm({
          ...form,
          targetCurrency: userCountry.MainCurrency,
        });
      }
    }
  }, [selectedStore]);

  useEffect(() => {
    const newOptions =
      storeCountry &&
      storeCountry.Currencies &&
      storeCountry.Currencies.map(i => {
        const v = Object.values(i);
        return {
          key: v[0],
          text: v[0],
          value: v[0],
        };
      });

    setCountryCurrencies(newOptions);
  }, [storeCountry]);

  useEffect(() => {
    updateMoneyTransferStep(1)(dispatch);
    getSupportedCountries()(dispatch);
  }, []);

  return {
    history,
    allContacts,
    contacts,
    setErrors,
    walletList,
    userData,
    onChange,
    onOptionsChange,
    form,
    balanceOnWallet,
    setBalance,
    setForm,
    sendMoneyOpen,
    setSendMoneyOpen,
    destinationWallets,
    checkTransactionConfirmation,
    currency,
    checking,
    confirmationError,
    confirmationData,
    sendVoucherFx,
    setContactPID,
    loading,
    errors,
    error,
    data,
    DefaultWallet,
    step,
    resetState,
    selectedContact,
    selectedStore,
    handleInputChange,
    setScreenNumber,
    setSelectedContact,
    setSelectedStore,
    currencyOptions: countryCurrencies,
    getRecentContacts,
    isExternalContacts,
    searchData,
  };
};
