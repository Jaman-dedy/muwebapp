import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import getMyWalletsAction from 'redux/actions/users/getMyWallets';
import VoucherComponent from 'components/Vouchers';
import getUserInfo from 'redux/actions/users/getUserInfo';
import getCountries from 'redux/actions/vouchers/getCountries';
import getRecentActiveContacts from 'redux/actions/contacts/getRecentActiveContacts';
import contactsPage from './contactsPage';
import searchStores from './searchStores';
import getInternalContacts from 'redux/actions/vouchers/getInternalContacts';
import getExternalContacts from 'redux/actions/vouchers/getExternalContacts';
import getCountries from 'redux/actions/vouchers/getCountries';
import contactsPage from './contactsPage';
import searchStores from './searchStores';

const Vouchers = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    getUserInfo()(dispatch);
  }, []);

  const { userData } = useSelector(state => state.user);

  const [form, setForm] = useState({});

  const [screenNumber, setScreenNumber] = useState(1);

  const myWallets = useSelector(state => state.user.myWallets);
  const { data, loading, error, walletList } = myWallets;

  const { countries, stores } = useSelector(state => state.voucher);

  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  const getRecentContacts = () => {
    getRecentActiveContacts(
      {
        PID: userData.data && userData.data.PID,
        MaxRecordsReturned: '5',
      },
      '/GetLastTransactionContacts',
    )(dispatch);
  };

  useEffect(() => {
    getMyWalletsAction()(dispatch);
    getRecentContacts();
  }, []);
  useEffect(() => {
    getCountries()(dispatch);
  }, []);

  return (
    <VoucherComponent
      screenNumber={screenNumber}
      setScreenNumber={setScreenNumber}
      form={form}
      userData={userData}
      walletList={walletList}
      countries={countries.data}
      stores={stores.data}
      onChange={onChange}
      contactsPage={contactsPage({ userData, setScreenNumber })}
      searchStores={searchStores({ setScreenNumber })}
  const myWallets = useSelector(state => state.user.myWallets);
  const { data, loading, error, walletList } = myWallets;

  const { countries, stores } = useSelector(state => state.voucher);

  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    getMyWalletsAction()(dispatch);
  }, []);
  useEffect(() => {
    getCountries()(dispatch);
  }, []);

  return (
    <VoucherComponent
      screenNumber={screenNumber}
      setScreenNumber={setScreenNumber}
      form={form}
      userData={userData}
      walletList={walletList}
      countries={countries.data}
      stores={stores.data}
      onChange={onChange}
      contactsPage={contactsPage({ userData, setScreenNumber })}
      searchStores={searchStores({ setScreenNumber })}
    />
  );
};

export default Vouchers;
