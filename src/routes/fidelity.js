import { lazy } from 'react';

export default {
  exact: true,
  name: 'Fidelity',
  protected: true,
  path: '/fidelity',
  component: lazy(() => import('containers/Fidelity')),
};
