import { lazy } from 'react';

export default {
  exact: true,
  name: 'get-paid',
  protected: true,
  path: '/get-paid',
  component: lazy(() => import('containers/GetPaid')),
};
