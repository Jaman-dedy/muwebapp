/* eslint-disable react-hooks/exhaustive-deps */
import { CASH_OUT } from 'constants/general';
import SendCashModal from 'components/MoneyTransfer/sendCash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearFoundUser } from 'redux/actions/contacts/locateUser';
import getSupportedCountries from 'redux/actions/countries/getSupportedCountries';
import { updateMoneyTransferStep } from 'redux/actions/dashboard/dashboard';
import confirmTransaction from 'redux/actions/moneyTransfer/confirmTransaction';
import modifyCash, {
  clearModifyCash,
} from 'redux/actions/moneyTransfer/modifyCash';
import moveFunds, {
  clearMoveFundsErrors,
} from 'redux/actions/moneyTransfer/moveFunds';
import getUnpaidCashList from 'redux/actions/transactions/getUnpaidCashList';
import getMyWallets from 'redux/actions/users/getMyWallets';
import getUserLocationData from 'redux/actions/users/userLocationData';
import countryCodes from 'utils/countryCodes';
import formatNumber from 'utils/formatNumber';
import cancelOrEditOther from 'redux/actions/transactions/cancelOrEditOther';

/* eslint-disable react-hooks/exhaustive-deps */
const SendCashContainer = ({
  open,
  setOpen,
  isSendingCash,
  destinationContact,
  userData,
  setDestinationContact,
  isEditing,
  setOptionsOpen,
  setIsEditing,
  transactionType,
  EditSendToOther,
}) => {
  const [form, setForm] = useState({});
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
    moneyTransfer: { step },
  } = useSelector(state => state.dashboard);

  const {
    loading: updating,
    data: updatingData,
    error: updatingError,
  } = useSelector(state => state.transactions.modifyCash);
  const {
    loading: loadingOther,
    data: otherData,
    error: otherError,
  } = useSelector(state => state.transactions.editOrCancelOther);

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

  const { data: usersData } = useSelector(
    state => state.user.userData,
  );

  const {
    language: { preferred },
  } = useSelector(state => state.user);

  const preferredLanguage = preferred === 'fr' ? preferred : 'en';

  useEffect(() => {
    if (usersData) {
      const { Balance, Currency } = usersData;
      setBalance(
        `${formatNumber(Balance, {
          locales:
            usersData.Language !== '' ? usersData.Language : 'en',
        })} ${Currency}`,
      );
      setCurrency(Currency);
    }
  }, [usersData, open]);

  useEffect(() => {
    if (!isEditing) {
      setForm({ ...form, sourceWallet: usersData?.DefaultWallet });
    }
  }, [isEditing, usersData, open]);

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
    if (
      confirmationData &&
      confirmationData[0] &&
      !confirmationData?.[0]?.TargetAccountVerified
    ) {
      updateMoneyTransferStep(2)(dispatch);
    }
  }, [confirmationData]);

  useEffect(() => {
    setForm({
      ...form,
      CountryCode: userLocationData.CountryCode.toUpperCase(),
    });
  }, [userLocationData]);

  useEffect(() => {
    if (!walletList.length) {
      getMyWallets()(dispatch);
    }
  }, []);

  useEffect(() => {
    if (!appCountries) {
      getSupportedCountries()(dispatch);
    }
  }, []);

  useEffect(() => {
    if (form.sourceWallet && walletList.length) {
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
  }, [walletList, form]);

  const onOptionsChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    let hasError = false;
    if (parseFloat(form.amount, 10) === 0 && !isEditing) {
      setErrors(global.translate('The amount cannot be zero', 2074));
      hasError = true;
    }
    if (parseFloat(form.amount, 10) < 0 && !isEditing) {
      setErrors(
        global.translate('The amount cannot be less than zero'),
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
        clearModifyCash()(dispatch);
        setForm({});
        updateMoneyTransferStep(1)(dispatch);
        setOptionsOpen(false);
        setOpen(false);
        setIsEditing(false);
      }
    }
  }, [updatingData]);
  useEffect(() => {
    if (otherData && otherData.length) {
      clearModifyCash()(dispatch);
      setForm({});
      updateMoneyTransferStep(1)(dispatch);
      setOptionsOpen(false);
      setOpen(false);
      setIsEditing(false);
    }
  }, [otherData]);

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

  useEffect(() => {
    setForm({ ...form, isRecurring: false });
    setForm({ ...form, sendNow: false });
  }, [confirmationData]);

  useEffect(() => {
    if (data && data[0]) {
      getUnpaidCashList()(dispatch);
      getMyWallets()(dispatch);
      setForm({
        destCurrency: defaultDestinationCurrency,
      });
      clearMoveFundsErrors()(dispatch);
      clearFoundUser()(dispatch);
    }
  }, [data]);
  const resetState = () => {
    if (!isTopingUp && !isSendingOthers) {
      clearMoveFundsErrors()(dispatch);
      updateMoneyTransferStep(1)(dispatch);
    }
  };
  const checkTransactionConfirmation = () => {
    if (!form.sourceWallet) {
      setForm({ ...form, sourceWallet: usersData.DefaultWallet });
    }

    const data = {
      CountryCode: form.CountryCode,
      Amount: form.amount && form.amount.toString(),
      TargetCurrency: form.destCurrency,
      TargetType: CASH_OUT,
      SourceWallet: form.sourceWallet || usersData.DefaultWallet,
    };

    setErrors(null);
    if (!validate()) {
      if (isEditing) {
        updateMoneyTransferStep(2)(dispatch);
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

      DateFrom: (form.isRecurring && form.startDate) || '',
      DateTo: (form.isRecurring && form.endDate) || '',
      Day: form.isRecurring ? form.day && form.day.toString() : '0',
      Reccurent: form.isRecurring ? 'YES' : 'NO',
      SendNow: form.isRecurring && form.sendNow ? 'NO' : 'YES',
      Reference: form.reference || '',
      Description: form.description || '',
      TargetType: CASH_OUT,
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
            'Please choose an end date that is later than the start date',
            2076,
          ),
        );
        return;
      }
    }
    setErrors(null);

    if (isEditing && !EditSendToOther) {
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
    }

    if (EditSendToOther) {
      const {
        TransferNumber,
        TransactionID,
        OperatorID,
      } = destinationContact;
      const data = {
        TransferNumber,
        TransactionID,
        TargetPhoneNumber: form?.phoneNumber,
        DestFirstName: form?.firstName,
        DestLastName: form?.lastName,
        OperatorID,
        PIN,
        Cancel: 'No',
        Modify: 'Yes',
      };
      cancelOrEditOther(data)(dispatch);
    }
    if (!isEditing) {
      moveFunds(data, '/SendCash', 'send-cash')(dispatch)(data => {
        toast.success(global.translate(data?.Description));
      });
    }
  };

  return (
    <SendCashModal
      open={open}
      setOpen={setOpen}
      setForm={setForm}
      DefaultWallet={usersData?.DefaultWallet}
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
      preferredLanguage={preferredLanguage}
      loadingOther={loadingOther}
      otherData={otherData}
      otherError={otherError}
    />
  );
};

SendCashContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  isSendingCash: PropTypes.bool.isRequired,
  destinationContact: PropTypes.objectOf(PropTypes.any),
  userData: PropTypes.instanceOf(PropTypes.object),
  setDestinationContact: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
  setOptionsOpen: PropTypes.func,
  setIsEditing: PropTypes.func,
  transactionType: PropTypes.string,
  EditSendToOther: PropTypes.bool,
};

SendCashContainer.defaultProps = {
  isEditing: false,
  destinationContact: null,
  userData: null,
  setOptionsOpen: () => {},
  setIsEditing: () => {},
  transactionType: 'CASH_TRANSACTION',
  EditSendToOther: false,
};
export default SendCashContainer;
