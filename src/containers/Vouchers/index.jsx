import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import getMyWalletsAction from 'redux/actions/users/getMyWallets';
import VoucherComponent from 'components/Vouchers';
import getUserInfo from 'redux/actions/users/getUserInfo';
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
  const myWallets = useSelector(state => state.user.myWallets);

  const [openSendVoucherModal, setOpenSendVoucherModal] = useState(
    false,
  );

  const setOpenSendVoucherModalFx = () => {
    setOpenSendVoucherModal(!openSendVoucherModal);
  };

  // get internal contacts
  // get external contacts

  const history = useHistory();
  return (
    <VoucherComponent
      form={form}
      userData={userData}
      history={history}
      openSendVoucherModal={openSendVoucherModal}
      setOpenSendVoucherModalFx={setOpenSendVoucherModalFx}
    />
  );
};

export default Vouchers;
