import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import getMyWalletsAction from 'redux/actions/users/getMyWallets';
import VoucherComponent from 'components/Vouchers';
import getUserInfo from 'redux/actions/users/getUserInfo';
import getInternalContacts from 'redux/actions/vouchers/getInternalContacts';
import getExternalContacts from 'redux/actions/vouchers/getExternalContacts';
import getCountries from 'redux/actions/vouchers/getCountries';
import getStores from 'redux/actions/vouchers/getStores';

const Vouchers = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    getUserInfo()(dispatch);
  }, []);

  const { userData } = useSelector(state => state.user);

  const [form, setForm] = useState({});

  const myWallets = useSelector(state => state.user.myWallets);

  const [openSendVoucherModal, setOpenSendVoucherModal] = useState(
    false,
  );

  const setOpenSendVoucherModalFx = () => {
    setOpenSendVoucherModal(!openSendVoucherModal);
  };

  useEffect(() => {
    getInternalContacts()(dispatch);
  }, []);
  useEffect(() => {
    getExternalContacts()(dispatch);
  }, []);
  useEffect(() => {
    getCountries()(dispatch);
  }, []);

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
