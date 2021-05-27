import { lazy } from 'react';

export default {
  exact: false,
  name: 'User products and services',
  protected: true,
  indexPage: true,
  path: '/marketplace/user/:id',
  component: lazy(() =>
    import('containers/PeerServices/UserPeerServices'),
  ),
};
