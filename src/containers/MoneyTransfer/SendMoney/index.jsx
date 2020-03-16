import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import moveFunds, {
  clearMoveFundsErrors,
} from 'redux/actions/money-transfer/moveFunds';
import SendMoney from 'components/MoneyTransfer/SendMoney';
import getallContacts from 'redux/actions/contacts/getContactList';
import getMyWallets from 'redux/actions/users/getMyWallets';
import confirmTransaction from 'redux/actions/money-transfer/confirmTransaction';
import addTransactionContactToRecents from 'redux/actions/contacts/addTransactionContactToRecents';

const SendMoneyContainer = ({
  setSendMoneyOpen,
  sendMoneyOpen,
  destinationContact,
  setDestinationContact,
}) => {
  const { allContacts } = useSelector(state => state.contacts);
  const { walletList } = useSelector(state => state.user.myWallets);
  const { userData } = useSelector(({ user }) => user);
  const [contactPID, setContactPID] = React.useState();
  const [form, setForm] = useState({});
  const [balanceOnWallet, setBalance] = useState(0.0);
  const [currency, setCurrency] = useState(null);
  const [destinationWallets, setDestinationWallets] = useState([]);
  const [countryCode, setCountryCode] = useState(null);
  const [contacts, setallContacts] = useState([]);
  const [searchForm, setSearchForm] = useState({});
  const [step, setStep] = useState(1);

  const [errors, setErrors] = useState(null);
  const DefaultWallet = useSelector(
    state =>
      state.user.userData.data &&
      state.user.userData.data.DefaultWallet,
  );
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setForm({ ...form, user1wallets: DefaultWallet });
  }, [DefaultWallet, sendMoneyOpen]);

  const {
    checking,
    confirmationError,
    confirmationData,
  } = useSelector(state => state.moneyTransfer.confirmTransaction);
  const { data: recentContacts } = useSelector(
    state => state.contacts.activeContacts,
  );
  const { loading, error, data } = useSelector(
    state => state.moneyTransfer.moveFundsTo2UWallet,
  );
  useEffect(() => {
    if (confirmationData && confirmationData[0]) {
      setStep(step + 1);
    }
  }, [confirmationData]);

  const isNewContact = contact => {
    let exists = false;
    if (recentContacts) {
      recentContacts.forEach(element => {
        if (
          element.ContactPID.toLowerCase() ===
          contact.ContactPID.toLowerCase()
        ) {
          exists = true;
        }
      });
    }

    return exists;
  };

  const addRecentContact = contact => {
    if (!isNewContact(contact)) {
      addTransactionContactToRecents(destinationContact)(dispatch);
    }
  };

  useEffect(() => {
    if (data && data[0]) {
      addRecentContact(destinationContact);
      clearMoveFundsErrors()(dispatch);
    }
  }, [data]);

  const resetState = () => {
    clearMoveFundsErrors()(dispatch);
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
    if (
      searchForm.searchUsers &&
      searchForm.searchUsers.trim().length > 0
    ) {
      const filtered = contacts.filter(
        contact =>
          contact.FirstName.toLowerCase().startsWith(
            searchForm.searchUsers.toLowerCase(),
          ) ||
          contact.LastName.toLowerCase().startsWith(
            searchForm.searchUsers.toLowerCase(),
          ) ||
          contact.ContactPID.toLowerCase().startsWith(
            searchForm.searchUsers.toLowerCase(),
          ),
      );

      setallContacts(filtered);
    }
  }, [searchForm.searchUsers]);

  useEffect(() => {
    getMyWallets()(dispatch);
  }, []);
  const loadContacts = () => getallContacts()(dispatch);
  useEffect(() => {
    if (!allContacts.data) {
      loadContacts();
    }
  }, []);

  const getUserContactDetails = PID => {
    return (
      allContacts.data &&
      allContacts.data.find(contact => contact.ContactPID === PID)
    );
  };

  const isUsingDefaultWallet = () =>
    userData.data.DefaultWallet === form.user1wallets || false;

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
    if (form.user2wallets === '' || !form.user2wallets) {
      setErrors("Please choose the recipient's wallet.");
      hasError = true;
    }

    return hasError;
  };

  const checkTransactionConfirmation = () => {
    const data = {
      CountryCode: countryCode,
      Amount: form.amount,
      TargetCurrency: currency,
      TargetType: '1',
      SourceWallet: form.user1wallets,
    };
    setErrors(null);
    if (!validate()) {
      confirmTransaction(data)(dispatch);
    }
  };
  const onSubmit = () => {
    const filtered = contacts.filter(
      contact =>
        contact.FirstName.toLowerCase().startsWith(
          searchForm.searchUsers.toLowerCase(),
        ) ||
        contact.LastName.toLowerCase().startsWith(
          searchForm.searchUsers.toLowerCase(),
        ) ||
        contact.ContactPID.toLowerCase().startsWith(
          searchForm.searchUsers.toLowerCase(),
        ),
    );

    setallContacts(filtered);
  };

  const onSearchChange = (e, { name, value }) => {
    setSearchForm({ ...searchForm, [name]: value });
  };
  const { digit0, digit1, digit2, digit3 } = form;
  const PIN = `${digit0}${digit1}${digit2}${digit3}`;
  const pinIsValid = () => PIN.length === 4;
  const moveFundsToToUWallet = () => {
    const data = {
      PIN,
      CountryCode: countryCode,
      Amount: form.amount,
      ContactPID: contactPID,
      UseDefaultWallet: isUsingDefaultWallet() ? 'YES' : 'No',
      TargetWallet: form.user2wallets,
      SourceWallet: form.user1wallets,
      DateFrom: form.isRecurring && form.startDate,
      DateTo: form.isRecurring && form.endDate,
      Day: form.isRecurring ? form.day && form.day.toString() : '0',
      Reccurent: form.isRecurring ? 'YES' : 'No',
      SendNow: form.sendNow ? 'YES' : 'No',
      Reference: form.reference || '',
      Description: form.description || '',
    };

    if (!pinIsValid()) {
      setErrors('Please enter your 4 digit PIN Number');
      return;
    }
    if (form.isRecurring) {
      if (form.day === '' || !form.day) {
        setErrors('Please choose the repeat day in the month.');
        return;
      }
      if (form.startDate === '' || !form.startDate) {
        setErrors('Please choose the transaction start date');
        return;
      }
      if (form.endDate === '' || !form.endDate) {
        setErrors('Please choose the transaction end date');
        return;
      }
      if (form.startDate < new Date()) {
        setErrors(
          'Please choose a a start date that is today or later',
        );
        return;
      }

      if (form.endDate <= form.startDate) {
        setErrors(
          'Please choose an end date thats later than the start date',
        );
        return;
      }
    }

    setErrors(null);
    moveFunds(data)(dispatch);
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

  return (
    <SendMoney
      history={history}
      allContacts={allContacts}
      contacts={contacts}
      setErrors={setErrors}
      walletList={walletList}
      userData={userData}
      onChange={onChange}
      onOptionsChange={onOptionsChange}
      form={form}
      balanceOnWallet={balanceOnWallet}
      setBalance={setBalance}
      setForm={setForm}
      onSearchChange={onSearchChange}
      modalOpen={sendMoneyOpen}
      setOpen={setSendMoneyOpen}
      destinationWallets={destinationWallets}
      setDestinationContact={setDestinationContact}
      setDestinationWallets={destinationWallets}
      checkTransactionConfirmation={checkTransactionConfirmation}
      currency={currency}
      checking={checking}
      searchForm={searchForm}
      confirmationError={confirmationError}
      confirmationData={confirmationData}
      moveFundsToToUWallet={moveFundsToToUWallet}
      setContactPID={setContactPID}
      destinationContact={destinationContact}
      loading={loading}
      errors={errors}
      error={error}
      data={data}
      onSubmit={onSubmit}
      retryContacts={loadContacts}
      DefaultWallet={DefaultWallet}
      step={step}
      setStep={setStep}
      resetState={resetState}
    />
  );
};

SendMoneyContainer.propTypes = {
  setSendMoneyOpen: PropTypes.func.isRequired,
  sendMoneyOpen: PropTypes.bool.isRequired,
  destinationContact: PropTypes.objectOf(PropTypes.any).isRequired,
  setDestinationContact: PropTypes.func.isRequired,
};
export default SendMoneyContainer;
