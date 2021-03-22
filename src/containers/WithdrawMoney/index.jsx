import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import WithdrawMoneyComponent from 'components/WithdrawMoney';
import confirmTransactionAction from 'redux/actions/moneyTransfer/confirmTransaction';
import getSupportedCountries from 'redux/actions/countries/getSupportedCountries';
import moveFundsAction, {
  clearMoveFundsErrors,
} from 'redux/actions/moneyTransfer/moveFunds';
import { CASH_OUT } from 'constants/general';

const WithdrawMoney = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    myWallets,
    userLocationData,
    userData: { data: userData },
  } = useSelector(({ user }) => user);
  const {
    supportedCountries: { data: supportedCountries },
  } = useSelector(({ countries }) => countries);
  const {
    confirmTransaction: { checking, confirmationData },
  } = useSelector(({ moneyTransfer }) => moneyTransfer);
  const {
    loading: loadMoveFund,
    error: errorMoveFund,
    data: dataMoveFund,
  } = useSelector(state => state.moneyTransfer.moveFundsTo2UWallet);

  const [currentOption, setCurrentOption] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [phoneValue, setPhoneValue] = useState(null);
  const [form, setForm] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [openPinModal, setOpenPinModal] = useState(false);
  const [pin, setPin] = useState(null);
  const [allErrors, setAllErrors] = useState(null);
  const [pinData, setPinData] = useState(null);

  const [userPinDigit, setUserPinDigit] = useState({
    digit0: '',
    digit1: '',
    digit2: '',
    digit3: '',
  });

  const pinIsValid = () => pin && pin.length === 4;
  const validate = () => {
    if (!pinIsValid()) {
      setAllErrors(
        global.translate('Please provide your PIN number.', 944),
      );
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (dataMoveFund) {
      setOpenPinModal(false);
      setForm({});
      const encodedUrl = btoa(dataMoveFund[0].TransferNumber);
      history.push({
        pathname: `/transactions/${encodedUrl}`,
        state: {
          item: dataMoveFund[0],
          selectedCard: 2,
          urlArgument: dataMoveFund[0].TransferNumber,
          withdraw: true,
        },
      });
    }
  }, [dataMoveFund]);

  useEffect(() => {
    const { digit0, digit1, digit2, digit3 } = userPinDigit;
    setPin(`${digit0}${digit1}${digit2}${digit3}`);
  }, [userPinDigit]);

  useEffect(() => {
    if (errorMoveFund && Object.keys(errorMoveFund).length !== 0) {
      setAllErrors(errorMoveFund[0]);
    }
  }, [errorMoveFund]);

  useEffect(() => {
    setPinData({
      ...pinData,
      PIN: pin,
    });
    setAllErrors(null);
  }, [pin]);

  const onOptionChange = (e, { name, value }) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    if (myWallets?.walletList.length) {
      const selectedWallet = myWallets?.walletList.find(
        wallet => wallet.Default === 'YES',
      );
      if (selectedWallet) {
        setCurrentOption(selectedWallet);
      }
    }
  }, [myWallets?.walletList.length]);

  useEffect(() => {
    if (!supportedCountries) {
      getSupportedCountries()(dispatch);
    }
  }, []);

  useEffect(() => {
    if (supportedCountries) {
      const defaultCountry = supportedCountries.find(
        ({ CountryCode }) => {
          return (
            CountryCode === userLocationData.CountryCode.toUpperCase()
          );
        },
      );
      setSelectedCountry(defaultCountry);
    }
  }, [supportedCountries]);

  useEffect(() => {
    if (
      !phoneValue ||
      !selectedCountry ||
      !currentOption ||
      !form?.amount
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [phoneValue, selectedCountry, currentOption, form?.amount]);

  const handleConfirmTransaction = () => {
    const data = {
      Amount: form?.amount,
      CountryCode: selectedCountry?.CountryCode,
      TargetCurrency: selectedCountry?.MainCurrency,
      TargetType: CASH_OUT,
      SourceWallet: currentOption?.AccountNumber,
    };
    confirmTransactionAction(data)(dispatch);
  };
  const handleCashout = () => {
    const data = {
      PIN: pinData.PIN,
      Amount: form.amount && form.amount.toString(),
      DateFrom: '',
      DateTo: '',
      Day: '0',
      Reccurent: 'NO',
      SendNow: 'YES',
      Reference: '',
      Description: '',
      TargetType: CASH_OUT,
      TargetPhoneNumber: phoneValue,
      FirstName: '',
      LastName: '',
      PhonePrefix: '+250',
      SourceWallet: currentOption?.AccountNumber,
      DestCountryCode: selectedCountry?.CountryCode,
    };
    if (!validate()) {
      moveFundsAction(data, '/SendCash', 'send-cash')(dispatch)(
        data => {
          toast.success(global.translate(data?.Description));
        },
      );
    }
  };

  return (
    <WithdrawMoneyComponent
      walletList={myWallets?.walletList}
      setCurrentOption={setCurrentOption}
      currentOption={currentOption}
      onOptionChange={onOptionChange}
      setSelectedCountry={setSelectedCountry}
      selectedCountry={selectedCountry}
      phoneValue={phoneValue}
      setPhoneValue={setPhoneValue}
      confirmTransaction={handleConfirmTransaction}
      supportedCountries={supportedCountries}
      onCountryChange={onOptionChange}
      buttonDisabled={buttonDisabled}
      checking={checking}
      confirmationData={confirmationData}
      handleCashout={handleCashout}
      loadMoveFund={loadMoveFund}
      userData={userData}
      setOpenPinModal={setOpenPinModal}
      openPinModal={openPinModal}
      setUserPinDigit={setUserPinDigit}
      userPinDigit={userPinDigit}
      allErrors={allErrors}
      pinData={pinData}
      form={form}
    />
  );
};

export default WithdrawMoney;
