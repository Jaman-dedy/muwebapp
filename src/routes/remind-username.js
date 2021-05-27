import { lazy } from 'react';

export default {
  exact: true,
  name: 'Remind username',
  protected: false,
  path: '/remind-username',
  component: lazy(() => import('containers/RemindUsername')),
};
