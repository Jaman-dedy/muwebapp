import { lazy } from 'react';

export default {
  exact: true,
  name: 'Verify Email',
  protected: false,
  path: '/verify-email',
  component: lazy(() => import('containers/VerifyEmail')),
};
