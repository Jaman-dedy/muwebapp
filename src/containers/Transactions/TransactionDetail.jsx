import React from 'react';
import { useLocation } from 'react-router-dom';
import TransactionDetailComponent from 'components/Transactions/TransactionDetails';

const Transactions = () => {
  const location = useLocation();
  const { item, selectedCard } = location.state;

  return (
    <TransactionDetailComponent
      item={item}
      selectedCard={selectedCard}
    />
  );
};

export default Transactions;
