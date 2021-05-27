import { lazy } from 'react';

export default {
  exact: true,
  name: 'Transactions',
  protected: true,
  path: '/transactions',
  component: lazy(() => import('containers/Transactions')),
};
