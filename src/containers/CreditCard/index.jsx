/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import propTypes from 'prop-types';
import CreditCard from 'components/CreditCard';
import getCardOptions from './getCardOptions';

const CreditCardContainer = ({
  addCreditCardModalOpen,
  setAddCreditCardModalOpen,
  selectedWallet,
  setStep,
  step,
}) => {
  const [form, setForm] = useState({});
  useEffect(() => {
    if (selectedWallet) {
      setForm({ ...form, Wallet: selectedWallet });
    }
  }, [selectedWallet]);

  return (
    <CreditCard
      addCreditCardModalOpen={addCreditCardModalOpen}
      setAddCreditCardModalOpen={setAddCreditCardModalOpen}
      getCardOptions={getCardOptions(
        setAddCreditCardModalOpen,
        form,
        setStep,
        step,
      )}
      form={form}
      setForm={setForm}
    />
  );
};

CreditCardContainer.propTypes = {
  addCreditCardModalOpen: propTypes.bool,
  setAddCreditCardModalOpen: propTypes.func,
  selectedWallet: propTypes.string,
  step: propTypes.number,
  setStep: propTypes.func,
};

CreditCardContainer.defaultProps = {
  addCreditCardModalOpen: false,
  setAddCreditCardModalOpen: () => {},
  selectedWallet: null,
  step: 1,
  setStep: () => {},
};

export default CreditCardContainer;
