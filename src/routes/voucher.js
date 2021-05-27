import { lazy } from 'react';

export default {
  exact: true,
  name: 'Vouchers',
  protected: true,
  path: '/vouchers',
  component: lazy(() => import('containers/Vouchers')),
};
