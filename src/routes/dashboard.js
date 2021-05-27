import { lazy } from 'react';

export default {
  exact: true,
  name: 'Dashboard',
  protected: true,
  path: '/',
  component: lazy(() => import('containers/Dashboard')),
};
