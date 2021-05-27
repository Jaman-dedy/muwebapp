import { lazy } from 'react';

export default {
  exact: true,
  name: 'Reset password',
  protected: false,
  path: '/reset-password',
  component: lazy(() => import('containers/ResetPassword')),
};
