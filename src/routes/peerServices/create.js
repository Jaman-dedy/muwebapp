import { lazy } from 'react';

export default {
  exact: true,
  name: 'Create Service',
  protected: true,
  path: '/create-peer-service',
  component: lazy(() => import('containers/PeerServices/NewService')),
};
