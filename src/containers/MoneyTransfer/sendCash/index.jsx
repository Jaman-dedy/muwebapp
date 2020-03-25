import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import SendCashModal from 'components/MoneyTransfer/sendCash';
import moveFunds, {
  clearMoveFundsErrors,
} from 'redux/actions/money-transfer/moveFunds';
import confirmTransaction from 'redux/actions/money-transfer/confirmTransaction';
import addNewContact from 'redux/actions/contacts/addNewContact';
import { clearFoundUser } from 'redux/actions/contacts/locateUser';
import countryCodes from 'utils/countryCodes';
import getSupportedCountries from 'redux/actions/countries/getSupportedCountries';

import getUserLocationData from 'redux/actions/users/userLocationData';

const SendCashContainer = ({
  open,
  setOpen,
  isSendingCash,
  destinationContact,
  userData,
  DefaultWallet,
  setDestinationContact,
}) => {
  const [form, setForm] = useState({});
  const [step, setStep] = useState(1);
  const [phonePrefix, setPhonePrefix] = useState('');

  const [errors, setErrors] = useState(null);
  const { walletList } = useSelector(state => state.user.myWallets);
  const [balanceOnWallet, setBalance] = useState(0.0);
  const [currency, setCurrency] = useState(null);

  const [currentOption, setCurrentOption] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    checking,
    confirmationError,
    confirmationData,
  } = useSelector(state => state.moneyTransfer.confirmTransaction);

  const {
    supportedCountries: { data: appCountries },
  } = useSelector(({ countries }) => countries);

  const { userLocationData } = useSelector(({ user }) => user);

  const { loading, error, data } = useSelector(
    state => state.moneyTransfer.moveFundsTo2UWallet,
  );

  useEffect(() => {
    if (userLocationData.CountryCode === '') {
      getUserLocationData()(dispatch);
    }
  }, [userLocationData.CountryCode]);

  useEffect(() => {
    setCurrentOption(
      appCountries &&
        appCountries.find(
          c =>
            c.CountryCode.toUpperCase() ===
            userLocationData.CountryCode.toUpperCase(),
        ),
    );
  }, [appCountries, userLocationData, data && data[0]]);

  useEffect(() => {
    if (confirmationData && confirmationData[0]) {
      setStep(step + 1);
    }
  }, [confirmationData]);

  useEffect(() => {
    setForm({
      ...form,
      CountryCode: userLocationData.CountryCode.toUpperCase(),
    });
  }, [userLocationData]);

  useEffect(() => {
    if (destinationContact) {
      setForm({ ...form, firstName: destinationContact.FirstName });
      setForm({
        ...form,
        phoneNumber: destinationContact.PhoneNumber,
      });
    }
  }, [destinationContact]);

  useEffect(() => {
    setForm({
      ...form,
      lastName: destinationContact && destinationContact.LastName,
    });
  }, [form.firstName]);

  useEffect(() => {
    if (destinationContact) {
      setForm({
        ...form,
        phoneNumber: destinationContact.PhoneNumber,
      });
    }
  }, [form.lastName]);
  useEffect(() => {
    setForm({ ...form, user1wallets: DefaultWallet });
  }, [DefaultWallet, open]);

  useEffect(() => {
    getSupportedCountries()(dispatch);
  }, []);

  useEffect(() => {
    if (data && data[0]) {
      clearMoveFundsErrors()(dispatch);
      clearFoundUser()(dispatch);
    }
  }, [data]);

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
  const balanceData = useSelector(state => state.user.userData.data);

  useEffect(() => {
    if (balanceData) {
      setBalance(balanceData.Balance);
    }
  }, [balanceData]);

  const onOptionsChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };
  const onChange = e => {
    e.persist();
    setForm({ ...form, [e.target.name]: e.target.checked });
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
    if (form.lastName === '' || !form.lastName) {
      setErrors('Please enter the recipient Last Name.');
      hasError = true;
    }
    if (form.firstName === '' || !form.firstName) {
      setErrors('Please enter the recipient First Name.');
      hasError = true;
    }
    if (form.phoneNumber === '' || !form.phoneNumber) {
      setErrors('Please enter the recipient Phone Number.');
      hasError = true;
    }
    return hasError;
  };

  const externalContactData = {
    CountryCode:
      form.CountryCode ||
      (currentOption && currentOption.CountryCode),
    DestPhoneNum: form.phoneNumber,
    Currency: currency,
    FirstName: form.firstName,
    LastName: form.lastName,
    PhonePrefix: phonePrefix,
    PhoneNumber:
      phonePrefix && phonePrefix.replace('+', '') + form.phoneNumber,
    Phone: form.phoneNumber,
  };

  const contactExists = () => destinationContact !== null;

  const resetState = () => {
    clearMoveFundsErrors()(dispatch);
  };
  const checkTransactionConfirmation = () => {
    const data = {
      CountryCode: form.CountryCode,
      Amount: form.amount && form.amount.toString(),
      TargetCurrency: currency,
      TargetType: '9',
      SourceWallet: form.user1wallets,
    };
    setErrors(null);
    if (!validate()) {
      confirmTransaction(data)(dispatch);
    }
  };
  const getCountryCode = prefix => {
    countryCodes.filter(country => {
      if (country.value === prefix) {
        return country.text.toUpperCase();
      }
      return prefix.replace('+', '');
    });
  };
  useEffect(() => {
    if (phonePrefix) {
      getCountryCode(phonePrefix);
    }
  }, [phonePrefix]);

  const { digit0, digit1, digit2, digit3 } = form;
  const PIN = `${digit0}${digit1}${digit2}${digit3}`;
  const pinIsValid = () => PIN.length === 4;
  const moveFundsToToUWallet = () => {
    const data = {
      PIN,
      Amount: form.amount && form.amount.toString(),
      SourceNumber: form.user1wallets,
      DateFrom: (form.isRecurring && form.startDate) || '',
      DateTo: (form.isRecurring && form.endDate) || '',
      Day: form.isRecurring ? form.day && form.day.toString() : '0',
      Reccurent: form.isRecurring ? 'YES' : 'NO',
      SendNow: form.sendNow ? 'YES' : 'NO',
      Reference: form.reference || '',
      Description: form.description || '',
      TargetType: '9',
      TargetPhoneNumber: (phonePrefix + form.phoneNumber).replace(
        '+',
        '',
      ),
      FirstName: form.firstName,
      LastName: form.lastName,
      SourceWallet: form.user1wallets,
      DestCountryCode:
        form.CountryCode ||
        (currentOption && currentOption.CountryCode),
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
    if (!contactExists()) {
      addNewContact(
        externalContactData,
        '/AddToExternalContact',
      )(dispatch);
    }

    moveFunds(data, '/SendCash')(dispatch);
  };
  return (
    <SendCashModal
      open={open}
      setOpen={setOpen}
      setForm={setForm}
      DefaultWallet={DefaultWallet}
      form={form}
      isSendingCash={isSendingCash}
      destinationContact={destinationContact}
      userData={userData}
      history={history}
      walletList={walletList}
      onChange={onChange}
      onOptionsChange={onOptionsChange}
      balanceOnWallet={balanceOnWallet}
      checkTransactionConfirmation={checkTransactionConfirmation}
      currency={currency}
      checking={checking}
      confirmationError={confirmationError}
      confirmationData={confirmationData}
      moveFundsToToUWallet={moveFundsToToUWallet}
      loading={loading}
      error={error}
      data={data}
      userLocationData={userLocationData}
      setBalance={setBalance}
      setDestinationContact={setDestinationContact}
      errors={errors}
      setErrors={setErrors}
      step={step}
      setStep={setStep}
      phonePrefix={phonePrefix}
      setPhonePrefix={setPhonePrefix}
      resetState={resetState}
      appCountries={appCountries}
      currentOption={currentOption}
      setCurrentOption={setCurrentOption}
    />
  );
};

SendCashContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  isSendingCash: PropTypes.bool.isRequired,
  destinationContact: PropTypes.instanceOf(PropTypes.object)
    .isRequired,
  userData: PropTypes.instanceOf(PropTypes.object).isRequired,
  DefaultWallet: PropTypes.string.isRequired,
  setDestinationContact: PropTypes.func.isRequired,
};
export default SendCashContainer;
