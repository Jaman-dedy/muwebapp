import { lazy } from 'react';

export default {
  exact: true,
  name: 'Services',
  protected: true,
  path: '/services',
  component: lazy(() => import('containers/Services')),
};
