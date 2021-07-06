import { lazy } from 'react';

export default {
  exact: false,
  name: 'Peer Services | Search Results',
  protected: true,
  path: '/market-place/results',
  component: lazy(() =>
    import('containers/PeerServices/SearchContainer'),
  ),
};
