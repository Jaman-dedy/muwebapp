import { lazy } from 'react';

export default {
  exact: true,
  name: 'quick-pay',
  protected: true,
  path: '/quick-pay',
  component: lazy(() => import('containers/QuickPay')),
};
