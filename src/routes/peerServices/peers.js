import { lazy } from 'react';

export default {
  name: 'Marketplace',
  protected: true,
  exact: true,
  indexPage: true,
  path: '/marketplace',
  component: lazy(() => import('containers/PeerServices')),
};
