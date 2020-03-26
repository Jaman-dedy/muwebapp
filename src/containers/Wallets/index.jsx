import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import getMyWalletsAction from 'redux/actions/users/getMyWallets';

import addWallets from 'redux/actions/users/addWallet';

import WalletComponents from 'components/Wallets';

import clearWalletForm from 'redux/actions/users/clearWalletForm';
import clearDeleteWallet from 'redux/actions/users/clearDeleteWallet';
import clearEditWallet from 'redux/actions/users/clearEditWallet';

import getCurrenciesList from 'redux/actions/users/getCurrenciesList';
import editWalletAction from 'redux/actions/users/editWallet';

import setAsDefault from 'redux/actions/users/setAsDefault';
import deleteWalletAction from 'redux/actions/users/deleteWallet';
import getUserInfo from 'redux/actions/users/getUserInfo';
import endWalletAction from 'redux/actions/wallets/endWalletAction';
import getUserTransactionHistory from 'redux/actions/users/getUserTransactionHistory';

const Wallets = () => {
  const dispatch = useDispatch();

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

  const getMyWalletsFX = () => {
    getMyWalletsAction()(dispatch);
  };

  useEffect(() => {
    getMyWalletsFX();
  }, []);

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

  const history = useHistory();

  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  const setFormObject = payload => {
    setForm({ ...form, ...payload });
  };
  const addWalletFX = () => {
    const Wallets = [];
    for (let i = 0; i < form.Currency.length; i += 1) {
      const obj = {};
      obj.Name = form.Name;
      obj.Currency = form.Currency[i];
      Wallets.push(obj);
    }
  }, [addNewUserData.success]); */

  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  const setFormObject = payload => {
    setForm({ ...form, ...payload });
  };
  const addWalletFX = () => {
    const Wallets = [];
    for (let i = 0; i < form.Currency.length; i++) {
      const obj = {};
      obj.Name = form.Name;
      obj.Currency = form.Currency[i];
      Wallets.push(obj);
    }

    const postData = { PIN: '1234', Wallets };

    addWallets(postData)(dispatch);
  };

  const clearForm = () => {
    setForm({ Name: '', Currency: '' });
    clearWalletForm()(dispatch);
  };

    const postData = { PIN: '1234', Wallets };

    addWallets(postData)(dispatch);
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
    getCurrenciesList()(dispatch);
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
    getMyWalletsFX();

    getUserTransactionHistory({
      WalletNumber: userData && userData.DefaultWallet,
    })(dispatch);
  };

  const deleteWalletFx = () => {
    setOpenOptionModal(false);
    const postData = {};
    postData.WalletNumber = form.AccountNumber;
    deleteWalletAction(postData)(dispatch);
    getMyWalletsFX();
  };
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
    />
  );
};

export default Wallets;
