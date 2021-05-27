import { lazy } from 'react';

export default {
  exact: true,
  name: 'Add Money',
  protected: true,
  path: '/add-money',
  component: lazy(() => import('containers/MoneyTransfer/AddMoney')),
};
