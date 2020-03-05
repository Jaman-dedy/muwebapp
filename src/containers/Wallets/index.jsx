import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import getMyWalletsAction from 'redux/actions/users/getMyWallets';

import addWallets from 'redux/actions/wallets/addWallet';

import WalletComponents from 'components/Wallets';

import clearWalletForm from 'redux/actions/wallets/clearWalletForm';

const Wallets = () => {
  const { userData } = useSelector(state => state.user);
  const [form, setForm] = useState({});

  const myWallets = useSelector(state => state.user.myWallets);
  const { data, loading, error, walletList } = myWallets;
  const dispatch = useDispatch();
  const [openAddWalletModel, setOpenAddWalletModel] = useState(false);
  const [openEdtWalletModel, setOpenEdtWalletModel] = useState(false);
  const { currencies } = useSelector(state => state.user);
  const addWallet = useSelector(state => state.wallet.create);

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

  const setOpenAddWalletModelFx = () => {
    setOpenAddWalletModel(!openAddWalletModel);
  };

  /* const walletData = {
    contactToAdd: searchData.data,
    Criteria: 'PID',
    ContactData: form && form.PID,
  
  }; */

  const history = useHistory();

  /*   useEffect(() => {
    if (addNewUserData.success) {
      setOpen(false);
    } else {
      clearFoundUser()(dispatch);
    }
  }, [addNewUserData.success]); */

  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  const addWalletFX = () => {
    addWallets(form)(dispatch);
  };

  const editWalletFX = () => {};
  const deleteWalletFX = () => {};

  const clearForm = () => {
    setForm({ Name: '', Currency: '' });
    clearWalletForm()(dispatch);
  };

  return (
    <WalletComponents
      openAddWalletModel={openAddWalletModel}
      setOpenAddWalletModel={setOpenAddWalletModelFx}
      openEdtWalletModel={openEdtWalletModel}
      setOpenEdtWalletModel={setOpenEdtWalletModel}
      history={history}
      userData={userData}
      loading={loading}
      error={error}
      form={form}
      setForm={setForm}
      data={walletList}
      getMyWallets={myWalletsFx}
      currencies={currencies.data}
      onChange={onChange}
      addwalletFX={addWalletFX}
      editWalletFX={editWalletFX}
      deleteWalletFX={deleteWalletFX}
      addWallet={addWallet}
      clearForm={clearForm}
      getMyWalletsAction={getMyWallets}
    />
  );
};

export default Wallets;
