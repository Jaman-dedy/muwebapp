import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import getMyWalletsAction from 'redux/actions/users/getMyWallets';
import VoucherComponent from 'components/Vouchers';
import getUserInfo from 'redux/actions/users/getUserInfo';

const Vouchers = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    getUserInfo()(dispatch);
  }, []);

  const { userData } = useSelector(state => state.user);

  const [form, setForm] = useState({});

  const myWallets = useSelector(state => state.user.myWallets);

  const [sendVoucherModal, setSendVoucherModal] = useState(false);

  // get internal contacts
  // get external contacts

  const history = useHistory();
  return (
    <VoucherComponent
      form={form}
      userData={userData}
      history={history}
    />
  );
};

export default Vouchers;
