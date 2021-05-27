import { lazy } from 'react';

export default {
  name: 'Marketplace',
  protected: false,
  exact: false,
  indexPage: true,
  path: '/marketplace',
  component: lazy(() => import('containers/PeerServices')),
};
