/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import getProvidersCountries from 'redux/actions/providers/getProvidersCountries';
import getUserLocationData from 'redux/actions/users/userLocationData';
import getProviders from 'redux/actions/providers/getProviders';
import getMyWallets from 'redux/actions/users/getMyWallets';
import getUnpaidCashList from 'redux/actions/transactions/getUnpaidCashList';
import tranferToOther, {
  clearTransferToOthersErrors,
} from 'redux/actions/money-transfer/transferToOthers';

import TopUpModal from 'components/MoneyTransfer/TopUp';
import confirmTransaction from 'redux/actions/money-transfer/confirmTransaction';
import countryCodes from 'utils/countryCodes';
import { updateMoneyTransferStep } from 'redux/actions/dashboard/dashboard';

const TopUpContainer = ({
  open,
  setOpen,
  isTopingUp,
  isSendingOthers,
  destinationContact,
  userData,
  setDestinationContact,
  transactionType,
  isSelfBuying,
  setIsSelfBuying,
}) => {
  const [form, setForm] = useState({});
  const [sourceWallet, setSourceWallet] = useState(null);
  const dispatch = useDispatch();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [providersListOption, setProvidersListOption] = useState(
    null,
  );
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [loadProviders, setLoadProviders] = useState(false);
  const [
    loadProvidersCountries,
    setLoadProvidersCountries,
  ] = useState(false);
  const [
    canSetProviderPlaceHolder,
    setCanSetProviderPlaceHolder,
  ] = useState(false);

  const {
    moneyTransfer: { step },
  } = useSelector(state => state.dashboard);
  const [phonePrefix, setPhonePrefix] = useState('');
  const [errors, setErrors] = useState(null);
  const { walletList } = useSelector(state => state.user.myWallets);
  const [balanceOnWallet, setBalance] = useState(0.0);
  const [currency, setCurrency] = useState(null);
  const [currencyOptions, setCurrencyOptions] = useState([]);

  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState(
    null,
  );
  const [
    defaultDestinationCurrency,
    setDefaultDestinationCurrency,
  ] = useState(null);
  const [
    canRefetchTopUpProviders,
    setCanRefetchTopUpProviders,
  ] = useState(false);
  const [
    canRefetchAllProviders,
    setCanRefetchAllProviders,
  ] = useState(false);
  const [toastMessage, setToasMessage] = useState(null);
  const history = useHistory();

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

  let OperationType;
  if (isTopingUp) {
    OperationType = 'TOPUP';
  }
  if (isSendingOthers) {
    OperationType = 'CASH';
  }

  const { userLocationData } = useSelector(({ user }) => user);
  const { providersCountries, providersList } = useSelector(
    ({ providersCountries }) => providersCountries,
  );
  const { loading, error, data } = useSelector(
    state => state.moneyTransfer.transferToOthers,
  );

  useEffect(() => {
    if (data) {
      setToasMessage(data[0].Description);
      setForm({});
      updateMoneyTransferStep(1)(dispatch);
      setOpen(false);
      clearTransferToOthersErrors()(dispatch);
    }
  }, [data]);

  useEffect(() => {
    if (toastMessage) {
      toast.success(toastMessage);
      setToasMessage(null);
    }
  }, [toastMessage]);

  useEffect(() => {
    setSourceWallet(userData.data?.DefaultWallet);
  }, [userData.data]);
  useEffect(() => {
    const actionType = isTopingUp
      ? {
          TopUp: 'Yes',
        }
      : { TopUp: 'No' };
    if (!providersCountries.data && isTopingUp) {
      getProvidersCountries(actionType)(dispatch);
      setCanRefetchAllProviders(true);
    }
    if (!providersCountries.data && isSendingOthers) {
      getProvidersCountries(actionType)(dispatch);
      setCanRefetchTopUpProviders(true);
    }
    if (canRefetchAllProviders && isSendingOthers) {
      getProvidersCountries(actionType)(dispatch);
      setCanRefetchTopUpProviders(true);
      setCanRefetchAllProviders(false);
    }
    if (canRefetchTopUpProviders && isTopingUp) {
      getProvidersCountries(actionType)(dispatch);
      setCanRefetchAllProviders(true);
      setCanRefetchTopUpProviders(false);
    }
  }, [isTopingUp, isSendingOthers]);

  useEffect(() => {
    if (!form.sourceWallet) {
      setForm({
        ...form,
        sourceWallet,
      });
    }
  }, [sourceWallet]);

  useEffect(() => {
    if (!userLocationData.data) {
      getUserLocationData()(dispatch);
    }
  }, []);

  const onOptionsChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    if (userData.data) {
      setForm({ ...form, sourceWallet: userData.data.DefaultWallet });
    }
  }, [userData.data]);

  useEffect(() => {
    const currentCountryOption =
      providersCountries.data &&
      providersCountries.data.find(({ CountryCode }) => {
        if (userLocationData.CountryCode) {
          return (
            CountryCode.toLowerCase() === userLocationData.CountryCode
          );
        }
      });
    setSelectedCountry(currentCountryOption);
  }, [providersCountries, userLocationData]);
  useEffect(() => {
    if (destinationContact) {
      setDefaultDestinationCurrency(destinationContact.Currency);
    }
  }, [destinationContact]);
  useEffect(() => {
    if (walletList.length === 0) {
      getMyWallets()(dispatch);
    }
  }, [walletList]);

  const validate = () => {
    let hasError = false;
    if (parseFloat(form.amount, 10) === 0) {
      setErrors(
        global.translate('The Transfer amount can not be zero', 1738),
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
    if (form.OperatorID === '' || !form.OperatorID) {
      setErrors(
        global.translate(
          'You must select a provider for this operation',
          1551,
        ),
      );
      hasError = true;
    }

    return hasError;
  };

  useEffect(() => {
    if (destinationContact) {
      const {
        FirstName: firstName,
        LastName: lastName,
        PhoneNumber: phoneNumber,
      } = destinationContact;
      setForm({
        ...form,
        firstName,
        lastName,
        phoneNumber,
      });
    }
  }, [destinationContact]);

  useEffect(() => {
    setForm({ ...form, isRecurring: false });
    setForm({ ...form, sendNow: true });
  }, [confirmationData]);

  useEffect(() => {
    if (confirmationData && confirmationData[0]) {
      updateMoneyTransferStep(2)(dispatch);
    }
  }, [confirmationData]);

  useEffect(() => {
    if (data && data[0]) {
      getUnpaidCashList()(dispatch);
      getMyWallets()(dispatch);
    }
  }, [data]);
  const resetState = () => {
    clearTransferToOthersErrors()(dispatch);
    updateMoneyTransferStep(1)(dispatch);
  };

  const checkTransactionConfirmation = () => {
    const data = {
      CountryCode: form.CountryCode,
      Amount: form.amount && form.amount.toString(),
      TargetCurrency: form.destCurrency,
      TargetType: form.Category,
      OperatorID: form.OperatorID,
      SourceWallet: form.sourceWallet || sourceWallet,
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
      Amount: form?.amount && form.amount.toString(),
      SourceNumber: form?.sourceWallet,
      DateFrom: (form?.isRecurring && form?.startDate) || '',
      DateTo: (form?.isRecurring && form?.endDate) || '',
      Day: form?.isRecurring
        ? form?.day && form?.day.toString()
        : '0',
      Reccurent: form?.isRecurring ? 'YES' : 'NO',
      SendNow: form?.sendNow ? 'YES' : 'NO',
      Reference: form?.reference || '',
      Description: form?.description || '',
      TargetType: form?.Category,
      TargetPhoneNumber: destinationContact
        ? destinationContact.PhoneNumber
        : (form?.phoneNumber).replace('+', ''),
      FirstName:
        form?.firstName ||
        (destinationContact && destinationContact.FirstName),
      LastName: form?.lastName || destinationContact.LastName,
      PhonePrefix: phonePrefix || destinationContact.PhonePrefix,
      SourceWallet: form?.sourceWallet,
      DestCountryCode:
        form?.CountryCode ||
        (destinationContact && destinationContact.CountryCode) ||
        (selectedCountry && selectedCountry.CountryCode),
      OperationID: form?.OperationID,
      DestCurrency: form?.destCurrency,
      OperationType,
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
    tranferToOther(data, '/TransferToOther', 'send-money')(dispatch);
  };

  useEffect(() => {
    if (selectedCountry) {
      const requestData = {
        CountryCode: selectedCountry.CountryCode.toLowerCase(),
      };
      getProviders(requestData)(dispatch);
    }
  }, [selectedCountry]);
  useEffect(() => {
    const newProvidersList = [];
    if (providersList.data) {
      providersList.data.map(providers => {
        if (providers.Category === '21' && isTopingUp) {
          newProvidersList.push(providers);
        }
        if (isSendingOthers) {
          newProvidersList.push(providers);
        }
      });

      setProvidersListOption(newProvidersList);
    }
  }, [providersList]);

  useEffect(() => {
    if (selectedCountry) {
      setForm({
        ...form,
        CountryCode: selectedCountry.CountryCode,
        destCurrency: selectedCountry.Currency,
      });
    }
  }, [selectedCountry, form.CountryCode]);

  useEffect(() => {
    if (selectedProvider) {
      setForm({
        ...form,
        OperatorID: selectedProvider.OperatorID,
        Category: selectedProvider.Category,
      });
    }
  }, [selectedProvider]);

  useEffect(() => {
    if (form.OperatorName && form.OperatorName !== '') {
      const provider =
        providersList.data &&
        providersList.data.find(
          provider =>
            provider.OperatorName === form.OperatorName &&
            provider.CountryCode === form.CountryCode,
        );
      if (provider) {
        setSelectedProvider(provider);
      }
    }
  }, [form]);

  useEffect(() => {
    if (providersList.loading) {
      setSelectedProvider(null);
      setLoadProviders(true);
    } else {
      setLoadProviders(false);
    }
  }, [providersList.loading]);

  useEffect(() => {
    if (providersCountries.loading) {
      setLoadProvidersCountries(true);
    } else {
      setLoadProvidersCountries(false);
    }
  }, [providersCountries.loading]);

  useEffect(() => {
    if (!selectedProvider) {
      setCanSetProviderPlaceHolder(true);
    } else {
      setCanSetProviderPlaceHolder(false);
    }
  }, [selectedProvider]);

  useEffect(() => {
    if (userData.data) {
      setSelectedPhoneNumber({
        Title: `+${userData.data.MainPhonePrefix} ${userData.data.MainPhoneNumber}`,
        Img: userData.data.MainPhoneFlag,
      });
    }
  }, [userData.data]);
  useEffect(() => {
    if (selectedPhoneNumber) {
      setForm({
        ...form,
        phoneNumber: selectedPhoneNumber.Title,
      });
    }
  }, [selectedPhoneNumber]);

  useEffect(() => {
    if (walletList.length && sourceWallet) {
      const defaultWalletData = walletList.find(item => {
        return item.AccountNumber === sourceWallet;
      });
      setBalance(
        `${defaultWalletData?.Balance} ${defaultWalletData?.CurrencyCode}`,
      );
      setForm({ ...form, sourceWallet });
      setCurrency(defaultWalletData?.CurrencyCode);
    }
  }, [sourceWallet, walletList]);

  useEffect(() => {
    if (walletList.length && form.sourceWallet) {
      const defaultWalletData = walletList.find(item => {
        return item.AccountNumber === form.sourceWallet;
      });
      setBalance(
        `${defaultWalletData?.Balance} ${defaultWalletData?.CurrencyCode}`,
      );
      setCurrency(defaultWalletData?.CurrencyCode);
    }
  }, [form.sourceWallet, walletList]);

  return (
    <TopUpModal
      open={open}
      setOpen={setOpen}
      setForm={setForm}
      form={form}
      isTopingUp={isTopingUp}
      isSendingOthers={isSendingOthers}
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
      appCountries={providersCountries.data}
      currentOption={selectedCountry}
      setCurrentOption={setSelectedCountry}
      updating={updating}
      updatingError={updatingError}
      updatingData={updatingData}
      currencyOptions={currencyOptions}
      defaultDestinationCurrency={defaultDestinationCurrency}
      transactionType={transactionType}
      providersListOption={providersListOption && providersListOption}
      currentProviderOption={selectedProvider}
      setCurrentProviderOption={setSelectedProvider}
      loadProvidersList={loadProviders}
      loadProvidersCountries={loadProvidersCountries}
      canSetProviderPlaceHolder={canSetProviderPlaceHolder}
      isSelfBuying={isSelfBuying}
      setIsSelfBuying={setIsSelfBuying}
      myPhoneNumbers={userData.data && userData.data.Phones}
      selectedPhoneNumber={selectedPhoneNumber}
      setSelectedPhoneNumber={setSelectedPhoneNumber}
      setSourceWallet={setSourceWallet}
      dispatch={dispatch}
    />
  );
};

TopUpContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  isTopingUp: PropTypes.bool.isRequired,
  destinationContact: PropTypes.objectOf(PropTypes.any),
  userData: PropTypes.instanceOf(PropTypes.object),
  setDestinationContact: PropTypes.func.isRequired,
  transactionType: PropTypes.string,
  isSelfBuying: PropTypes.bool,
  isSendingOthers: PropTypes.bool,
  setIsSelfBuying: PropTypes.bool,
};
TopUpContainer.defaultProps = {
  destinationContact: null,
  userData: null,
  transactionType: 'TOP_UP',
  isSelfBuying: false,
  isSendingOthers: false,
  setIsSelfBuying: false,
};
export default TopUpContainer;
