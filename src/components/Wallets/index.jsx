import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import getMyWalletsAction from 'redux/actions/users/getMyWallets';

//add wallet action

import WalletsComponent from 'components/Wallets';

const Contacts = () => {
  const { userData } = useSelector(state => state.user);
  const [form, setForm] = useState({});

  const myWallets = useSelector(state => state.user.myWallets);
  const { data, loading, error } = myWallets;
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

  return (
    <WalletsComponent
      open={open}
      history={history}
      userData={userData}
      loading={loading}
      error={error}
      form={form}
      setForm={setForm}
      setOpen={setOpen}
      data={data}
      //searchData={searchData}
    />
  );
};

export default Contacts;
