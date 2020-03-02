import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import getMyWalletsAction from 'redux/actions/users/getMyWallets';

import WalletComponents from 'components/Wallets';

const Wallets = () => {
  const { userData } = useSelector(state => state.user);
  const [form, setForm] = useState({});

  const myWallets = useSelector(state => state.user.myWallets);
  const { data, loading, error, walletList } = myWallets;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const myWalletsFx = () => {
    if (!data) {
      getMyWalletsAction()(dispatch);
    }
  };

  useEffect(() => {
    myWalletsFx();
  }, []);

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

  /* 
  
  
 userData,
  loading,
  myWallets,
  getMyWallets,
  data,
  history,
  setOpen,
  AddToMyWallets,
  onChange,
  open,
  form,
  searchData,
  error = { error },
  
  */

  return (
    <WalletComponents
      open={open}
      history={history}
      userData={userData}
      loading={loading}
      error={error}
      form={form}
      setForm={setForm}
      setOpen={setOpen}
      data={walletList}
      getMyWallets={myWalletsFx}
    />
  );
};

export default Wallets;
