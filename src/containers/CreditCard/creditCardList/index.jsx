/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreditCardList from 'components/CreditCard/creditCardList';
import getCreditCards from 'redux/actions/credit-card/getCreditCards';
import getCreditCardOptions from 'redux/actions/credit-card/getOptions';
import getCardOptions from '../getCardOptions';

const CreditCardListContainer = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState(null);
  const [selectedWallet, setSlectedWallet] = useState(null);
  const [balanceOnWallet, setBalance] = useState(0.0);
  const [currency, setCurrency] = useState(null);
  const [openOptionModal, setOpenOptionModal] = useState(false);
  const [
    addCreditCardModalOpen,
    setAddCreditCardModalOpen,
  ] = useState(false);
  const { creditCardList } = useSelector(
    ({ creditCard }) => creditCard,
  );
  const { myWallets } = useSelector(({ user }) => user);
  const onOptionsChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };
  useEffect(() => {
    if (form.AccountName && myWallets?.walletList) {
      myWallets.walletList.map(item => {
        if (item.AccountName === form.AccountName) {
          setCurrency(item.CurrencyCode);
          setBalance(`${item.Balance} ${item.CurrencyCode}`);
        }
      });
    }
  }, [form?.AccountName]);
  const fetchCreditCardList = () => {
    getCreditCards()(dispatch);
  };
  useEffect(() => {
    if (!creditCardList.data) {
      fetchCreditCardList();
    }
  }, []);
  useEffect(() => {
    if (selectedWallet?.AccountNumber) {
      setForm({ ...form, Wallet: selectedWallet.AccountNumber });
    }
  }, [selectedWallet]);
  const validate = () => {
    let hasError = false;
    if (!form.Wallet) {
      setErrors(
        global.translate(
          'You must select a wallet for this operation',
        ),
      );
      hasError = true;
    }

    return hasError;
  };
  const creditCardNextStep = () => {
    if (!validate()) {
      setOpenOptionModal(true);
      const data = { Wallet: form.Wallet };
      getCreditCardOptions(data, '/GetCreditCardOptions')(dispatch);
      setOpen(false);
    }
  };
  return (
    <CreditCardList
      onOptionsChange={onOptionsChange}
      creditCardList={creditCardList?.data}
      loading={creditCardList.loading}
      open={open}
      setOpen={setOpen}
      errors={errors}
      setErrors={setErrors}
      walletList={
        myWallets?.walletList.length && myWallets.walletList
      }
      selectedWallet={selectedWallet}
      setSlectedWallet={setSlectedWallet}
      balanceOnWallet={balanceOnWallet}
      currency={currency}
      openOptionModal={openOptionModal}
      setOpenOptionModal={setOpenOptionModal}
      setForm={setForm}
      creditCardNextStep={creditCardNextStep}
      getCardOptions={getCardOptions(setOpenOptionModal, form)}
    />
  );
};
export default CreditCardListContainer;
