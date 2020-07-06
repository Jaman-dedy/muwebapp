import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MoneyTransfer from 'components/MoneyTransfer';
import getUserInfo from 'redux/actions/users/getUserInfo';
import payBills from './PayBills';

const MoneyTransferContainer = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector(({ user }) => user);

  const loadUser = () => {
    if (!userData.data) {
      getUserInfo()(dispatch);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return <MoneyTransfer userData={userData} payBills={payBills()} />;
};

export default MoneyTransferContainer;
