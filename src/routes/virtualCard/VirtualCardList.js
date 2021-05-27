import { lazy } from 'react';

export default {
  exact: true,
  name: 'O-Card',
  protected: true,
  path: '/virtual-card',
  component: lazy(() =>
    import('containers/VirtualCard/MyVirtualCards'),
  ),
};
