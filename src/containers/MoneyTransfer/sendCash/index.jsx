import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import SendCashModal from 'components/MoneyTransfer/sendCash';
import moveFunds, {
  clearMoveFundsErrors,
} from 'redux/actions/money-transfer/moveFunds';
import confirmTransaction from 'redux/actions/money-transfer/confirmTransaction';
import addNewContact from 'redux/actions/contacts/addNewContact';
import { clearFoundUser } from 'redux/actions/contacts/locateUser';
import countryCodes from 'utils/countryCodes';
import getSupportedCountries from 'redux/actions/countries/getSupportedCountries';
import getMyWallets from 'redux/actions/users/getMyWallets';
import getUserLocationData from 'redux/actions/users/userLocationData';
import modifyCash, {
  clearModifyCash,
} from 'redux/actions/money-transfer/modifyCash';
import getUnpaidCashList from 'redux/actions/transactions/getUnpaidCashList';
import getRecentActiveExternalContacts from 'redux/actions/contacts/getRecentActiveExternalContacts';
import getRecentActiveContacts from 'redux/actions/contacts/getRecentActiveContacts';

const SendCashContainer = ({
  open,
  setOpen,
  isSendingCash,
  destinationContact,
  userData,
  DefaultWallet,
  setDestinationContact,
  isEditing,
  setOptionsOpen,
  setIsEditing,
  transactionType,
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
    loading: updating,
    data: updatingData,
    error: updatingError,
  } = useSelector(state => state.transactions.modifyCash);
  const { isTopingUp, isSendingOthers } = useSelector(
    state => state.dashboard.contactActions,
  );
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
  }, []);

  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [
    defaultDestinationCurrency,
    setDefaultDestinationCurrency,
  ] = useState(null);

  useEffect(() => {
    if (form.CountryCode && form.CountryCode !== '') {
      const userCountry =
        appCountries &&
        appCountries.find(
          c => c.CountryCode.toUpperCase() === form.CountryCode,
        );
      if (userCountry) {
        setCurrentOption(userCountry);
        setCurrencyOptions(userCountry.Currencies);
        setDefaultDestinationCurrency(userCountry.MainCurrency);
      }
    } else {
      const userCountry =
        appCountries &&
        appCountries.find(
          c =>
            c.CountryCode.toUpperCase() ===
            userLocationData.CountryCode.toUpperCase(),
        );
      if (userCountry) {
        setCurrentOption(userCountry);
        setCurrencyOptions(userCountry.Currencies);
        setDefaultDestinationCurrency(userCountry.MainCurrency);
      }
    }
  }, [appCountries, userLocationData, form]);

  useEffect(() => {
    if (destinationContact) {
      setDefaultDestinationCurrency(destinationContact.Currency);
    }
  }, [destinationContact]);

  useEffect(() => {
    if (defaultDestinationCurrency) {
      setForm({ ...form, destCurrency: defaultDestinationCurrency });
    }
  }, [defaultDestinationCurrency]);

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
    if (walletList.length === 0) {
      getMyWallets()(dispatch);
    }
  }, [walletList]);

  useEffect(() => {
    if (!isEditing) {
      setForm({ ...form, sourceWallet: DefaultWallet });
    }
  }, [DefaultWallet, open, isEditing]);

  useEffect(() => {
    getSupportedCountries()(dispatch);
  }, []);
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

  const validate = () => {
    let hasError = false;
    if (parseFloat(form.amount, 10) === 0 && !isEditing) {
      setErrors(
        global.translate('The Transfer amount can not be zero'),
      );
      hasError = true;
    }
    if (parseFloat(balanceOnWallet, 10) === 0 && !isEditing) {
      setErrors(
        global.translate(
          'You do not have enough money in this wallet for this operation',
          394,
        ),
      );
      hasError = true;
      return true;
    }

    if ((form.amount === '' || !form.amount) && !isEditing) {
      setErrors(
        global.translate(
          'You must enter the amount for this operation.',
          393,
        ),
      );
      hasError = true;
    }
    if (!destinationContact || isEditing) {
      if (form.lastName === '' || !form.lastName) {
        setErrors(
          global.translate(
            'Please provide the recipient’s first and last names',
            762,
          ),
        );
        hasError = true;
      }
      if (form.firstName === '' || !form.firstName) {
        setErrors(
          global.translate(
            'Please provide the recipient’s first and last names',
            762,
          ),
        );
        hasError = true;
      }
      if (form.phoneNumber === '' || !form.phoneNumber) {
        setErrors(
          global.translate(
            'Please provide the recipient phone number.',
            1123,
          ),
        );
        hasError = true;
      }
    }

    return hasError;
  };

  useEffect(() => {
    if (updatingData && updatingData.data) {
      if (updatingData.data[0]) {
        toast.success(
          global.translate(updatingData.data[0].Description),
        );
        clearModifyCash()(dispatch);
        setForm({});
        setStep(1);
        setOptionsOpen(false);
        setOpen(false);
        setIsEditing(false);
      }
    }
  }, [updatingData]);
  useEffect(() => {
    if (destinationContact) {
      const {
        FirstName: firstName,
        LastName: lastName,
        PhoneNumber: phoneNumber,
        SecurityCode: securityCode,
        TransferNumber: voucherNumber,
        SourceAccountNumber: sourceWallet,
        Phone: phone,
        CountryCode: countryCode,
      } = destinationContact;

      if (isEditing) {
        setForm({
          ...form,
          firstName,
          lastName,
          voucherNumber,
          securityCode,
          phoneNumber: phone,
          countryCode,
          sourceWallet,
          phone,
        });
      } else {
        setForm({
          ...form,
          firstName,
          lastName,
          phoneNumber,
        });
      }
    }
  }, [destinationContact]);

  const externalContactData = {
    CountryCode:
      form.CountryCode ||
      (currentOption && currentOption.CountryCode),
    DestPhoneNum:
      phonePrefix && phonePrefix.replace('+', '') + form.phoneNumber,
    Currency: currency,
    FirstName: form.firstName,
    LastName: form.lastName,
    PhonePrefix: phonePrefix,
    PhoneNumber:
      phonePrefix && phonePrefix.replace('+', '') + form.phoneNumber,
    Phone: form.phoneNumber,
  };

  useEffect(() => {
    setForm({ ...form, isRecurring: false });
    setForm({ ...form, sendNow: true });
  }, [confirmationData]);

  const contactExists = () => destinationContact !== null;

  const getRecentContacts = () => {
    const params = {
      PID: userData.data && userData.data.PID,
      MaxRecordsReturned: '8',
    };
    if (isSendingCash) {
      getRecentActiveExternalContacts(params)(dispatch);
    } else {
      getRecentActiveContacts(params)(dispatch);
    }
  };

  useEffect(() => {
    if (data && data[0]) {
      getUnpaidCashList()(dispatch);
      getMyWallets()(dispatch);

      setForm({
        destCurrency: defaultDestinationCurrency,
      });
      if (!contactExists()) {
        if (!form.addToContact) {
          addNewContact(
            externalContactData,
            '/AddToExternalContact',
          )(dispatch);
        }
      }
      clearMoveFundsErrors()(dispatch);
      clearFoundUser()(dispatch);
      getRecentContacts();
    }
  }, [data]);
  const resetState = () => {
    if (!isTopingUp && !isSendingOthers) {
      clearMoveFundsErrors()(dispatch);
    }
  };
  const checkTransactionConfirmation = () => {
    const data = {
      CountryCode: form.CountryCode,
      Amount: form.amount && form.amount.toString(),
      TargetCurrency: form.destCurrency,
      TargetType: '9',
      SourceWallet: form.sourceWallet,
    };
    setErrors(null);
    if (!validate()) {
      if (isEditing) {
        setStep(step + 1);
      } else {
        confirmTransaction(data)(dispatch);
      }
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
      SourceNumber: form.sourceWallet,
      DateFrom: (form.isRecurring && form.startDate) || '',
      DateTo: (form.isRecurring && form.endDate) || '',
      Day: form.isRecurring ? form.day && form.day.toString() : '0',
      Reccurent: form.isRecurring ? 'YES' : 'NO',
      SendNow: form.sendNow ? 'YES' : 'NO',
      Reference: form.reference || '',
      Description: form.description || '',
      TargetType: '9',
      TargetPhoneNumber: destinationContact
        ? destinationContact.PhoneNumber
        : (phonePrefix + form.phoneNumber).replace('+', ''),
      FirstName:
        form.firstName ||
        (destinationContact && destinationContact.FirstName),
      LastName: form.lastName || destinationContact.LastName,
      PhonePrefix: phonePrefix || destinationContact.PhonePrefix,
      SourceWallet: form.sourceWallet,
      DestCountryCode:
        form.CountryCode ||
        (destinationContact && destinationContact.CountryCode) ||
        (currentOption && currentOption.CountryCode),
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
          ),
        );
        return;
      }
    }
    setErrors(null);

    if (isEditing) {
      const regex = / | + /gi;
      modifyCash({
        PIN,
        SecurityCode:
          form.securityCode || destinationContact.SecurityCode,
        VoucherNumber:
          form.voucherNumber || destinationContact.TransferNumber,
        TargetPhoneNumber: (
          phonePrefix + form.phoneNumber.replace(regex, '')
        ).replace('+', ''),
        FirstName: form.firstName,
        LastName: form.lastName,
        CountryCode:
          form.countryCode || destinationContact.CountryCode,
      })(dispatch);
    } else {
      moveFunds(data, '/SendCash', 'send-cash')(dispatch);
    }
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
      isEditing={isEditing}
      updating={updating}
      updatingError={updatingError}
      updatingData={updatingData}
      currencyOptions={currencyOptions}
      defaultDestinationCurrency={defaultDestinationCurrency}
      transactionType={transactionType}
    />
  );
};

SendCashContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  isSendingCash: PropTypes.bool.isRequired,
  destinationContact: PropTypes.objectOf(PropTypes.any),
  userData: PropTypes.instanceOf(PropTypes.object),
  DefaultWallet: PropTypes.string.isRequired,
  setDestinationContact: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
  setOptionsOpen: PropTypes.func,
  setIsEditing: PropTypes.func,
  transactionType: PropTypes.string,
};

SendCashContainer.defaultProps = {
  isEditing: false,
  destinationContact: null,
  userData: null,
  setOptionsOpen: () => {},
  setIsEditing: () => {},
  transactionType: 'CASH_TRANSACTION',
};
export default SendCashContainer;
