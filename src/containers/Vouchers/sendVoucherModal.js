import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import sendVoucher, {
  clearVoucherErrors,
} from 'redux/actions/vouchers/sendVoucher';

import getMyWallets from 'redux/actions/users/getMyWallets';
import confirmTransaction from 'redux/actions/money-transfer/confirmTransaction';
import getSupportedCountries from 'redux/actions/countries/getSupportedCountries';

export default ({
  userData,
  walletList,
  selectedContact,
  selectedStore,
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

  const [contactPID, setContactPID] = React.useState();

  const [balanceOnWallet, setBalance] = useState(0.0);
  const [currency, setCurrency] = useState(null);
  const [destinationWallets, setDestinationWallets] = useState([]);
  const [countryCode, setCountryCode] = useState(null);
  const [targetCurrency, setTargetCurrencyCode] = useState(null);
  const [contacts, setallContacts] = useState([]);
  const [step, setStep] = useState(1);
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
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!walletList.length || walletList.length < 0) {
      getMyWallets()(dispatch);
    }
  }, [walletList]);

  useEffect(() => {
    setForm({ ...form, user1wallets: DefaultWallet });
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
      setStep(step + 1);
    }
  }, [confirmationData]);

  const resetState = () => {
    clearVoucherErrors()(dispatch);
  };

  useEffect(() => {
    setForm({ ...form, isRecurring: false });
    setForm({ ...form, sendNow: true });
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
      setErrors('The Transfer amount can not be zero');
      hasError = true;
    }
    if (parseFloat(balanceOnWallet, 10) === 0) {
      setErrors('The selected wallet has no funds');
      hasError = true;
      return true;
    }

    if (form.amount === '' || !form.amount) {
      setErrors('Please enter an amount.');
      hasError = true;
    }

    return hasError;
  };
  const checkTransactionConfirmation = () => {
    const data = {
      CountryCode: selectedContact.CountryCode,
      Amount: form.amount && form.amount.toString(),
      TargetCurrency: form.targetCurrency,
      TargetType: '1',
      SourceWallet: form.user1wallets,
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
      SourceWallet: form.user1wallets,
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
    setForm({ ...form, [name]: value });
  };
  const onChange = e => {
    e.persist();
    setForm({ ...form, [e.target.name]: e.target.checked });
  };

  const [currencyOptions, setCurrencyOptions] = useState([]);

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
    setStep(1);
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
    setStep,
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