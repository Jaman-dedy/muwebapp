import { lazy } from 'react';

export default {
  exact: true,
  name: 'My Stores',
  protected: true,
  path: '/my-stores',
  component: lazy(() => import('containers/Stores/MyStores')),
};
