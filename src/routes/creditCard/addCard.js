import { lazy } from 'react';

export default {
  exact: true,
  name: 'Add M-Card',
  protected: true,
  path: '/add-card',
  component: lazy(() => import('containers/CreditCard/AddCard')),
};
