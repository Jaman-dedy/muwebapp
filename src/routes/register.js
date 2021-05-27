import { lazy } from 'react';

export default {
  exact: true,
  name: 'Register',
  protected: false,
  path: '/register',
  component: lazy(() => import('containers/Register')),
};
