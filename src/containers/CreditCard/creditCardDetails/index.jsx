import React from 'react';
import { useLocation } from 'react-router-dom';
import CreditCardDetails from 'components/CreditCard/creditCardDetails';
import creditCardDetails from './creditCardDetails';

const CreditCardDetailsContainer = () => {
  const location = useLocation();
  const wallet = location && location.state.wallet;
  return (
    <CreditCardDetails
      creditCardDetails={creditCardDetails(wallet)}
    />
  );
};

export default CreditCardDetailsContainer;
