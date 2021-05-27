import { lazy } from 'react';

export default {
  exact: true,
  name: 'Transaction detail',
  protected: true,
  path: '/transactions/:id',
  component: lazy(() =>
    import('containers/Transactions/TransactionDetail'),
  ),
};
