import { lazy } from 'react';

export default {
  exact: true,
  name: 'Wallets',
  protected: true,
  path: '/wallets',
  component: lazy(() => import('containers/WalletsAndBankAccounts')),
};
