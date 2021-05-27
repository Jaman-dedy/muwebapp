import { lazy } from 'react';

export default {
  exact: false,
  name: 'Store Details',
  protected: true,
  path: '/store-details',
  component: lazy(() => import('containers/Stores/StoreDetails')),
};
