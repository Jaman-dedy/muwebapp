import { lazy } from 'react';

export default {
  exact: true,
  name: 'Notifications',
  protected: true,
  path: '/notifications',
  component: lazy(() => import('containers/Notifications')),
};
