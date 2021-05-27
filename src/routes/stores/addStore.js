import { lazy } from 'react';

export default {
  exact: true,
  name: 'Add a Store',
  protected: true,
  path: '/add-store',
  component: lazy(() => import('containers/Stores/AddStore')),
};
