import { lazy } from 'react';

export default {
  exact: true,
  name: 'Account Management',
  protected: true,
  path: '/account-management',
  component: lazy(() => import('containers/AccountManagement')),
};
