import { lazy } from 'react';

export default {
  exact: true,
  name: 'Send Money',
  protected: true,
  path: '/send-money',
  component: lazy(() => import('containers/MoneyTransfer/SendMoney')),
};
