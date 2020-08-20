import React from 'react';
import { useLocation } from 'react-router-dom';
import TransactionDetailComponent from 'components/Transactions/TransactionDetails';

const Transactions = () => {
  const {
    state: { item },
  } = useLocation();

  return <TransactionDetailComponent item={item} />;
};

export default Transactions;
