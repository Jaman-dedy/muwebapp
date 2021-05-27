import { lazy } from 'react';

export default {
  exact: true,
  name: 'Money Transfer',
  protected: true,
  path: '/money-transfer',
  component: lazy(() => import('containers/MoneyTransfer')),
};
