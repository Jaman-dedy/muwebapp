import { lazy } from 'react';

export default {
  exact: false,
  name: 'O-Card Details',
  protected: true,
  path: '/virtual-card-details',
  component: lazy(() =>
    import('containers/VirtualCard/VirtualCardDetails'),
  ),
};
