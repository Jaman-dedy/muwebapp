/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clearCardOperationFees from 'redux/actions/addMoney/clearCardOperationFees';
import clearPayPalOperationFees from 'redux/actions/addMoney/clearPayPalOperationFees';
import getCardOperationFeesAction from 'redux/actions/addMoney/getCardOperationFees';
import getPayPalAddMoneyFeesAction from 'redux/actions/addMoney/getPayPalAddMoneyFees';
import AddMoney from 'components/MoneyTransfer/AddMoney';
import getMyWalletsAction from 'redux/actions/users/getMyWallets';
import getUserInfo from 'redux/actions/users/getUserInfo';
import addMoneyFromPayPalAction from 'redux/actions/addMoney/addMoneyFromPayPal';
import openInNewTab from 'helpers/openInNewTab';
import addMoneyToWallet from 'redux/actions/walletsAndBanks/addMoneyToWallet';

const defaultOptions = [
  { key: 'usd', text: 'USD', value: 'USD' },
  { key: 'eur', text: 'EUR', value: 'EUR' },
  { key: 'gbp', text: 'GBP', value: 'GBP' },
  { key: 'cad', text: 'CAD', value: 'CAD' },
  { key: 'aud', text: 'AUD', value: 'AUD' },
];

const AddMoneyContainer = () => {
  const { userData, myWallets } = useSelector(({ user }) => user);
  const [selectedWallet, setSelectedWallet] = useState({});
  const [hasSameCurrency, setHasSameCurrency] = useState(false);

  const {
    cardOperationFees,
    addMoneyFromCreditCard,
    addMoneyFromPayPal,
    payPalOperationFees,
  } = useSelector(({ addMoney }) => addMoney);
  const dispatch = useDispatch();
  const [PIN, setPIN] = useState('');

  const [addMoneyData, setAddMoneyData] = useState({
    Amount: '',
    TotalAmount: '',
    WalletNumber: '',
    Currency: '',
    CardNumber: '',
    MM: '',
    YYYY: '',
    CVV: '',
    NameOnCard: '',
    Address: '',
    City: '',
    Country: '',
    OpDescription: '',
  });

  const [errors, setErrors] = useState({});

  const clearError = name => {
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const validateForm = () => {
    const Amount = addMoneyData.Amount
      ? ''
      : 'Please Enter your Amount';
    const NameOnCard = addMoneyData.NameOnCard
      ? ''
      : 'Enter the name on the card';
    const CardNumber = addMoneyData.CardNumber
      ? ''
      : 'Enter the wallet number';
    const CardNumberLength =
      addMoneyData.CardNumber.length === 16
        ? ''
        : 'The credit card number should have 16 digits';
    const CardNumberValid =
      addMoneyData.CardNumber.search(/[A-Z]/) === -1 &&
      addMoneyData.CardNumber.search(/[a-z]/) === -1 &&
      addMoneyData.CardNumber.search(/[@!#$%^&*]/) === -1
        ? ''
        : 'The credit card number should only contains numbers';
    const date =
      addMoneyData.MM && addMoneyData.YYYY
        ? ''
        : 'Enter the expiry date';
    const CVV = addMoneyData.CVV ? '' : 'Enter the CVV';
    const CVVValid =
      addMoneyData.CVV.search(/[A-Z]/) === -1 &&
      addMoneyData.CVV.search(/[a-z]/) === -1 &&
      addMoneyData.CVV.search(/[@!#$%^&*]/) === -1
        ? ''
        : 'The CVV should only contains numbers';
    const Address = addMoneyData.Address ? '' : 'Enter the Address';
    const City = addMoneyData.City ? '' : 'Enter the City';
    const Country = addMoneyData.Country ? '' : 'Enter the Country';

    setErrors({
      ...errors,
      Amount,
      date,
      CardNumber: CardNumber || CardNumberLength || CardNumberValid,
      CVV: CVV || CVVValid,
      NameOnCard,
      Address,
      City,
      Country,
    });
    return !(
      Amount ||
      date ||
      CardNumber ||
      CardNumberLength ||
      CardNumberValid ||
      CVV ||
      CVVValid ||
      NameOnCard ||
      Address ||
      City ||
      Country
    );
  };

  const handleInputChange = ({ target: { name, value } }) => {
    if (name === 'date') {
      const YYYY = value.split('-')[1];
      const MM = value.split('-')[0];
      clearError(name);
      return setAddMoneyData({
        ...addMoneyData,
        YYYY,
        MM,
      });
    }
    clearError(name);
    return setAddMoneyData({
      ...addMoneyData,
      [name]: value,
    });
  };

  const selectWallet = wallet => {
    const { AccountNumber, CurrencyCode } = wallet;
    setSelectedWallet(wallet);
    setAddMoneyData({
      ...addMoneyData,
      WalletNumber: AccountNumber,
      Currency: defaultOptions.find(
        option => option.value === CurrencyCode,
      )
        ? CurrencyCode
        : 'USD',
    });
  };

  useEffect(() => {
    if (myWallets.walletList.length === 0) {
      getMyWalletsAction()(dispatch);
    }
  }, []);

  const handleSubmit = () => {
    if (!validateForm()) {
      return false;
    }

    getCardOperationFeesAction(addMoneyData)(dispatch);
    return true;
  };
  const handleSubmitPayPal = () => {
    getPayPalAddMoneyFeesAction(addMoneyData)(dispatch);
    return true;
  };

  const clearAddMoneyData = () => {
    setAddMoneyData({
      Amount: '',
      TotalAmount: '',
      Currency: '',
      WalletNumber: '',
      CardNumber: '',
      CVV: '',
      NameOnCard: '',
      Address: '',
      City: '',
      Country: '',
      OpDescription: '',
      MM: '',
      YYYY: '',
    });
  };

  useEffect(() => {
    clearCardOperationFees()(dispatch);
    clearPayPalOperationFees()(dispatch);
    clearAddMoneyData();
  }, []);

  useEffect(() => {
    return () => {
      if (addMoneyFromCreditCard.success === true) {
        getUserInfo()(dispatch);
      }
    };
  }, [addMoneyFromCreditCard]);

  const handlePullPayPal = () => {
    const data = {
      amount: addMoneyData.Amount,
      totalAmount: addMoneyData.TotalAmount,
      redirectUrl: `${process.env.REACT_APP_URL}/wallets`,
      currency: addMoneyData.Currency,
      accountNumber: addMoneyData.WalletNumber,
      authToken: localStorage.getItem('token'),
    };

    addMoneyFromPayPalAction(data)(dispatch);
  };

  const [bankForm, setBankForm] = useState({
    amount: '',
    bankAccount: null,
    PIN: '',
  });

  useEffect(() => {
    setBankForm(form => ({
      ...form,
      WalletNumber: selectedWallet?.AccountNumber,
      WalletCurrency: selectedWallet?.CurrencyCode,
    }));
  }, [selectedWallet]);

  const handleBankFormChange = (_, { value, name }) => {
    setBankForm(form => ({
      ...form,
      [name]: value,
      WalletNumber: selectedWallet?.AccountNumber,
      WalletCurrency: selectedWallet?.CurrencyCode,
    }));
  };
  const handleTopUpFromBank = () => {
    const { bankAccount } = bankForm;
    addMoneyToWallet({
      CountryCode: bankAccount?.CountryCode,
      AccountNumber: bankAccount?.AccountNumber,
      BankCode: bankAccount?.BankCode,
      Amount: bankForm?.amount,
      Wallet: addMoneyData?.WalletNumber,
      PIN: PIN,
    })(dispatch);
  };

  useEffect(() => {
    if (addMoneyFromPayPal.data) {
      openInNewTab(addMoneyFromPayPal.data.checkout_url);
    }
  }, [addMoneyFromPayPal]);

  return (
    <AddMoney
      handleInputChange={handleInputChange}
      addMoneyData={addMoneyData}
      userData={userData}
      myWallets={myWallets}
      selectWallet={selectWallet}
      cardOperationFees={cardOperationFees}
      addMoneyFromCreditCard={addMoneyFromCreditCard}
      errors={errors}
      handleSubmit={handleSubmit}
      clearError={clearError}
      clearAddMoneyData={clearAddMoneyData}
      setAddMoneyData={setAddMoneyData}
      handlePullPayPal={handlePullPayPal}
      addMoneyFromPayPal={addMoneyFromPayPal}
      handleSubmitPayPal={handleSubmitPayPal}
      payPalOperationFees={payPalOperationFees}
      bankForm={bankForm}
      onBankFormChange={handleBankFormChange}
      handleTopUpFromBank={handleTopUpFromBank}
      setBankForm={setBankForm}
      PIN={PIN}
      setPIN={setPIN}
      selectedWallet={selectedWallet}
    />
  );
};
export default AddMoneyContainer;
