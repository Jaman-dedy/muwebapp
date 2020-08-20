/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import propTypes from 'prop-types';
import CreditCard from 'components/CreditCard';
import getCardOptions from './getCardOptions';

const CreditCardContainer = ({
  addCreditCardModalOpen,
  setAddCreditCardModalOpen,
  selectedWallet,
}) => {
  const [form, setForm] = useState({});
  useEffect(() => {
    if (selectedWallet) {
      setForm({ ...form, Wallet: selectedWallet });
    }
  }, [selectedWallet]);

  return (
    <>
      <CreditCard
        addCreditCardModalOpen={addCreditCardModalOpen}
        setAddCreditCardModalOpen={setAddCreditCardModalOpen}
        getCardOptions={getCardOptions(
          setAddCreditCardModalOpen,
          form,
        )}
        form={form}
        setForm={setForm}
      />
    </>
  );
};

CreditCardContainer.propTypes = {
  addCreditCardModalOpen: propTypes.bool,
  setAddCreditCardModalOpen: propTypes.func,
  selectedWallet: propTypes.string,
};

CreditCardContainer.defaultProps = {
  addCreditCardModalOpen: false,
  setAddCreditCardModalOpen: () => {},
  selectedWallet: null,
};

export default CreditCardContainer;
