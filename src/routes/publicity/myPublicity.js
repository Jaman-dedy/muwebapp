import { lazy } from 'react';

export default {
  exact: false,
  name: 'Publicity',
  protected: true,
  path: '/publicity',
  component: lazy(() => import('containers/Publicity')),
};
