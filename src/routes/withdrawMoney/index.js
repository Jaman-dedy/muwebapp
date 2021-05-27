import { lazy } from 'react';

export default {
  exact: false,
  name: 'withdraw-money',
  protected: true,
  path: '/withdraw-money',
  component: lazy(() => import('containers/WithdrawMoney')),
};
