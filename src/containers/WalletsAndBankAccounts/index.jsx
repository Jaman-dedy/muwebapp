/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import WalletAndBankAccounts from 'components/WalletsAndBanks';
import bankAccounts from 'containers/WalletsAndBankAccounts/bankAccounts';
import userWallets from './userWallets';

const Wallets = () => {
  return (
    <WalletAndBankAccounts
      userWallets={userWallets()}
      bankAccounts={bankAccounts()}
    />
  );
};

export default Wallets;
