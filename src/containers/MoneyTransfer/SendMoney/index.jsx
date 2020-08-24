/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import moveFunds, {
  clearMoveFundsErrors,
} from 'redux/actions/moneyTransfer/moveFunds';
import SendMoney from 'components/MoneyTransfer/SendMoney';
import getallContacts from 'redux/actions/contacts/getContactList';
import getMyWallets from 'redux/actions/users/getMyWallets';
import confirmTransaction from 'redux/actions/moneyTransfer/confirmTransaction';
import { updateMoneyTransferStep } from 'redux/actions/dashboard/dashboard';
import { CELINE_MONEY } from 'constants/general';

const SendMoneyContainer = ({
  setSendMoneyOpen,
  sendMoneyOpen,
  destinationContact,
  setDestinationContact,
  isSendingMoney,
}) => {
  const { allContacts } = useSelector(state => state.contacts);
  const { walletList } = useSelector(state => state.user.myWallets);
  const { userData } = useSelector(({ user }) => user);
  const [contactPID, setContactPID] = React.useState({});
  const [form, setForm] = useState({});
  const [balanceOnWallet, setBalance] = useState(0.0);
  const [currency, setCurrency] = useState(null);
  const [destinationWallets, setDestinationWallets] = useState([]);
  const [countryCode, setCountryCode] = useState(null);
  const [targetCurrency, setTargetCurrencyCode] = useState(null);
  const [contacts, setallContacts] = useState([]);

  const {
    moneyTransfer: { step },
  } = useSelector(state => state.dashboard);

  const [errors, setErrors] = useState(null);
  const DefaultWallet = useSelector(
    state =>
      state.user.userData.data &&
      state.user.userData.data.DefaultWallet,
  );
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!walletList.length) {
      getMyWallets()(dispatch);
    }
  }, [walletList]);

  useEffect(() => {
    setForm({ ...form, sourceWallet: DefaultWallet });
  }, [DefaultWallet, sendMoneyOpen]);

  const {
    checking,
    confirmationError,
    confirmationData,
  } = useSelector(state => state.moneyTransfer.confirmTransaction);
  const { loading, error, data } = useSelector(
    state => state.moneyTransfer.moveFundsTo2UWallet,
  );
  const [shouldClear, setShouldClear] = useState(false);

  useEffect(() => {
    if (error) {
      if (error && error[0].UserLoginCorrect === 'FALSE') {
        setShouldClear(true);
      }
    }
  }, [error]);

  useEffect(() => {
    if (confirmationData && confirmationData[0]) {
      updateMoneyTransferStep(2)(dispatch);
    }
  }, [confirmationData]);

  useEffect(() => {
    if (data && data[0]) {
      getMyWallets()(dispatch);
      if (data[0].type !== 'send-money')
        toast.success(global.translate(data[0].Description));
      setForm({});
      clearMoveFundsErrors()(dispatch);
    }
  }, [data]);

  const resetState = () => {
    clearMoveFundsErrors()(dispatch);
    updateMoneyTransferStep(1)(dispatch);
  };

  useEffect(() => {
    setForm({ ...form, isRecurring: false });
    setForm({ ...form, sendNow: true });
  }, [confirmationData]);

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
      const contactWallets = contacts?.find(contact => {
        return contact.ContactPID === destinationContact.ContactPID;
      });
      const contactWallet =
        contactWallets?.Wallets &&
        contactWallets?.Wallets?.find(
          wallet => wallet.WalletNumber === form.user2wallets,
        );
      setTargetCurrencyCode(
        (contactWallet && contactWallet.Currency) || '',
      );
    }
  }, [form.user2wallets]);

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
    userData.data.DefaultWallet === form.sourceWallet || false;

  const validate = () => {
    let hasError = false;
    if (parseFloat(form.amount, 10) === 0) {
      setErrors(global.translate('The amount cannot be zero'));
      hasError = true;
    }
    if (parseFloat(form.amount, 10) < 0) {
      setErrors(
        global.translate('The amount cannot be less than zero'),
      );
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
    if (form.user2wallets === '' || !form.user2wallets) {
      setErrors(
        global.translate(
          'Please provide the target wallet number.',
          437,
        ),
      );
      hasError = true;
    }

    return hasError;
  };

  const checkTransactionConfirmation = () => {
    const data = {
      CountryCode: countryCode,
      Amount: form.amount && form.amount.toString(),
      TargetCurrency:
        targetCurrency ||
        (form.user2wallets && form.user2wallets.substr(0, 3)),
      TargetType: CELINE_MONEY,
      SourceWallet: form.sourceWallet,
    };
    setErrors(null);
    if (!validate()) {
      confirmTransaction(data)(dispatch);
    }
  };

  const { digit0, digit1, digit2, digit3 } = form;
  const PIN = `${digit0}${digit1}${digit2}${digit3}`;

  const pinIsValid = () => PIN.length === 4;
  const moveFundsToToUWallet = () => {
    const data = {
      PIN,
      CountryCode: countryCode,
      Amount: form.amount && form.amount.toString(),
      ContactPID: contactPID,
      UseDefaultWallet: isUsingDefaultWallet() ? 'YES' : 'No',
      TargetWallet: form.user2wallets,
      SourceWallet: form.sourceWallet,
      DateFrom: (form.isRecurring && form.startDate) || '',
      DateTo: (form.isRecurring && form.endDate) || '',
      Day: form.isRecurring ? form.day && form.day.toString() : '0',
      Reccurent: form.isRecurring ? 'YES' : 'No',
      SendNow: form.sendNow ? 'YES' : 'No',
      Reference: form.reference || '',
      Description: form.description || '',
    };

    if (!pinIsValid()) {
      setErrors(
        global.translate('Please provide your PIN number.', 543),
      );
      return;
    }
    if (form.isRecurring) {
      if (form.day === '' || !form.day) {
        setErrors(
          global.translate(
            'Please provide the payment day of the month.',
            1290,
          ),
        );
        return;
      }
      if (form.startDate === '' || !form.startDate) {
        setErrors(
          global.translate('Please provide the starting date', 1288),
        );
        return;
      }
      if (form.endDate === '' || !form.endDate) {
        setErrors(
          global.translate('Please provide the ending date', 1289),
        );
        return;
      }

      if (form.endDate <= form.startDate) {
        setErrors(
          global.translate(
            'Please choose an end date thats later than the start date',
            2076,
          ),
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
    if (form.sourceWallet && walletList) {
      const walletData =
        walletList &&
        walletList.find(
          item => item.AccountNumber === form.sourceWallet,
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

  return (
    <SendMoney
      history={history}
      allContacts={allContacts}
      contacts={contacts}
      setErrors={setErrors}
      walletList={walletList}
      userData={userData}
      onOptionsChange={onOptionsChange}
      form={form}
      balanceOnWallet={balanceOnWallet}
      setBalance={setBalance}
      setForm={setForm}
      modalOpen={sendMoneyOpen}
      setOpen={setSendMoneyOpen}
      destinationWallets={destinationWallets}
      setDestinationContact={setDestinationContact}
      setDestinationWallets={destinationWallets}
      checkTransactionConfirmation={checkTransactionConfirmation}
      currency={currency}
      checking={checking}
      confirmationError={confirmationError}
      confirmationData={confirmationData}
      moveFundsToToUWallet={moveFundsToToUWallet}
      setContactPID={setContactPID}
      destinationContact={destinationContact}
      loading={loading}
      errors={errors}
      error={error}
      data={data}
      retryContacts={loadContacts}
      DefaultWallet={DefaultWallet}
      step={step}
      resetState={resetState}
      shouldClear={shouldClear}
      isSendingMoney={isSendingMoney}
      setShouldClear={setShouldClear}
    />
  );
};

SendMoneyContainer.propTypes = {
  setSendMoneyOpen: PropTypes.func.isRequired,
  sendMoneyOpen: PropTypes.bool.isRequired,
  destinationContact: PropTypes.objectOf(PropTypes.any).isRequired,
  setDestinationContact: PropTypes.func.isRequired,
  isSendingMoney: PropTypes.bool.isRequired,
};
export default SendMoneyContainer;
