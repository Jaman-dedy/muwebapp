/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clearCardOperationFees from 'redux/actions/addMoney/clearCardOperationFees';
import getCardOperationFeesAction from 'redux/actions/addMoney/getCardOperationFees';
import AddMoney from 'components/MoneyTransfer/AddMoney';
import getMyWalletsAction from 'redux/actions/users/getMyWallets';
import getUserInfo from 'redux/actions/users/getUserInfo';

const defaultOptions = [
  { key: 'usd', text: 'USD', value: 'USD' },
  { key: 'eur', text: 'EUR', value: 'EUR' },
  { key: 'gbp', text: 'GBP', value: 'GBP' },
  { key: 'cad', text: 'CAD', value: 'CAD' },
  { key: 'aud', text: 'AUD', value: 'AUD' },
];

const AddMoneyContainer = () => {
  const { userData, myWallets } = useSelector(({ user }) => user);
  const { cardOperationFees, addMoneyFromCreditCard } = useSelector(
    ({ addMoney }) => addMoney,
  );
  const dispatch = useDispatch();

  const [addMoneyData, setAddMoneyData] = useState({
    Amount: '',
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

  const selectWallet = ({ AccountNumber, CurrencyCode }) => {
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

  const clearAddMoneyData = () => {
    setAddMoneyData({
      Amount: '',
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
    return () => {
      clearCardOperationFees()(dispatch);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (addMoneyFromCreditCard.success === true) {
        getUserInfo()(dispatch);
      }
    };
  }, [addMoneyFromCreditCard]);

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
    />
  );
};
export default AddMoneyContainer;
