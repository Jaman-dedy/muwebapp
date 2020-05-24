import React from 'react';
import { useSelector } from 'react-redux';

import MoneyTransfer from 'components/MoneyTransfer';
import payBills from './PayBills';

const MoneyTransferContainer = () => {
  const { userData } = useSelector(({ user }) => user);
  return <MoneyTransfer userData={userData} payBills={payBills()} />;
};

export default MoneyTransferContainer;
