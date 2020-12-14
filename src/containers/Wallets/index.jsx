/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';

import getMyWalletsAction from 'redux/actions/users/getMyWallets';
import addWallets from 'redux/actions/users/addWallet';
import WalletComponents from 'components/Wallets';
import clearWalletForm from 'redux/actions/users/clearWalletForm';
import clearDeleteWallet from 'redux/actions/users/clearDeleteWallet';
import clearEditWallet from 'redux/actions/users/clearEditWallet';
import getCurrenciesList from 'redux/actions/users/getCurrenciesList';
import editWalletAction from 'redux/actions/users/editWallet';
import setAsDefault, {
  clearSetDefaultWallet,
} from 'redux/actions/users/setAsDefault';
import deleteWalletAction from 'redux/actions/users/deleteWallet';
import endWalletAction from 'redux/actions/wallets/endWalletAction';
import getUserTransactionHistory from 'redux/actions/users/getUserTransactionHistory';
import getUserCurrencies from 'redux/actions/users/getUserCurrencies';
import getUserNetworth from 'redux/actions/users/getUserNetworth';

const Wallets = () => {
  const dispatch = useDispatch();
  const locationParams = useLocation();
  const params = queryString.parse(locationParams.search);

  const {
    userData,
    currenciesList,
    myWallets,
    createWallet,
    editWallet,
    deleteWallet,
  } = useSelector(state => state.user);

  const { loading, error, walletList } = myWallets;

  const [openAddWalletModal, setOpenAddWalletModal] = useState(false);
  const [openEdtWalletModal, setOpenEdtWalletModal] = useState(false);
  const [openOptionModal, setOpenOptionModal] = useState(false);
  const [form, setForm] = useState({});

  const { success } = useSelector(state => state.user.setAsDefault);

  const getMyCurrencies = () => {
    if (userData.data) {
      getUserCurrencies({
        CountryCode: userData.data.Country,
      })(dispatch);
    }
  };

  const getMyWalletsFX = () => {
    getMyWalletsAction()(dispatch);
  };

  useEffect(() => {
    if (walletList.length === 0) {
      getMyWalletsFX();
    }
  }, [walletList]);

  const clearForm = () => {
    setForm({ Name: '', Currency: '' });
    clearWalletForm()(dispatch);
    clearDeleteWallet()(dispatch);
    clearEditWallet()(dispatch);
  };

  const setOpenAddWalletModalFx = () => {
    clearForm();
    setOpenOptionModal(false);
    setOpenAddWalletModal(!openAddWalletModal);
  };
  useEffect(() => {
    if (success) {
      getMyWalletsFX();
      getUserNetworth({
        Currency: userData.data && userData.data?.Currency,
        Scope: 'TOTAL',
      })(dispatch);
      clearSetDefaultWallet()(dispatch);
    }
  }, [success]);

  const history = useHistory();

  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  const setFormObject = payload => {
    setForm({ ...form, ...payload });
  };

  const addWalletFX = Wallets => {
    addWallets({ Wallets })(dispatch);
  };

  const openOptionModalFx = () => {
    endWalletAction()(dispatch);
    setOpenOptionModal(!openOptionModal);
  };

  const openEdtWalletModalFx = () => {
    endWalletAction()(dispatch);
    setOpenOptionModal(false);
    setOpenEdtWalletModal(!openEdtWalletModal);
  };

  useEffect(() => {
    if (!currenciesList.data) {
      getCurrenciesList()(dispatch);
    }
  }, []);

  const editWalletFX = () => {
    const postData = {};
    postData.PIN = '1234';
    postData.WalletNumber = form.AccountNumber;
    postData.WalletName = form.Name;
    editWalletAction(postData)(dispatch);
  };

  const setAsDefaultFx = () => {
    setOpenOptionModal(false);
    const postData = {};
    postData.WalletNumber = form.AccountNumber;
    setAsDefault(postData, form)(dispatch);
  };

  const deleteWalletFx = () => {
    setOpenOptionModal(false);
    const postData = {};
    postData.WalletNumber = form.AccountNumber;
    deleteWalletAction(postData, userData)(dispatch);
  };

  useEffect(() => {
    if (deleteWallet.success) {
      getMyWalletsFX();
      clearDeleteWallet()(dispatch);
    }
  }, [deleteWallet]);

  useEffect(() => {
    if (setAsDefault.success) {
      getMyWalletsFX();
      clearSetDefaultWallet()(dispatch);
      getUserTransactionHistory({
        WalletNumber: userData && userData.DefaultWallet,
      })(dispatch);
    }
  }, [setAsDefault]);

  const openAddModalFX = () => {
    setOpenAddWalletModal(true);
    clearForm();
  };

  useEffect(() => {
    if (params.add === 'true') {
      console.log('params.add :>> ', params.add);
      openAddModalFX();
    }
  }, []);

  return (
    <WalletComponents
      openAddWalletModal={openAddWalletModal}
      setOpenAddWalletModal={setOpenAddWalletModalFx}
      openEdtWalletModal={openEdtWalletModal}
      openEdtWalletModalFx={openEdtWalletModalFx}
      openOptionModal={openOptionModal}
      openOptionModalFx={openOptionModalFx}
      form={form}
      setForm={setForm}
      history={history}
      userData={userData}
      loading={loading}
      error={error}
      createWallet={createWallet}
      editWallet={editWallet}
      deleteWallet={deleteWallet}
      data={walletList}
      currencies={currenciesList.data}
      onChange={onChange}
      addwalletFX={addWalletFX}
      editWalletFX={editWalletFX}
      deleteWalletFX={deleteWalletFx}
      setAsDefaultFx={setAsDefaultFx}
      getMyWalletsFX={getMyWalletsFX}
      clearForm={clearForm}
      setFormObject={setFormObject}
      getMyCurrencies={getMyCurrencies}
    />
  );
};

export default Wallets;
