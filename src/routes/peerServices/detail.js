import { lazy } from 'react';

export default {
  exact: false,
  name: 'Detail',
  protected: true,
  indexPage: true,
  path: '/marketplace/:id',
  component: lazy(() => import('containers/PeerServices/detail')),
};
