import { lazy } from 'react';

export default {
  exact: true,
  name: 'Get Help',
  protected: true,
  path: '/get-help',
  component: lazy(() => import('containers/GetHelp')),
};
