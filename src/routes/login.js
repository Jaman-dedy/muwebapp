import { lazy } from 'react';

export default {
  exact: false,
  name: 'Log in',
  protected: false,
  path: '/login',
  component: lazy(() => import('containers/Login')),
};
