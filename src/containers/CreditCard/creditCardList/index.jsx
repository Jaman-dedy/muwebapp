import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreditCardList from 'components/CreditCard/creditCardList';
import getCreditCards from 'redux/actions/credit-card/getCreditCards';
import getCreditCardOptions from 'redux/actions/credit-card/getOptions';
import getMyWallets from 'redux/actions/users/getMyWallets';
import getCardOptions from '../getCardOptions';

const CreditCardListContainer = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState(null);
  const [selectedWallet, setSlectedWallet] = useState(null);
  const [openOptionModal, setOpenOptionModal] = useState(false);

  const { creditCardList } = useSelector(
    ({ creditCard }) => creditCard,
  );
  const { myWallets } = useSelector(({ user }) => user);

  useEffect(() => {
    if (myWallets.walletList?.length < 1) {
      getMyWallets()(dispatch);
    }
  }, []);

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
          2067,
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
      creditCardList={creditCardList?.data}
      loading={creditCardList.loading}
      open={open}
      setOpen={setOpen}
      errors={errors}
      setErrors={setErrors}
      walletList={myWallets.walletList}
      selectedWallet={selectedWallet}
      setSlectedWallet={setSlectedWallet}
      openOptionModal={openOptionModal}
      setOpenOptionModal={setOpenOptionModal}
      setForm={setForm}
      creditCardNextStep={creditCardNextStep}
      getCardOptions={getCardOptions(setOpenOptionModal, form)}
    />
  );
};
export default CreditCardListContainer;
