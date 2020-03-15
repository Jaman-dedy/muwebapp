import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import getMyWalletsAction from 'redux/actions/users/getMyWallets';

import addWallets from 'redux/actions/wallets/addWallet';

import WalletComponents from 'components/Wallets';

import clearWalletForm from 'redux/actions/wallets/clearWalletForm';

import getCurrenciesList from 'redux/actions/wallets/getCurrenciesList';
import editWallet from 'redux/actions/wallets/editWallet';

import setAsDefault from 'redux/actions/wallets/setAsDefault';
import deleteWallet from 'redux/actions/wallets/deleteWallet';
import getUserInfo from 'redux/actions/users/getUserInfo';

const Wallets = () => {
  const { userData } = useSelector(state => state.user);
  const [form, setForm] = useState({});

  const { myWallets, wallet } = useSelector(state => ({
    myWallets: state.user.myWallets,
    wallet: state.wallet,
  }));

  const { data, loading, error, walletList } = myWallets;
  const { create: createWallet } = wallet;

  const dispatch = useDispatch();
  const [openAddWalletModal, setOpenAddWalletModal] = useState(false);
  const [openEdtWalletModal, setOpenEdtWalletModal] = useState(false);
  const [openOptionModal, setOpenOptionModal] = useState(false);
  const { create, currenciesList } = useSelector(
    state => state.wallet,
  );

  const getMyWallets = () => {
    getMyWalletsAction()(dispatch);
  };
  const myWalletsFx = () => {
    if (!data) {
      getMyWalletsAction()(dispatch);
    }
  };

  useEffect(() => {
    myWalletsFx();
  }, []);

  const setOpenAddWalletModalFx = () => {
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

    const postData = { PIN: '1234', Wallets };

    addWallets(postData)(dispatch);
  };

  const clearForm = () => {
    setForm({ Name: '', Currency: '' });
    clearWalletForm()(dispatch);
  };

  const openOptionModalFx = () => {
    setOpenOptionModal(!openOptionModal);
  };

  const openEdtWalletModalFx = () => {
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

    editWallet(postData)(dispatch);
  };

  const setAsDefaultFx = () => {
    setOpenOptionModal(false);
    const postData = {};
    postData.WalletNumber = form.AccountNumber;
    setAsDefault(postData)(dispatch);
    getMyWallets();
    getUserInfo()(dispatch);
  };

  const deleteWalletFx = () => {
    setOpenOptionModal(false);
    const postData = {};
    postData.WalletNumber = form.AccountNumber;
    deleteWallet(postData)(dispatch);
    getMyWallets();
  };
  return (
    <WalletComponents
      openAddWalletModal={openAddWalletModal}
      setOpenAddWalletModal={setOpenAddWalletModalFx}
      openEdtWalletModal={openEdtWalletModal}
      openEdtWalletModalFx={openEdtWalletModalFx}
      history={history}
      userData={userData}
      loading={loading}
      error={error}
      createWallet={createWallet}
      form={form}
      setForm={setForm}
      data={walletList}
      getMyWallets={myWalletsFx}
      currencies={currenciesList.data}
      onChange={onChange}
      addwalletFX={addWalletFX}
      editWalletFX={editWalletFX}
      deleteWalletFX={deleteWalletFx}
      addWallet={create}
      clearForm={clearForm}
      getMyWalletsAction={getMyWallets}
      openOptionModal={openOptionModal}
      openOptionModalFx={openOptionModalFx}
      setFormObject={setFormObject}
      setAsDefaultFx={setAsDefaultFx}
    />
  );
};

export default Wallets;
